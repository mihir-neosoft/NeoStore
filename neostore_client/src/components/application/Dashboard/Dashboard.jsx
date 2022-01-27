import React from 'react';
import {  Container } from 'react-bootstrap';
import CategoryCarousel from './CategoryCarousel';
import PopularProducts from './PopularProducts'

export default function Dashboard() {
    return (
        <div>
            <Container>
                <CategoryCarousel />
                <PopularProducts />
            </Container>
        </div>
    )
}
