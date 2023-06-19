import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import {AuthorInput, BookInput} from "../../data/data";

interface CreateBookFormProps {
    onSubmit: (book: BookInput) => void;
}

const CreateBookForm: React.FC<CreateBookFormProps> = ({ onSubmit }) => {
    const [book, setBook] = useState<BookInput>({
        name: "",
        picture: "",
        description: "",
        authors: [],
    });

    const [author, setAuthor] = useState<AuthorInput>({
        firstName: "",
        lastName: "",
    });

    const [authors, setAuthors] = useState<AuthorInput[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBook((prevBook) => ({ ...prevBook, [name]: value }));
    };

    const handleAuthorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const [field, index] = name.split("-");
        const updatedAuthors = [...authors];
        updatedAuthors[Number(index)] = {
            ...updatedAuthors[Number(index)],
            [field]: value,
        };
        setAuthors(updatedAuthors);
    };

    const handleAddAuthor = () => {
        setAuthors((prevAuthors) => [...prevAuthors, author]);
        setAuthor({ firstName: "", lastName: "" });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ ...book, authors });
        setBook({
            name: "",
            picture: "",
            description: "",
            authors: [],
        });
        setAuthors([]);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="bookName">
                <Form.Label>Book Name</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={book.name}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="bookPicture">
                <Form.Label>Picture URL</Form.Label>
                <Form.Control
                    type="text"
                    name="picture"
                    value={book.picture}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="bookDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    name="description"
                    value={book.description}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>

            {authors.map((author, index) => (
                <div key={index}>
                    <Form.Group controlId={`authorFirstName-${index}`}>
                        <Form.Label>Author First Name</Form.Label>
                        <Form.Control
                            type="text"
                            name={`firstName-${index}`}
                            value={author.firstName}
                            onChange={handleAuthorInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId={`authorLastName-${index}`}>
                        <Form.Label>Author Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            name={`lastName-${index}`}
                            value={author.lastName}
                            onChange={handleAuthorInputChange}
                            required
                        />
                    </Form.Group>
                </div>
            ))}

            <Button variant="secondary" type="button" onClick={handleAddAuthor}>
                Add Author
            </Button>

            <Button variant="success" type="submit">
                Create Book
            </Button>
        </Form>
    );
};

export default CreateBookForm;