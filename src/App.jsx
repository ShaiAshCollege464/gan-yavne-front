import './App.css'
import LoginPage from "./LoginPage.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./HomePage.jsx";

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<LoginPage />}/>
                    <Route path={"/dashboard"} element={<HomePage/>}/>
                </Routes>
            </BrowserRouter>

        </>
    )
}

export default App
