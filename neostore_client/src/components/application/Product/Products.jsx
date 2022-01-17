import React, { useState, useEffect } from 'react'
import { Accordion, Card, Container, Col, Row, Form, Button } from 'react-bootstrap'
import ProductCard from '../../Elements/ProductCard'
import js_data from '../../../data.json';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [colors, setColors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [colordata, setColordata] = useState([]);
    const [categorydata, setCategorydata] = useState([]);
    useEffect(() => {
        setProducts(js_data.products);
        setColors(js_data.colors);
        setCategories(js_data.categories);
    }, []);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "category":
                let category = categorydata;
                if (category.includes(value)) {
                    category.pop(value);
                }
                else {
                    category.push(value);
                }
                setCategorydata(category);
                // setVerror({ ...verror, [name]: regForname.test(value) ? "" : 'Enter a valid first name ' })
                break;
            case "color":
                let color = colordata;
                if (color.includes(value)) {
                    color.pop(value);
                }
                else {
                    color.push(value);
                }
                setColordata(color);
                break;
            default: break;
        }
        // console.log(colordata, categorydata);

    }
    const handleCategorySubmit = (event) => {
        event.preventDefault();
        console.log();
    }
    const handleColorSubmit = (event) => {
        event.preventDefault();
        console.log();
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(colordata, categorydata);
    }
    const displayAllProducts = () => {
        setCategorydata([]);
        setColordata([]);
    }
    return (
        <div>
            <h2>Products</h2>
            <Row>
                <Col sm={3}>
                    <Container>
                        <Card>
                            <Card.Body>
                                <Card onClick={displayAllProducts}>
                                    <Card.Body>All Products</Card.Body>
                                </Card>
                                <Accordion className='my-2'>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Category</Accordion.Header>
                                        <Accordion.Body >
                                            <Form onSubmit={handleCategorySubmit}>
                                                {categories.map(category =>
                                                    <Form.Group key={category.id} className="mb-3">
                                                        <Form.Check type="checkbox" label={category.category_label} value={category.category_value} name='category' onChange={handleInputChange} />
                                                    </Form.Group>
                                                )}
                                                {/* <Button type='submit'>Apply</Button> */}
                                            </Form>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                                <Accordion className='my-2'>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Color</Accordion.Header>
                                        <Accordion.Body >
                                            <Form onSubmit={handleColorSubmit}>
                                                {colors.map(color =>
                                                    <Form.Group key={color.id} className="mb-3">
                                                        <Form.Check type="checkbox" label={color.color_name} value={color.color_name} name='color' onChange={handleInputChange} />
                                                    </Form.Group>
                                                )}

                                                {/* <Button type='submit'>Apply</Button> */}
                                            </Form>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                                <div className='text-end'>
                                    <Button onClick={handleSubmit}>Apply</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Container>
                </Col>
                <Col sm={9}>
                    <Container>
                        <Row>
                            {products.map(product => <ProductCard key={product.id} product={product} />)}
                        </Row>
                    </Container>
                </Col>
            </Row>
        </div>
    )
}
