import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {AppUser} from "../data/data";
import {Link, useNavigate} from "react-router-dom";
import UserBooksView from "./UserBooksView";
import CreateBookForm from "./form/CreateBookForm";


const UserAccount = () => {
    const [user, setUser] = useState<AppUser>();
    const [error, setError] = useState('');
    const userString = localStorage.getItem('activeUser');
    const navigate = useNavigate();


    useEffect(() => {
        if (userString) {
            const user = JSON.parse(userString);
            setUser(user);
        } else {
            navigate('/');
        }
    }, []);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

    }

    return (
        <Container className="py-4">
            <Row className="justify-content-evenly">
                <Col>
                    <div>
                        <h2>Account info</h2>
                        <div className="py-4 col-md-12">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">User Name</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {user?.loginName}
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Full Name</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {user?.firstName} {user?.lastName}
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Email</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {user?.email}
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Date of birth</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {new Date(user?.dateOfBirth!!).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Unread books</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            cisloooo
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Read books</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            cisloooo
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col>
                    <div>
                        {/*<CreateBookForm/>*/}
                        {/*<h3>Add book</h3>*/}
                        {/*<Form onSubmit={handleSubmit}>*/}
                        {/*    <Form.Group controlId="title">*/}
                        {/*        <Form.Label>Book Title</Form.Label>*/}
                        {/*        <Form.Control*/}
                        {/*            type="text"*/}
                        {/*            required*/}
                        {/*            placeholder="Enter book title"*/}
                        {/*        />*/}
                        {/*    </Form.Group>*/}
                        {/*    <Form.Group controlId="cover">*/}
                        {/*        <Form.Label>Cover picture URL</Form.Label>*/}
                        {/*        <Form.Control*/}
                        {/*            type="text"*/}
                        {/*            required*/}
                        {/*            placeholder="Enter book cover picture URL"*/}
                        {/*        />*/}
                        {/*    </Form.Group>*/}
                        {/*    <Form.Group controlId="cover">*/}
                        {/*        <Form.Label>Cover picture URL</Form.Label>*/}
                        {/*        <Form.Control*/}
                        {/*            type="text"*/}
                        {/*            required*/}
                        {/*            placeholder="Enter book cover picture URL"*/}
                        {/*        />*/}
                        {/*    </Form.Group>*/}
                        {/*    <Form.Group controlId="cover">*/}
                        {/*        <Form.Label>Cover picture URL</Form.Label>*/}
                        {/*        <Form.Control*/}
                        {/*            type="text"*/}
                        {/*            required*/}
                        {/*            placeholder="Enter book cover picture URL"*/}
                        {/*        />*/}
                        {/*    </Form.Group>*/}
                        {/*    {error && <Alert variant="danger">{error}</Alert>}*/}
                        {/*    <Button*/}
                        {/*        type="submit"*/}
                        {/*        variant="primary"*/}
                        {/*        className="w-100 mt-3">*/}
                        {/*        Sign In*/}
                        {/*    </Button>*/}
                        {/*    <div className="w-100 text-center mt-3">*/}
                        {/*        Don't have an account? <Link to="/register">Sign up</Link>*/}
                        {/*    </div>*/}
                        {/*</Form>*/}
                    </div>
                </Col>
            </Row>
            <br/>
            <UserBooksView/>
        </Container>
    );
}

export default UserAccount;