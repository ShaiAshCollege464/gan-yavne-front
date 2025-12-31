import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { HOST } from "../Constants.js";
import Cookies from "js-cookie";
import Button from "../components/Button";
import Input from "../components/Input";
import Card from "../components/Card";

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

    const handleSignup = () => {
        axios.get(HOST + "signup", {
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
        }).then((response) => {
            if (response.data.success) {
                Cookies.set("token", response.data.token);
                navigate("/dashboard");
            } else {
                setSignupStatus(SIGNUP_STATUSES.FAILURE);
            }
        });
    };

    const isFormValid = () => {
        return !(
            username.length === 0 ||
            password.length !== 6 ||
            selectedType === USERS_TYPES.NONE ||
            contactInfo.length === 0 ||
            !fullName.includes(" ") ||
            (selectedType === USERS_TYPES.CLIENT && address.length === 0) ||
            (selectedType === USERS_TYPES.PROFESSIONALIST && areas.length === 0) ||
            (selectedType === USERS_TYPES.PROFESSIONALIST && plan <= 0)
        );
    };

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
        }}>
            <Card title="Create Account" style={{ maxWidth: '600px', width: '100%' }}>
                {signupStatus === SIGNUP_STATUSES.FAILURE && (
                    <div style={{
                        padding: '1rem',
                        backgroundColor: '#fef2f2',
                        color: '#dc2626',
                        borderRadius: 'var(--radius-md)',
                        marginBottom: '1rem',
                        fontSize: '0.9rem'
                    }}>
                        Something went wrong. Please try again.
                    </div>
                )}

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>I am a...</label>
                    <select
                        value={selectedType}
                        onChange={(event) => setSelectedType(Number(event.target.value))}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border)',
                            backgroundColor: 'var(--surface)',
                            fontSize: '1rem'
                        }}
                    >
                        <option disabled value={USERS_TYPES.NONE}>Select type</option>
                        <option value={USERS_TYPES.CLIENT}>Client</option>
                        <option value={USERS_TYPES.PROFESSIONALIST}>Professional</option>
                    </select>
                </div>

                {selectedType !== USERS_TYPES.NONE && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <Input
                            label="Username"
                            placeholder="Choose a username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="6-digit password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Input
                            label="Full Name"
                            placeholder="First and Last Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            style={{ gridColumn: 'span 2' }}

                        />
                        <Input
                            label="Contact Info"
                            placeholder="Phone or Email"
                            value={contactInfo}
                            onChange={(e) => setContactInfo(e.target.value)}
                            style={{ gridColumn: 'span 2' }}
                        />

                        {selectedType === USERS_TYPES.CLIENT && (
                            <Input
                                label="Address"
                                placeholder="Your address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                style={{ gridColumn: 'span 2' }}
                            />
                        )}

                        {selectedType === USERS_TYPES.PROFESSIONALIST && (
                            <>
                                <Input
                                    label="Service Areas"
                                    placeholder="e.g. Tel Aviv, Haifa"
                                    value={areas}
                                    onChange={(e) => setAreas(e.target.value)}
                                    style={{ gridColumn: 'span 2' }}
                                />
                                <Input
                                    label="Plan Tier"
                                    type="number"
                                    placeholder="Enter plan number"
                                    value={plan}
                                    onChange={(e) => setPlan(Number(e.target.value))}
                                />
                            </>
                        )}
                    </div>
                )}

                <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Button
                        text="Sign Up"
                        onClick={handleSignup}
                        disabled={!isFormValid()}
                    />
                    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Already have an account? </span>
                        <button
                            onClick={() => navigate("/")}
                            style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem' }}
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </Card>
            <style>{`
                @media (max-width: 600px) {
                    div[style*="grid-template-columns"] {
                        grid-template-columns: 1fr !important;
                    }
                    div[style*="grid-column: span 2"] {
                        grid-column: span 1 !important;
                    }
                }
            `}</style>
        </div>
    );
}

export default SignupPage;
