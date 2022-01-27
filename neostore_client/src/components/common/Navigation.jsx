import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, Form, FormControl, Button, DropdownButton, Dropdown, Badge } from 'react-bootstrap';
export default function Navigation() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("profile"));

    return (
        <>
            <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand onClick={() => navigate("/")}><b>Neo<span style={{ color: "red" }}>STORE</span></b></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link className='' onClick={() => navigate("/")}>Home</Nav.Link>
                            <Nav.Link className='' onClick={() => navigate("/products")}>Products</Nav.Link>
                            <Nav.Link className='' onClick={() => navigate("/orders")}>Order</Nav.Link>
                        </Nav>
                        <Nav>
                            <Form className="d-flex">
                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                            </Form>
                            <Button variant="light" onClick={()=>navigate("/cart")}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                </svg>Cart <Badge bg="secondary">0</Badge>
                            </Button>
                            <DropdownButton className='mx-2' variant='light' align="end" title={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-square" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z" />
                            </svg>} id="dropdown-menu-align-end">
                                {user === null && (
                                    <>
                                        <Dropdown.Item onClick={() => navigate("/login")}>Login</Dropdown.Item>
                                        <Dropdown.Item onClick={() => navigate("/register")}>Register</Dropdown.Item>
                                    </>
                                )}
                                {user !== null && (
                                    <>
                                        <Dropdown.Item onClick={() => navigate("/myaccount")}>My Account</Dropdown.Item>
                                        <Dropdown.Item onClick={() => navigate("/logout")}>Logout</Dropdown.Item>
                                    </>
                                )}

                            </DropdownButton>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
