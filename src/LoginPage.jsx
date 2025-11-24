import {useEffect, useState} from "react";
import axios from "axios";

const USERS_TYPES = {
    NONE: 0,
    CLIENT: 1,
    PROFESSIONALIST: 2
}

const LOGIN_STATUSES = {
    PENDING: 0,
    SUCCESS: 1,
    FAILURE: 2
}

function LoginPage () {
    const [selectedType, setSelectedType] = useState(USERS_TYPES.NONE);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState(LOGIN_STATUSES.PENDING);

    useEffect(() => {
        if (username.length > 0 && password.length === 6) {
            axios.get("http://localhost:8080/login", {
                params: {username, password}
            }).then(response => {
                if (response.data.success) {
                    setLoginStatus(LOGIN_STATUSES.SUCCESS)
                } else {
                    setLoginStatus(LOGIN_STATUSES.FAILURE)
                }
            })
        }
    }, [username, password]);

    return (
        <>
            {
                loginStatus == LOGIN_STATUSES.SUCCESS ?
                    <>
                        Success
                    </>
                    :
                    <>
                        <div>
                            {
                                loginStatus == LOGIN_STATUSES.FAILURE &&
                                <div>
                                    Wrong credentials!
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
                            <div>
                                <input type={"text"} value={username} onChange={(event) => {
                                    setUsername(event.target.value);
                                }}/>
                            </div>
                            <div>
                                <input type={"password"} value={password} onChange={(event) => {
                                    setPassword(event.target.value);
                                }}/>
                            </div>
                        </div>

                    </>
            }
        </>
    )

}
export default LoginPage;
