import React from "react";
import "react-bootstrap";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home"
import LoginPage from "./components/Login";
import Header from "./components/Header";
import Register from "./components/Register";
import BookDetail from "./pages/BookDetail";
import UserAccount from "./components/UserAccount";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route
                        path={"/"}
                        element={<Home/>}
                    />
                    <Route
                        path={"/login"}
                        element={<LoginPage/>}
                    />
                    <Route
                        path={"/register"}
                        element={<Register/>}
                    />
                    <Route
                        path={"/bookDetail/*"}>
                        <Route
                            path={":id"}
                            element={<BookDetail/>}/>
                    </Route>
                    <Route
                        path={"/account"}
                        element={<UserAccount />}
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;