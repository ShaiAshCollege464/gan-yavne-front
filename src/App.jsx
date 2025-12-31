import React from 'react';
import './styles/global.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import DashboardWrapper from "./DashboardWrapper.jsx";
import Layout from "./components/Layout.jsx";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path={"/"} element={<LoginPage />} />
                    <Route path={"/signup"} element={<SignupPage />} />
                    <Route path={"/dashboard"} element={<DashboardWrapper />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default App;
