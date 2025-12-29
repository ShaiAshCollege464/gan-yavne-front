import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
import {HOST} from './Constants.js';
import image from "./assets/login_image.svg";
import './LoginPage.css'

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

function LoginPage() {
    const [selectedType, setSelectedType] = useState(USERS_TYPES.NONE);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState(LOGIN_STATUSES.PENDING);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("token");
        if (token != null) {
            navigate("/dashboard")
        }
    }, [navigate])

    const handleLogin = () => {
        axios.get(HOST + "login", {
            params: {username, password, selectedType}
        }).then(response => {
            if (response.data.success) {
                Cookies.set('token', response.data.token)
                navigate("/dashboard");
            } else {
                setLoginStatus(LOGIN_STATUSES.FAILURE)
            }
        }).catch(err => {
            console.error(err);
            setLoginStatus(LOGIN_STATUSES.FAILURE);
        });
    };

    return (
        <div className="login-container">
            <div className="login-card">
                {/* צד שמאל - תמונה */}
                <div className="login-image-section">
                    <img src={image} alt="Login Illustration" className="hero-image"/>
                </div>

                {/* צד ימין - טופס */}
                <div className="login-form-section">
                    <div className="form-header">
                        <h2>Welcome Back</h2>
                        <p>Please enter your details to sign in.</p>
                    </div>

                    {loginStatus === LOGIN_STATUSES.FAILURE && (
                        <div className="error-message">
                            Wrong credentials or connection error!
                        </div>
                    )}

                    <div className="form-group">
                        <label>User Type</label>
                        <div className="select-wrapper">
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(Number(e.target.value))}
                                className={selectedType === USERS_TYPES.NONE ? "placeholder" : ""}
                            >
                                <option disabled value={USERS_TYPES.NONE}>Select type</option>
                                <option value={USERS_TYPES.CLIENT}>Client</option>
                                <option value={USERS_TYPES.PROFESSIONALIST}>Professionalist</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter 6-digit password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        className="login-btn"
                        disabled={password.length !== 6 || username.length === 0 || selectedType === USERS_TYPES.NONE}
                        onClick={handleLogin}
                    >
                        Sign In
                    </button>
                </div>
                <div>
                    <button
                        className="login-btn"
                        onClick={()=>
                            navigate("/signup")
                        }>
                        Sign Up1
                    </button>
                </div>
            </div>
        </div>
    );
}
export default LoginPage;
