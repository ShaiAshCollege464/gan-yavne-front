import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {HOST} from "./Constants.js";
import Cookies from "js-cookie";

const USERS_TYPES = {
    NONE: 0,
    CLIENT: 1,
    PROFESSIONALIST: 2
}

const SIGNUP_STATUSES = {
    PENDING: 0,
    SUCCESS: 1,
    FAILURE: 2
}

function SignupPage() {
    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState(USERS_TYPES.NONE);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("")

    const [areas, setAreas] = useState("")
    const [plan, setPlan] = useState("")

    const [signupStatus, setSignupStatus] = useState(SIGNUP_STATUSES.PENDING);

    return (
        <>
            {
                signupStatus === SIGNUP_STATUSES.FAILURE &&
                <div>
                    Something Wrong...
                </div>
            }

            <select value={selectedType} onChange={(event) => {
                setSelectedType(event.target.value);
            }}>
                <option disabled={true} value={USERS_TYPES.NONE}>
                    Select type
                </option>
                <option value={USERS_TYPES.CLIENT}>
                    Client
                </option>
                <option value={USERS_TYPES.PROFESSIONALIST}>
                    Professionalist
                </option>
            </select>
            {
                selectedType !== USERS_TYPES.NONE &&
                <>
                    <div>
                        <input placeholder={"username"} type={"text"} value={username} onChange={(event) => {
                            setUsername(event.target.value);
                        }}/>
                    </div>
                    <div>
                        <input placeholder={"password"} type={"password"} value={password} onChange={(event) => {
                            setPassword(event.target.value);
                        }}/>
                    </div>
                    <div>
                        <input placeholder={"contactInfo"} type={"text"} value={contactInfo} onChange={(event) => {
                            setContactInfo(event.target.value);
                        }}/>
                    </div>
                    <div>
                        <input placeholder={"full name"} type={"text"} value={fullName} onChange={(event) => {
                            setFullName(event.target.value);
                        }}/>
                    </div>
                    {
                        selectedType === USERS_TYPES.CLIENT &&
                        <div>
                            <input placeholder={"address"} type={"text"} value={address} onChange={(event) => {
                                setAddress(event.target.value);
                            }}/>
                        </div>
                    }
                    {
                        selectedType === USERS_TYPES.PROFESSIONALIST &&
                        <>
                            <div>
                                <input placeholder={"areas"} type={"text"} value={areas} onChange={(event) => {
                                    setAreas(event.target.value);
                                }}/>
                            </div>
                            <div>
                                <input placeholder={"plan"} type={"text"} value={plan} onChange={(event) => {
                                    setPlan(event.target.value);
                                }}/>
                            </div>
                        </>
                    }
                </>}

            <div>
                <button
                    disabled={
                        username.length === 0
                        || password.length !== 6
                        || selectedType === USERS_TYPES.NONE
                        || contactInfo.length === 0
                        || !fullName.includes(" ")
                        || ((selectedType === USERS_TYPES.CLIENT) && address.length === 0)
                        || ((selectedType===USERS_TYPES.PROFESSIONALIST) && areas.length===0)
                        || ((selectedType===USERS_TYPES.PROFESSIONALIST) && plan.length===0)
                }
                    onClick={() => {
                        axios.get(HOST + "signup", {
                            params: {selectedType, username, password,fullName, address, areas, plan,contactInfo}
                        }).then(response => {
                            if (response.data.success) {
                                Cookies.set('token', response.data.token)
                                navigate("/dashboard");
                            } else {
                                setSignupStatus(SIGNUP_STATUSES.FAILURE)
                            }
                        })
                    }
                    }>
                    Sign Up
                </button>
            </div>

            <div>
                <button
                    onClick={() => {
                        navigate("/")
                    }
                    }>
                    Sign In
                </button>
            </div>
        </>
    )
}

export default SignupPage;
