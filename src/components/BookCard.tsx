import React from 'react';
import {Button, Card} from 'react-bootstrap';
import {Book } from "../data/data";
import {useNavigate} from "react-router-dom";

interface BookCardProps {
    book: Book;
}

const BookCard = ({book}: BookCardProps) => {

    const navigate = useNavigate();
    const doStuff = (book: Book) => {
        const bookString : string = JSON.stringify(book);
        localStorage.setItem('book', bookString);
        navigate(`/bookDetail/${book.bookId}`);
    }

    return (
        <Card
            style={{width: '18rem', height: 'auto'}}
            className={'bg-light text-black text-center p-0 overflow-hidden shadow'}
            key={book.bookId}
        >
            <div style={{
                background: 'white', height: '15rem', overflow: 'hidden', display: 'flex',
                justifyContent: 'center', alignItems: 'center', marginBottom: 'inherit'
            }}>
                <div style={{width: '9rem'}}>
                    <Card.Img variant="top" src={book.picture} className="img-fluid"/>
                </div>
            </div>
            <Card.Body>
                <Card.Title >
                    {book.name}
                </Card.Title>
                <Card.Text>
                    {book.authors.map((author) => {
                        return <>{author.firstName} {author.lastName}</>
                })}
                </Card.Text>
                <Button
                    onClick={() => doStuff(book)}
                    className={'bg-light-primary m-auto border-0'}
                >
                    Details
                </Button>
            </Card.Body>
        </Card>
    );
};

export default BookCard;