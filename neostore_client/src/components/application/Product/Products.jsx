import React, { useState, useEffect } from 'react'
import { Accordion, Card, Container, Col, Row, Form, Button } from 'react-bootstrap'
import ProductCard from '../../Elements/ProductCard'
import { getallcategory, getallcolor, getallproducts, filterproduct } from '../../../api/index';
// import js_data from '../../../data.json';

export default function Products() {
    const [products, setProducts] = useState([{
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
    const [colors, setColors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [colordata, setColordata] = useState([]);
    const [categorydata, setCategorydata] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await getallcategory();
                setCategories(data);
            } catch (error) {
                console.log(error);
            }
            try {
                const { data } = await getallcolor();
                setColors(data);
            } catch (error) {
                console.log(error);
            }
            try {
                const { data } = await getallproducts();
                setProducts(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);
    // console.log(products, colors, categories);
    const handleInputChange = (event) => {
        const { name, id } = event.target;
        switch (name) {
            case "category":
                let category = categorydata;
                if (category.includes(id)) {
                    let index = category.indexOf(id);
                    category.splice(index, 1);
                }
                else {
                    category.push(id);
                }
                setCategorydata(category);
                // setVerror({ ...verror, [name]: regForname.test(id) ? "" : 'Enter a valid first name ' })
                break;
            case "color":
                let color = colordata;
                if (color.includes(id)) {
                    let index = color.indexOf(id);
                    color.splice(index, 1);
                }
                else {
                    color.push(id);
                }
                setColordata(color);
                break;
            default: break;
        }
    }
    const handleApplyFilter = (event) => {
        event.preventDefault();
        console.log(colordata, categorydata);
        filterproduct({ category_id: categorydata, color_id: colordata }).then(res => setProducts(res.data));
    }
    const displayAllProducts = () => {
        filterproduct({ category_id: [], color_id: [] }).then(res => setProducts(res.data));
        document.getElementsByName('category').checked = false;
        document.getElementsByName('color').checked = false;
        // setCategorydata([]);
        // setColordata([]);
    }
    return (
        <div>
            <h2>Products</h2>
            <Row>
                <Col sm={3}>
                    <Container>
                        <Card>
                            <Card.Body>
                                <Form >
                                    {/* <Button variant='light' size="lg" className='w-100' type='reset' onClick={displayAllProducts}>All Products</Button> */}
                                    <Card >
                                        <Button variant='light' size="lg" className='w-100' type='reset' onClick={displayAllProducts}>All Products</Button>
                                    </Card>
                                    <Accordion className='my-2'>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>Category</Accordion.Header>
                                            <Accordion.Body >
                                                {categories.map(category =>
                                                    <Form.Group key={category._id} className="mb-3">
                                                        <Form.Check type="checkbox" label={category.category_label} value={category.category_value} name='category' id={category._id} onChange={handleInputChange} />
                                                    </Form.Group>
                                                )}
                                                {/* <Button type='submit'>Apply</Button> */}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                    <Accordion className='my-2'>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>Color</Accordion.Header>
                                            <Accordion.Body >
                                                {colors.map(color =>
                                                    <Form.Group key={color._id} className="mb-3">
                                                        <Form.Check type="checkbox" label={color.color_name} value={color.color_name} name='color' id={color._id} onChange={handleInputChange} />
                                                    </Form.Group>
                                                )}
                                                {/* <Button type='submit'>Apply</Button> */}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </Form>
                                <div className='text-end'>
                                    <Button variant='warning' size="md" className='w-100' onClick={handleApplyFilter}>Apply</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Container>
                </Col>
                <Col sm={9}>
                    <Container>
                        <Row>
                            {products.map(product => <ProductCard key={product._id} product={product} />)}
                        </Row>
                    </Container>
                </Col>
            </Row>
        </div>
    )
}
