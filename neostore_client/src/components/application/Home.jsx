import React from 'react'
import { Container, Row } from 'react-bootstrap';
import js_data from '../../data.json'
import ProductCard from '../Elements/ProductCard';

export default function Home() {
    const pro = js_data.products
    return (
        <div>
            <Container>
                <Row>
                    {pro.map(ele => <ProductCard key={ele.id} pro={ele} />)}
                </Row>
            </Container>
        </div>
    )
}