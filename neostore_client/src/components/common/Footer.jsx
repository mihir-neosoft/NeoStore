import React from 'react'
import { Container, Navbar, Nav, Row, Col, Form, Button } from 'react-bootstrap'

export default function Footer() {
    return (
        <div className='text-center'>
            <Navbar bg="dark" variant="dark">
                <Container fluid style={{ color: "white", display: "block" }}>
                    <Row>
                        <Col>
                            <h6>About Company</h6>
                            <p>
                                NeoSOFT Technologies is here at your quick and easy service for shopping.<br />
                                Contact Information<br />
                                Email: contact@neosofttech.com<br />
                                Phone: +91 9876543210<br />
                                Mumbai,India
                            </p>
                        </Col>
                        <Col>
                            <h6>Information</h6>
                            <p>
                                <Nav.Link style={{ color: "white", padding: 0 }} href="/termsandcondition">Terms and Conditions</Nav.Link>
                                {/* Terms and Conditions<br /> */}
                                Gurantee and Return Policy<br />
                                Contact Us<br />
                                Privacy Policy<br />
                                {/* Locate Us */}
                                <Nav.Link style={{ color: "white", padding: 0 }} href="/locateus">Locate Us</Nav.Link>
                            </p>
                        </Col>
                        <Col>
                            <h6>Newsletter</h6>
                            <p>Signup to get exclusive offer from our favourite brands and to be well up in the news</p>
                            <Form className='px-4'>
                                <Form.Control type="email" placeholder="Enter email" />
                                <Button className='my-2' variant="secondary" type="submit">Subscribe</Button>
                            </Form>
                        </Col>
                        <p>Copyright 2017 NeoSOFT Technologies All rights reserved | Design By Mihir Adelkar</p>
                    </Row>
                </Container>
            </Navbar>
        </div>
    )
}
