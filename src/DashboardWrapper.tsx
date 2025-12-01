import {useEffect, useState} from "react";
import axios from "axios";
import ClientDashboard from "./ClientDashboard"
import ProfessionalDashboard from "./ProfessionalDashboard"
import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom";
import CustomPage from "./CustomPage";

function DashboardWrapper () {
    const [userType, setUserType] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) {
            navigate("/")
        } else {
            axios.get("http://localhost:8080/get-default-params", {
                params: {token: token}
            }).then(response => {
                setUserType(response.data.userType)
            })

        }

    }, []);



    if (userType == 1) {
        return (
            <CustomPage>
                <ClientDashboard />
            </CustomPage>

        )
    } else if (userType == 2) {
        return  (
            <CustomPage>
                <ProfessionalDashboard />
            </CustomPage>
        )
    } else {
        return  (
            <CustomPage>
                LOADING...
            </CustomPage>
        )
    }

}

export default DashboardWrapper;