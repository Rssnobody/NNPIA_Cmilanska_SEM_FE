import {AppUser, BookDetails, Review, ReviewInput, UserBook} from "../data/data";
import {useNavigate} from "react-router-dom";
import {Button, Col, Container, Row, Image, Modal, Form} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import AddReviewForm from "./form/AddReviewForm";


interface BookItemProps {
    bookDetails: BookDetails;
    activeTab: string;
    handleDeleteClicked: (bookDetails: BookDetails) => void;
}

const BookItem = ({bookDetails, handleDeleteClicked, activeTab}: BookItemProps) => {
        const [userBook, setUserBook] = useState<UserBook>();
        const [user, setUser] = useState<AppUser>();
        const [review, setReview] = useState<Review>();
        const [showModal, setShowModal] = useState(false);
        const navigate = useNavigate();

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
                    setReview(userBook?.review);
                } catch (error) {
                    console.error('Error fetching book details:', error);
                }
            };

            const userString = localStorage.getItem('activeUser');
            if (userString) {
                const user = JSON.parse(userString) as AppUser;
                setUser(user);
                if (bookDetails) {
                    fetchUserBook(user.userId, bookDetails.bookId);
                }
            }
        }, [bookDetails]);

        const navigateToPage = () => {
            const bookString: string = JSON.stringify(bookDetails);
            localStorage.setItem('bookDetail', bookString);
            navigate(`/bookDetail/${bookDetails.bookId}`);
        };

        const handleCreateReview = async (review: ReviewInput) => {
            try {
                const token = localStorage.getItem('token');

                const response = await axios.post(
                    'http://localhost:9000/api/v1/review/create',
                    {
                        creationDate: review.creationDate,
                        text: review.text,
                        ratingValue: review.ratingValue,
                        userId: user?.userId,
                        bookId: bookDetails.bookId
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await response.data;
                setReview(data);

                handleCloseModal();
                console.log('Review created successfully!');
            } catch (error) {
                console.error('Error creating review:', error);
            }
        };

        const handleCloseModal = () => {
            setShowModal(false);
        };

        const handleShowModal = () => {
            setShowModal(true);
        };

        return (
            <Container>
                <Row className="book-item align-items-center">
                    <Col xs={3}>
                        <Image src={bookDetails.picture} rounded className="book-image"/>
                    </Col>
                    <Col xs={3}>
                        <div className="book-details">
                            <h4 className="book-name">{bookDetails.name}</h4>
                        </div>
                    </Col>
                    <Col xs={3}>
                        <h6 className="book-author">
                            {bookDetails.authors.map((author) => {
                                return <>{author.firstName} {author.lastName}</>
                            })}
                        </h6>
                    </Col>
                    {userBook?.review === null && activeTab === "read" ?
                        <Col xs={1} className="align-self-center">
                            <Button variant="primary" onClick={() => handleShowModal()}>
                                Review
                            </Button>
                        </Col> : <></>
                    }
                    <Col xs={1} className="align-self-center">
                        <Button variant="primary" onClick={() => navigateToPage()}>
                            Details
                        </Button>
                    </Col>
                    <Col xs={1} className="align-self-center">
                        <Button variant="danger" onClick={() => handleDeleteClicked(bookDetails)}>
                            <FontAwesomeIcon icon={faTrash}/>
                        </Button>
                    </Col>
                </Row>
                <hr style={{color: "gray"}}/>
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Review</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddReviewForm onSubmit={handleCreateReview} />
                    </Modal.Body>
                </Modal>
            </Container>
        );
    }
;

export default BookItem;