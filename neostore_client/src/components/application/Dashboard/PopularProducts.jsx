import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
export default function PopularProducts() {
    return (
        <div>
            <Container className='text-center'>
                <h2>Popular Products</h2>
                <Row>
                    {/* map */}
                    <Col className='my-2'>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" height="180px" width="100px" src="https://source.unsplash.com/random" />
                            <Card.Body>
                                <Card.Title style={{color:"lightblue"}}>Product Name</Card.Title>
                                <Card.Text>
                                    1000 RS
                                </Card.Text>
                                <Button variant="danger">Go somewhere</Button>
                                <Card.Text>
                                    * * * * *
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className='my-2'>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" height="180px" width="100px" src="https://source.unsplash.com/random" />
                            <Card.Body>
                                <Card.Title>Product Name</Card.Title>
                                <Card.Text>
                                    1000 RS
                                </Card.Text>
                                <Button variant="danger">Go somewhere</Button>
                                <Card.Text>
                                    * * * * *
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className='my-2'>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" height="180px" width="100px" src="https://source.unsplash.com/random" />
                            <Card.Body>
                                <Card.Title>Product Name</Card.Title>
                                <Card.Text>
                                    1000 RS
                                </Card.Text>
                                <Button variant="danger">Go somewhere</Button>
                                <Card.Text>
                                    * * * * *
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className='my-2'>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" height="180px" width="100px" src="https://source.unsplash.com/random" />
                            <Card.Body>
                                <Card.Title>Product Name</Card.Title>
                                <Card.Text>
                                    1000 RS
                                </Card.Text>
                                <Button variant="danger">Go somewhere</Button>
                                <Card.Text>
                                    * * * * *
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className='my-2'>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" height="180px" width="100px" src="https://source.unsplash.com/random" />
                            <Card.Body>
                                <Card.Title>Product Name</Card.Title>
                                <Card.Text>
                                    1000 RS
                                </Card.Text>
                                <Button variant="danger">Go somewhere</Button>
                                <Card.Text>
                                    * * * * *
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
