import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import Rating from './Rating';

export default function ProductCard(props) {
    let product = props.product;
    return (
        <Col className='my-2'>
            <Card style={{ width: '20rem' }}>
                <Card.Img variant="top" height="180px" width="100px" src={product.image} />
                <Card.Body>
                    <Card.Title style={{ color: "#4267B2" }}>{product.name}</Card.Title>
                    <Card.Text style={{ marginBottom: "0" }}>
                        {product.price} RS
                    </Card.Text>
                    <div className='text-center'><Button variant="danger" onClick={() => console.log(product.id)} >Go somewhere</Button></div>
                    <Card.Text className='text-center'>
                        {/* {product.rating} */}
                        <Rating rating={product.rating}/>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}
