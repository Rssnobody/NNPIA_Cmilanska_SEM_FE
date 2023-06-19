import React, {useEffect, useState} from 'react';
import {Book} from "../data/data";
import BookCard from "./BookCard";
import {Col, Dropdown, DropdownButton, FormControl, InputGroup, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const BookList = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [searchText, setSearchText] = useState<string>('');
    const [sortOption, setSortOption] = useState<"none" | "asc" | "desc">("none");
    const [booksPerPage] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
    const totalBooks = filteredBooks.length;
    const totalPages = Math.ceil(totalBooks / booksPerPage);
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const currentBooks = filteredBooks.slice(startIndex, endIndex);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/v1/book');
                const data = await response.data;
                setBooks(data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    useEffect(() => {
        const filtered = books.filter((book) => {
            const bookNameMatch = book.name.toLowerCase().includes(searchText);
            const authorNameMatch = book.authors.some(
                (author) =>
                    author.firstName.toLowerCase().includes(searchText) ||
                    author.lastName.toLowerCase().includes(searchText)
            );

            return bookNameMatch || authorNameMatch;
        });

        setFilteredBooks(searchText === '' ? books : filtered);
    }, [searchText, books]);

    useEffect(() => {
        sortBooks();
    }, [sortOption]);

    const goToPage = (page: number) => {
        setCurrentPage(page);
    };

    const sortBooks = () => {
        const sortedBooks = [...filteredBooks].sort((a, b) => {
            const bookNameA = a.name.toLowerCase();
            const bookNameB = b.name.toLowerCase();
            if (sortOption === "asc") {
                if (bookNameA < bookNameB) return -1;
                if (bookNameA > bookNameB) return 1;
            } else if (sortOption === "desc") {
                if (bookNameA > bookNameB) return -1;
                if (bookNameA < bookNameB) return 1;
            }
            return 0;
        });
        setFilteredBooks(sortedBooks);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = event.target.value.toLowerCase();
        setSearchText(searchText);
    };

    const handleSortChange = (eventKey: string | null) => {
        const selectedSortOption = eventKey as "none" | "asc" | "desc";
        setSortOption(selectedSortOption);
    };

    return (
        <div className="py-4">
            <Row className="justify-content-center p-0 m-0">
                <Col md={4}></Col>
                <Col xs={6} md={4} className="pr-0">
                    <InputGroup>
                        <InputGroup.Text>
                            <FontAwesomeIcon icon={faSearch} />
                        </InputGroup.Text>
                        <FormControl
                            type="text"
                            placeholder="Search by book or author"
                            onChange={handleSearch}
                        />
                    </InputGroup>
                </Col>
                <Col xs={6} md={3} className="pl-0">
                    <div className="d-flex justify-content-end">
                        <Dropdown className="me-3">

                            <DropdownButton id="sort-dropdown"
                                            title="Sort books"
                                            onSelect={handleSortChange}>
                                <Dropdown.Item eventKey="none">None</Dropdown.Item>
                                <Dropdown.Item eventKey="asc">Ascending</Dropdown.Item>
                                <Dropdown.Item eventKey="desc">Descending</Dropdown.Item>
                            </DropdownButton>
                        </Dropdown>
                    </div>
                </Col>
                <Col md={1}></Col>
            </Row>
            <br/>
            <div className="d-flex justify-content-start">
                <div className="card-container">
                    {currentBooks.map((b) => (
                        <BookCard book={b} key={b.bookId} />
                    ))}
                </div>
            </div>

            <div className="pagination">
                <button
                    className={`btn ${currentPage === 1 ? 'disabled' : ''}`}
                    onClick={() => { goToPage(currentPage-1)}}
                    disabled={currentPage === 1}>
                    Previous
                </button>
                <span className="page-number">{currentPage}</span>
                <button
                    className={`btn ${currentPage === totalPages ? 'disabled' : ''}`}
                    onClick={() => { goToPage(currentPage+1)}}
                    disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default BookList;