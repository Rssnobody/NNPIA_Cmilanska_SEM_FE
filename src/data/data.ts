export interface AppUser {
    userId: number;
    loginName: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    userBooks: UserBook[];
}


export interface Book {
    bookId: number;
    name: string;
    picture: string;
    description: string;
    authors: AuthorInBook[];
    // userBooks: UserBook[];
}

export interface BookInput {
    name: string;
    picture: string;
    author: AuthorInBook;
    description: string;
}

export interface UserBook {
    userId: number;
    bookId: number;
    // book: Book;
    state: State;
    review: Review;
}

export interface AuthorInBook {
    id: number;
    firstName: string;
    lastName: string;
}

export interface Author {
    id: number;
    firstName: string;
    lastName: string;
    books: Book[];
}

export interface Rating {
    id: number;
    name: string;
    value: number;
    //reviews: Review[];
}

export interface Review {
    id: number;
    creationDate: Date;
    text: string;
    rating: Rating;
    //userBooks: UserBook[];
}

export interface State {
    id: number;
    name: string;
    //userBooks: UserBook[];
}