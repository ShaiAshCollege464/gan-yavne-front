import './App.css'
import LoginPage from "./LoginPage.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ClientDashboard from "./ClientDashboard.jsx";
import ProfessionalDashboard from "./ProfessionalDashboard.tsx";
import DashboardWrapper from "./DashboardWrapper.js";

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<LoginPage />}/>
                    <Route path={"/dashboard"} element={<DashboardWrapper/>}/>
                </Routes>
            </BrowserRouter>

        </>
    )
}

export default App
