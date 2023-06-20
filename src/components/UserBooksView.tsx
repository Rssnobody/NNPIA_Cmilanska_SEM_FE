import {Col, Container, Row} from "react-bootstrap";
import {AppUser, BookDetails} from "../data/data";
import React, {useEffect, useState} from "react";
import axios from "axios";
import "../assets/styles/styles.css"
import BookItem from "./BookItem";

interface Props {
  appUser: AppUser
}

const UserBooksView = ({appUser} : Props) => {
    const [details, setDetails] = useState<BookDetails[]>([]);
    const [activeTab, setActiveTab] = useState('want-to-read');

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
    };

    useEffect(() => {
        const fetchBooks = async (url: string) => {
            try {
                const token = localStorage.getItem('token');

                const response = await axios.get(
                    url,
                    {headers: {
                            "Authorization": `Bearer ${token}`
                        }});
                const data = await response.data;
                setDetails(data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks(`http://localhost:9000/api/v1/book/${activeTab}/${appUser.userId}`);
    }, [activeTab]);

    const handleDeleteBook = async (bookDetails: BookDetails) => {
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
                if (response.status === 200) {
                    setDetails((prevDetails) =>
                        prevDetails.filter((detail) => detail.bookId !== bookDetails.bookId)
                    );
                }
            }
        } catch (error) {
            console.error('Error deleting user book:', error);
        }
    };

    return (
        <div className="event-schedule-area-two bg-color pad100">
            <Container>
                <Row>
                    <Col className="col-lg-12 mb-3">
                        <ul className="nav custom-tab" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className={`nav-link ${activeTab === 'want-to-read' ? 'active' : ''}`}
                                   id="want-to-read"
                                   data-toggle="tab"
                                   href="#want-to-read"
                                   role="tab"
                                   aria-controls="want-to-read"
                                   aria-selected={activeTab === 'want-to-read'}
                                   onClick={() => handleTabClick('want-to-read')}>
                                    Want to read</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${activeTab === 'reading' ? 'active' : ''}`}
                                   id="reading"
                                   data-toggle="tab"
                                   href="#reading"
                                   role="tab"
                                   aria-controls="reading"
                                   aria-selected={activeTab === 'reading'}
                                   onClick={() => handleTabClick('reading')}>
                                    Currently reading</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${activeTab === 'read' ? 'active' : ''}`}
                                   id="read"
                                   data-toggle="tab"
                                   href="#read"
                                   role="tab"
                                   aria-controls="read"
                                   aria-selected={activeTab === 'read'}
                                   onClick={() => handleTabClick('read')}>
                                    Read</a>
                            </li>
                        </ul>
                    </Col>
                    <Row>
                        <Col className="col-lg-12">
                            <Row>
                                {(details && details.length > 0) ?
                                    (details.map((b) => (
                                        <BookItem
                                            bookDetails={b}
                                            handleDeleteClicked={handleDeleteBook}
                                            activeTab={activeTab}
                                            key={b.bookId} />
                                    )))
                                : (<div
                                        className="text-center text-black-50 mt-3"
                                        style={{ fontSize: "larger"}}>
                                        No books in list...</div>)}
                            </Row>
                        </Col>
                    </Row>
                </Row>
            </Container>
        </div>
    );
}

export default UserBooksView;