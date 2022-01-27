import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Card, Button } from 'react-bootstrap';
// import Rating from './Rating';

export default function ProductCard(props) {
    const navigate = useNavigate();
    let product = props.product;
    const handleProductClick = (id) => {
        console.log(id);
        navigate(`/productdetail/${id}`);
    }
    return (
        <Col className='my-2'>
            <Card style={{ width: '20rem' }}>
                <Card.Img variant="top" height="300px" src={`./Neostore_Images/${product.category_id.category_name}/${product.product_name}/${product.product_image}`} alt={product.product_name} />
                <Card.Body>
                    <Card.Title style={{ height: "4rem", color: "#4267B2" }}>{product.product_name}</Card.Title>
                    <Card.Text style={{ marginBottom: "0" }}>
                        Rs {product.product_cost}
                    </Card.Text>
                    <div className='text-center'><Button variant="danger" onClick={() => handleProductClick(product._id)} >More Details</Button></div>
                    <Card.Text className='text-center'>
                        {/* {product.rating} */}
                        {/* <Rating rating={product.rating}/> */}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}
