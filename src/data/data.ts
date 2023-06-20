export interface AppUser {
    userId: number;
    loginName: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
}

export interface Book {
    bookId: number;
    name: string;
    picture: string;
    description: string;
    authors: AuthorInBook[];
}

export interface BookDetails {
    bookId: number;
    name: string;
    picture: string;
    description: string;
    authors: AuthorInBook[];
    reviews: Review[];
}

export interface BookInput {
    name: string;
    picture: string;
    description: string;
    authors: AuthorInput[];
}

export interface UserBook {
    id: number;
    user: AppUser;
    book: Book;
    state: State;
    review: Review;
}

export interface AuthorInBook {
    authorId: number;
    firstName: string;
    lastName: string;
}

export interface AuthorInput {
    firstName: string;
    lastName: string;
}

export interface Rating {
    ratindId: number;
    name: string;
    value: number;
}

export interface Review {
    reviewId: number;
    creationDate: Date;
    text: string;
    rating: Rating;
}

export interface ReviewInput {
    creationDate: Date;
    text: string;
    ratingValue: number;
}

export interface State {
    stateId: number;
    name: string;
}