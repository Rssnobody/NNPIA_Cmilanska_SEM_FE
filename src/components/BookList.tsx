import React, {useEffect, useState} from 'react';
import {Book} from "../data/data";
import BookCard from "./BookCard";
import {FormControl, InputGroup, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const BookList = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [searchText, setSearchText] = useState<string>('');
    const [booksPerPage] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
    const totalBooks = filteredBooks.length;
    const totalPages = Math.ceil(totalBooks / booksPerPage);
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const currentBooks = filteredBooks.slice(startIndex, endIndex);


    const goToPage = (page: number) => {
      setCurrentPage(page);
    };

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

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = event.target.value.toLowerCase();
        setSearchText(searchText);
    };

    return (
        <div className="py-4">
            <Row className="justify-content-center p-0 m-0">
                <InputGroup className="w-25">
                    <InputGroup.Text>
                        <FontAwesomeIcon icon={faSearch} />
                    </InputGroup.Text>
                    <FormControl
                        type="text"
                        placeholder="Search by book or author"
                        onChange={handleSearch}
                    />
                </InputGroup>
            </Row>
            <br/>
            <div className="d-flex justify-content-start">
                <div className="card-container">
                    {currentBooks.map((b, i) => (
                        <BookCard book={b} key={i} />
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