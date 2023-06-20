import {Button, Form} from "react-bootstrap";
import React, {ChangeEvent, useState} from "react";
import {ReviewInput} from "../../data/data";


interface AddReviewFormProps {
    onSubmit: (review: ReviewInput) => void;
}

const AddReviewForm = ({onSubmit} : AddReviewFormProps) => {
    const [ratingValue, setRatingValue] = useState<number>(0);
    const [reviewText, setReviewText] = useState<string>("");

    const handleRatingChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = parseInt(event.target.value);
        setRatingValue(selectedValue);
    };

    const handleReviewTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const text = event.target.value;
        setReviewText(text);
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit({
          creationDate: new Date(Date.now()),
          text: reviewText,
          ratingValue: ratingValue
      });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Select rating:</Form.Label>
                <Form.Select aria-label="Value" value={ratingValue} onChange={handleRatingChange}>
                    <option key={0} value={0}>...</option>
                    <option key={1} value={1}>★☆☆☆☆</option>
                    <option key={2} value={2}>★★☆☆☆</option>
                    <option key={3} value={3}>★★★☆☆</option>
                    <option key={4} value={4}>★★★★☆</option>
                    <option key={5} value={5}>★★★★★</option>
                </Form.Select>
            </Form.Group>
            <Form.Group>
                <Form.Label>Review Text:</Form.Label>
                <Form.Control
                    as="textarea"
                    value={reviewText}
                    onChange={handleReviewTextChange}
                    required
                />
            </Form.Group>
            <Button variant="success" type="submit">
                Add review
            </Button>
        </Form>
    );
};

export default AddReviewForm;