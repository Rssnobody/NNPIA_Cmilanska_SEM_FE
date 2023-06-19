import {AppUser, BookDetails} from "../data/data";
import {useNavigate} from "react-router-dom";
import {Button, Col, Container, Row, Image} from "react-bootstrap";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";


interface BookItemProps {
    bookDetails: BookDetails;
}

const BookItem = ({bookDetails}: BookItemProps) => {

        const navigate = useNavigate();

        const navigateToPage = () => {
            const bookString: string = JSON.stringify(bookDetails);
            localStorage.setItem('bookDetail', bookString);
            navigate(`/bookDetail/${bookDetails.bookId}`);
        };

        const handleDeleteBook = async () => {
            try {
                const token = localStorage.getItem('token');
                const userString = localStorage.getItem('activeUser');
                if (userString) {
                    const user = JSON.parse(userString) as AppUser;

                    const response = await axios.delete(
                        `http://localhost:9000/api/v1/user-book/delete/${user.userId}/${bookDetails.bookId}`,
                        {
                            headers: {
                                "Authorization": `Bearer ${token}`
                            }
                        });
                    const data = await response.data;
                }
            } catch (error) {
                console.error('Error deleting user book:', error);
            }
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
                    <Col xs={1} className="align-self-center">
                        <Button variant="primary" onClick={() => navigateToPage()}>
                            Details
                        </Button>
                    </Col>
                    <Col xs={2} className="align-self-center">
                        <Button variant="danger" onClick={() => handleDeleteBook()}>
                            <FontAwesomeIcon icon={faTrash}/> Delete
                        </Button>
                    </Col>
                </Row>
                <hr style={{color: "gray"}}/>
            </Container>
        );
    }
;

export default BookItem;