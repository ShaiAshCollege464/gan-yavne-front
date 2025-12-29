import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { HOST } from "./Constants.js";
import Cookies from "js-cookie";

const USERS_TYPES = {
    NONE: 0,
    CLIENT: 1,
    PROFESSIONALIST: 2
};

const SIGNUP_STATUSES = {
    PENDING: 0,
    SUCCESS: 1,
    FAILURE: 2
};

function SignupPage() {
    const navigate = useNavigate();

    const [selectedType, setSelectedType] = useState(USERS_TYPES.NONE);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [areas, setAreas] = useState("");
    const [plan, setPlan] = useState(1);

    const [signupStatus, setSignupStatus] = useState(SIGNUP_STATUSES.PENDING);

    return (
        <>
            {signupStatus === SIGNUP_STATUSES.FAILURE && (
                <div>Something Wrong...</div>
            )}

            <select
                value={selectedType}
                onChange={(event) => {
                    setSelectedType(Number(event.target.value));
                }}
            >
                <option disabled value={USERS_TYPES.NONE}>
                    Select type
                </option>
                <option value={USERS_TYPES.CLIENT}>Client</option>
                <option value={USERS_TYPES.PROFESSIONALIST}>
                    Professionalist
                </option>
            </select>

            {selectedType !== USERS_TYPES.NONE && (
                <>
                    <div>
                        <input
                            placeholder="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <input
                            placeholder="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <input
                            placeholder="contactInfo"
                            type="text"
                            value={contactInfo}
                            onChange={(e) => setContactInfo(e.target.value)}
                        />
                    </div>

                    <div>
                        <input
                            placeholder="full name"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>

                    {selectedType === USERS_TYPES.CLIENT && (
                        <div>
                            <input
                                placeholder="address"
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                    )}

                    {selectedType === USERS_TYPES.PROFESSIONALIST && (
                        <>
                            <div>
                                <input
                                    placeholder="areas"
                                    type="text"
                                    value={areas}
                                    onChange={(e) => setAreas(e.target.value)}
                                />
                            </div>

                            <div>
                                <input
                                    placeholder="plan"
                                    type="number"
                                    value={plan}
                                    onChange={(e) =>
                                        setPlan(Number(e.target.value))
                                    }
                                />
                            </div>
                        </>
                    )}
                </>
            )}

            <div>
                <button
                    disabled={
                        username.length === 0 ||
                        password.length !== 6 ||
                        selectedType === USERS_TYPES.NONE ||
                        contactInfo.length === 0 ||
                        !fullName.includes(" ") ||
                        (selectedType === USERS_TYPES.CLIENT &&
                            address.length === 0) ||
                        (selectedType === USERS_TYPES.PROFESSIONALIST &&
                            areas.length === 0) ||
                        (selectedType === USERS_TYPES.PROFESSIONALIST &&
                            plan <= 0)
                    }
                    onClick={() => {
                        axios
                            .get(HOST + "signup", {
                                params: {
                                    selectedType,
                                    username,
                                    password,
                                    fullName,
                                    address,
                                    areas,
                                    plan,
                                    contactInfo
                                }
                            })
                            .then((response) => {
                                if (response.data.success) {
                                    Cookies.set(
                                        "token",
                                        response.data.token
                                    );
                                    navigate("/dashboard");
                                } else {
                                    setSignupStatus(
                                        SIGNUP_STATUSES.FAILURE
                                    );
                                }
                            });
                    }}
                >
                    Sign Up
                </button>
            </div>

            <div>
                <button
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    Sign In
                </button>
            </div>
        </>
    );
}

export default SignupPage;
