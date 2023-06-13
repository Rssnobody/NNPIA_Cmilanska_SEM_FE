import React, { useState } from "react";
import {Alert, Button, Card, Col, Form, Row} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import {AppUser} from "../data/data";
import "../assets/styles/styles.css"
import {useAuth} from "../context/AuthContext";

const Login = () => {
    const [loginName, setLoginName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {login} = useAuth();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:9000/api/v1/auth/login',
                { userName: loginName, password: password });
            const token = response.data.jwt;
            localStorage.setItem('token', token);

            try {
               await axios.get(`http://localhost:9000/api/v1/app-user/find/${loginName}`,
                    {headers: {
                        "Authorization": `Bearer ${token}`
                        }})
                    .then(res => {
                        const user: AppUser = res.data;
                        localStorage.setItem('activeUser', JSON.stringify(user));
                        login();
                    });
            } catch (err: any) {
                console.error('Error fetching user:', err.message);
                setError(err.message);
            }
        } catch (error: any) {
            console.error('Error during logging in:', error.message);
            setError(error.message);
        }
    }

    function handleLoginChange(event: React.ChangeEvent<HTMLInputElement>) {
        setLoginName(event.target.value);
    }

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    return (
        <div>
            <Row>
                <Col className="login-image">
                </Col>
                <Col md={5} >
                    <div className="login-form">
                        <Card className={'bg-light text-black text-center overflow-hidden shadow'}>
                            <div className="p-5">
                                <h2 className="text-center">Login</h2>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="email">
                                        <Form.Label>Login Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={loginName}
                                            onChange={handleLoginChange}
                                            required
                                            placeholder="Enter login name"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={password}
                                            onChange={handlePasswordChange}
                                            required
                                            placeholder="Enter password"
                                        />
                                    </Form.Group>
                                    {error && <Alert variant="danger">{error}</Alert>}
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        className="w-100 mt-3">
                                        Sign In
                                    </Button>
                                    <div className="w-100 text-center mt-3">
                                        Don't have an account? <Link to="/register">Sign up</Link>
                                    </div>
                                </Form>
                            </div>
                        </Card>

                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Login;