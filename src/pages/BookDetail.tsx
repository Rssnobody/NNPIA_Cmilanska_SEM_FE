import React, {useEffect, useState} from 'react';
import {AppUser, Book, BookDetails, UserBook} from "../data/data";
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";
import {Button, Card, Col, Container, Modal, Row} from "react-bootstrap";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {useAuth} from "../context/AuthContext";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStarHalfAlt as halfStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";


const BookDetail = () => {
    const [bookDetail, setBookDetail] = useState<BookDetails>();
    const [user, setUser] = useState<AppUser>();
    const [bookRating, setBookRating] = useState(0);
    const [userBook, setUserBook] = useState<UserBook>();
    const [selectedState, setSelectedState] = useState<number>();
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const {isAuthenticated} = useAuth();
    const {id} = useParams();

    const calculateRating = () => {
        let result: number = 0;

        if (bookDetail?.reviews == null) result = -1;

        bookDetail?.reviews.map((review) => {
            result += review.rating.value;
        });

        result = result / bookDetail!.reviews!.length;
        setBookRating(Math.round(result * 10) / 10);
    };


    useEffect(() => {
        const fetchBookDetails = async (bookId: number) => {
            try {
                const response = await axios.get(`http://localhost:9000/api/v1/book/details/${bookId}`);
                const data = await response.data;
                setBookDetail(data);
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        const bookStr = localStorage.getItem('book');
        const detailStr = localStorage.getItem('bookDetail');
        if (bookStr) {
            const book = JSON.parse(bookStr) as Book;
            const parsedId = +id!!;

            if (book.bookId !== parsedId) {
                navigate(`/`);
            }

            fetchBookDetails(book.bookId);

        } else if (detailStr) {
            const book = JSON.parse(detailStr) as Book;
            const parsedId = +id!!;

            if (book.bookId != parsedId) {
                navigate(`/`);
            }

            fetchBookDetails(book.bookId);
        } else {
            navigate(`/`);
        }

        const beforeUnload = () => {
            if (localStorage.getItem('book')) {
                localStorage.removeItem('book');
            }
            if (localStorage.getItem('bookDetail')) {
                localStorage.removeItem('bookDetail');
            }
        };

        window.addEventListener('beforeunload', beforeUnload);

        return () => {
            window.removeEventListener('beforeunload', beforeUnload);
        };
    }, []);

    useEffect(() => {
        const fetchUserBook = async (userId: number, bookId: number) => {
            try {
                const token = localStorage.getItem('token');

                const response = await axios.get(
                    `http://localhost:9000/api/v1/user-book/find/${userId}/${bookId}`,
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });
                const data = await response.data;
                setUserBook(data);
                if (userBook == null) setSelectedState(0);
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        const userString = localStorage.getItem('activeUser');
        if (userString) {
            const user = JSON.parse(userString) as AppUser;
            setUser(user);
            if (bookDetail) {
                fetchUserBook(user.userId, bookDetail.bookId);
            }
        }
    }, [bookDetail]);

    useEffect(() => {
        if (bookDetail) {
            calculateRating();
        }
        if (userBook?.state) {
            setSelectedState(userBook.state.stateId);
        }
    }, [bookDetail, userBook]);

    const renderRatingStars = (rating: number) => {
        const starCount = 5; // Assuming the maximum rating is 5.

        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        const stars = [];
        for (let i = 0; i < fullStars; i++) {
            stars.push(<FontAwesomeIcon key={i} icon={solidStar} />);
        }

        if (hasHalfStar) {
            stars.push(<FontAwesomeIcon key={fullStars} icon={halfStar} />);
        }

        for (let i = stars.length; i < starCount; i++) {
            stars.push(<FontAwesomeIcon key={i} icon={emptyStar} />);
        }

        return <div>{stars}</div>;
    };

    const renderRating = () => {
        if (Number.isNaN(bookRating)) {
            return <div>No rating yet.</div>
        }
        return <div>
            {bookRating} / 5
            {renderRatingStars(bookRating)}
        </div>
    };

    const handleStateChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedStateId = parseInt(event.target.value);
        setSelectedState(selectedStateId);

        try {
            const token = localStorage.getItem('token');

            await axios.post(
                'http://localhost:9000/api/v1/user-book/update-state',
                {
                    userBookId: userBook?.id,
                    userId: userBook?.user.userId,
                    bookId: userBook?.book.bookId,
                    stateId: selectedStateId,
                    reviewId: userBook?.review == null ? null : userBook?.review.reviewId
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('State updated successfully!');
        } catch (error) {
            console.error('Error updating state:', error);
        }
    };

    const handleNewState = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedStateId = parseInt(event.target.value);
        setSelectedState(selectedStateId);

        try {
            const token = localStorage.getItem('token');

            await axios.post(
                'http://localhost:9000/api/v1/user-book/create',
                {
                    userId: user?.userId,
                    bookId: bookDetail?.bookId,
                    stateId: selectedStateId,
                    reviewId: null
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('UserBook created successfully!');
        } catch (error) {
            console.error('Error creating userBook:', error);
        }
    };

    const handlePlusClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <Container className="py-4" style={{maxWidth: "800px"}}>
            <Row>
                <Col>
                    <Card className="bg-light text-black text-center p-0 overflow-hidden shadow">
                        <div
                            style={{
                                background: 'white',
                                height: '15rem',
                                overflow: 'hidden',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 'inherit',
                            }}
                        >
                            <div style={{width: '9rem'}}>
                                <Card.Img variant="top" src={bookDetail?.picture} className="img-fluid"/>
                            </div>
                        </div>
                        <Card.Body>
                            <Card.Title>{bookDetail?.name}</Card.Title>
                            <Card.Text>
                                {bookDetail?.authors.map((authors) => (
                                    <span key={authors.authorId}>{`${authors.firstName} ${authors.lastName}`}</span>
                                ))}
                            </Card.Text>
                            {isAuthenticated ? (
                                    selectedState !== 0 ? (
                                            <div className="d-flex justify-content-center">
                                                <select value={selectedState} onChange={handleStateChange}>
                                                    <option value={1}>Want to read</option>
                                                    <option value={2}>Currently reading</option>
                                                    <option value={3}>Read</option>
                                                </select>
                                            </div>
                                        )
                                        : (<Button
                                            variant="outline-secondary"
                                            className="rounded-circle"
                                            onClick={() => handlePlusClick()}>
                                            <FontAwesomeIcon icon={faPlus}/>
                                        </Button>)
                                )
                                : <></>}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card className="bg-light text-black text-center p-0 overflow-hidden shadow mt-4">
                        <Card.Body>
                            <Card.Title>Description</Card.Title>
                            <Card.Text>{bookDetail?.description}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>

                    <Card className="bg-light text-black text-center p-0 overflow-hidden shadow mt-4">
                        <Card.Body>
                            <Card.Title>Rating</Card.Title>
                            <Card.Text>
                                {renderRating()}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card className="bg-light text-black text-center p-0 overflow-hidden shadow mt-4">
                        <Card.Body>
                            <Card.Title>Reviews</Card.Title>
                            {bookDetail?.reviews.map((review) => (
                                <Card key={review.reviewId} className="m-3">
                                    <Card.Header>{renderRatingStars(review.rating.value)}</Card.Header>
                                    <Card.Text className="m-1">{review.text}</Card.Text>
                                </Card>
                            ))}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add book to list</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-center">
                        <select value={selectedState} onChange={handleNewState}>
                            <option value={0}>...</option>
                            <option value={1}>Want to read</option>
                            <option value={2}>Currently reading</option>
                            <option value={3}>Read</option>
                        </select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default BookDetail;