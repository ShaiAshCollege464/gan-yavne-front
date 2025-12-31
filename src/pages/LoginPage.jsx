import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { HOST } from '../Constants.js';
import image from "../assets/login_image.svg";
import Button from "../components/Button";
import Input from "../components/Input";
import Card from "../components/Card";

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
            params: { username, password, selectedType }
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
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4rem',
            padding: '2rem'
        }}>
            {/* Image Section - Hidden on mobile */}
            <div style={{ flex: 1, maxWidth: '500px', display: 'flex', justifyContent: 'center' }} className="hide-on-mobile">
                <img src={image} alt="Login Illustration" style={{ width: '100%', height: 'auto' }} />
            </div>

            {/* Form Section */}
            <div style={{ flex: 1, maxWidth: '400px', width: '100%' }}>
                <Card title="Welcome Back">
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        Please enter your details to sign in.
                    </p>

                    {loginStatus === LOGIN_STATUSES.FAILURE && (
                        <div style={{
                            padding: '1rem',
                            backgroundColor: '#fef2f2',
                            color: '#dc2626',
                            borderRadius: 'var(--radius-md)',
                            marginBottom: '1rem',
                            fontSize: '0.9rem'
                        }}>
                            Wrong credentials or connection error!
                        </div>
                    )}

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>User Type</label>
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(Number(e.target.value))}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--border)',
                                backgroundColor: 'var(--surface)',
                                fontSize: '1rem',
                                color: selectedType === USERS_TYPES.NONE ? 'var(--text-secondary)' : 'var(--text-main)'
                            }}
                        >
                            <option disabled value={USERS_TYPES.NONE}>Select type</option>
                            <option value={USERS_TYPES.CLIENT}>Client</option>
                            <option value={USERS_TYPES.PROFESSIONALIST}>Professional</option>
                        </select>
                    </div>

                    <Input
                        label="Username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter 6-digit password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <Button
                            text="Sign In"
                            onClick={handleLogin}
                            disabled={password.length !== 6 || username.length === 0 || selectedType === USERS_TYPES.NONE}
                        />

                        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Don't have an account? </span>
                            <button
                                onClick={() => navigate("/signup")}
                                style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem' }}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
            <style>{`
                @media (max-width: 768px) {
                    .hide-on-mobile {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    );
}

export default LoginPage;
