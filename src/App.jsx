import React from 'react';
import './styles/global.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import DashboardWrapper from "./DashboardWrapper.jsx";
import Layout from "./components/Layout.jsx";
import PostPage from "./pages/PostPage.jsx";
import BidPage from "./pages/BidPage.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<LoginPage />} />
                <Route path={"/signup"} element={<SignupPage />} />
                <Route path={"/dashboard"} element={<DashboardWrapper />} />
                <Route path={"/post/:id"} element={<PostPage />} />
                <Route path={"/bid/:id"} element={<BidPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
