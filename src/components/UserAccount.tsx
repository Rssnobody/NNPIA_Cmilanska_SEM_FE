import {Col, Container, Image, Modal, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {AppUser, BookInput} from "../data/data";
import {useNavigate} from "react-router-dom";
import UserBooksView from "./UserBooksView";
import CreateBookForm from "./form/CreateBookForm";
import axios from "axios";


const UserAccount = () => {
    const [user, setUser] = useState<AppUser>();
    const [error, setError] = useState('');
    const userString = localStorage.getItem('activeUser');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        if (userString) {
            const user = JSON.parse(userString);
            setUser(user);
        } else {
            navigate('/');
        }
    }, []);

    const handleAddBookClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleCreateBook = async (book: BookInput) => {
        try {
            const token = localStorage.getItem('token');

            await axios.post(
                'http://localhost:9000/api/v1/book/create',
                {
                    name: book.name,
                    picture: book.picture,
                    description: book.description,
                    authors: book.authors
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('Book created successfully!');
        } catch (error) {
            console.error('Error creating book:', error);
        }
    };

    return (
        <Container className="py-4">
            <Row className="justify-content-evenly">
                <div className="col-md-6">
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
                </div>

                <Col className="col-md-6 d-flex align-items-center justify-content-center">
                    <div
                        className="add-book-button"
                        onClick={handleAddBookClick}
                        style={{
                            borderRadius: "30px",
                            maxHeight: "400px",
                            position: "relative",
                        }}
                    >
                        <Image
                            src="src/assets/bookAvatar.jpg"
                            fluid
                            style={{
                                borderRadius: "30px",
                                maxHeight: "400px",
                                transition: "opacity 0.3s ease",
                            }}
                            className="add-book-button-image"
                        />
                        <div className="add-book-button-overlay">
                            <div className="add-book-button-text">Add book</div>
                        </div>
                        <div className="plus-character">+</div>
                    </div>
                </Col>
            </Row>
            <br/>
            {user && <UserBooksView appUser={user} />}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateBookForm onSubmit={handleCreateBook} />
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default UserAccount;