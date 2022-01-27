import React from 'react'
import { Carousel } from 'react-bootstrap'
export default function MyCarousel() {
    return (
        <>
            <Carousel fade>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        height="400px"
                        src={"https://source.unsplash.com/random"}
                        alt={"category_name"}
                    />
                    <Carousel.Caption>
                        <h3>Category Name 1</h3>
                        <p>Category Description ...</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        height="400px"
                        src="https://source.unsplash.com/random"
                        alt="category_name"
                    />
                    <Carousel.Caption>
                        <h3>Category Name 2</h3>
                        <p>Category Description ...</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    )
}
