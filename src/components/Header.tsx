import React from 'react';
import {Container, Navbar, Nav} from 'react-bootstrap';
import "../assets/styles/styles.css"
import {useAuth} from "../context/AuthContext";

const Header = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <Navbar collapseOnSelect bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/" className="mx-auto">BookCorner</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {isAuthenticated ? (
                            <>
                                <Nav.Link href={'account'}>Account</Nav.Link>
                                <Nav.Link onClick={logout}>Logout</Nav.Link>
                            </>
                        ) : (
                            <Nav.Link href="/login">Login</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;