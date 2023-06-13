import React from 'react';
import {Container, Navbar, Nav} from 'react-bootstrap';
import "../assets/styles/styles.css"

const Header = () => {
    return (
        <Navbar collapseOnSelect bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/" className="mx-auto">BookCorner</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/login">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;