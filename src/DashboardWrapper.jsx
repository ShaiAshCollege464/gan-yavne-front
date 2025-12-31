import { useEffect, useState } from "react";
import axios from "axios";
import ClientDashboard from "./pages/ClientDashboard.jsx"
import ProfessionalDashboard from "./pages/ProfessionalDashboard.jsx"
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { HOST } from "./Constants";

function DashboardWrapper() {
    const [userType, setUserType] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) {
            navigate("/")
        } else {
            axios.get(HOST + "get-default-params", {
                params: { token: token }
            }).then(response => {
                setUserType(response.data.userType)
            })
        }
    }, [navigate]);


    if (userType == 1) {
        return (
            <ClientDashboard />
        )
    } else if (userType == 2) {
        return (
            <ProfessionalDashboard />
        )
    } else {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh',
                color: 'var(--text-secondary)'
            }}>
                Loading...
            </div>
        )
    }

}

export default DashboardWrapper;