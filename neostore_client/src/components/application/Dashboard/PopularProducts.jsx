import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { getallproducts } from '../../../api';
export default function PopularProducts() {
    const navigate = useNavigate();
    const [pproducts, setPproducts] = useState([{
        _id: "61e5535618a8517c9b49664d",
        product_name: "smastad-desk-white-pale-pink-with-2-drawers",
        product_image: "1.webp",
        product_description: "smastad-desk-white-pale-pink-with-2-drawers",
        product_subimages: ["smastad-desk-white-pale-pink-with-2-drawers/2.webp", "smastad-desk-white-pale-pink-with-2-drawers/3.webp"],
        product_cost: 13990,
        product_rating: 0,
        product_rating_count: 0,
        color_id: {
            _id: "61e54b6e18a8517c9b496629",
            color_name: "white",
            color_code: "#FFFFFF",
            createdAt: "2022-01-17T10:56:46.359Z",
            updatedAt: "2022-01-17T10:56:46.359Z",
            __v: 0
        },
        category_id: {
            _id: "61e49c658bc66920f9a4040c",
            category_name: "Table_Desk",
            category_description: "Table & Desk",
            category_label: "Table & Desk",
            category_value: "table_desk",
            category_image: "table_desk.webp",
            createdAt: "2022-01-16T22:29:57.435Z",
            updatedAt: "2022-01-16T22:29:57.435Z",
            __v: 0
        },
        createdAt: "2022-01-17T11:30:30.756Z",
        updatedAt: "2022-01-17T11:30:30.756Z",
        __v: 0
    },]);
    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await getallproducts();
                setPproducts(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);
    const handleProductClick = (id) => {
        console.log(id);
        navigate(`/productdetail/${id}`);
    }
    return (
        <div>
            <Container className='text-center'>
                <h2>Popular Products</h2>
                <Row>
                    {pproducts.map(ele =>
                        <Col className='my-2' key={ele._id}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" height="286px" src={`./Neostore_Images/${ele.category_id.category_name}/${ele.product_name}/${ele.product_image}`} alt={ele.product_name} />
                                <Card.Body>
                                    <Card.Title style={{ height: "4rem", color: "#4267B2" }}>{ele.product_name}</Card.Title>
                                    <Card.Text>{ele.product_cost}</Card.Text>
                                    <Button variant="danger" onClick={() => handleProductClick(ele._id)}>More Details</Button>
                                    <Card.Text>{ele.product_rating}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    )}
                </Row>
            </Container>
        </div>
    )
}
