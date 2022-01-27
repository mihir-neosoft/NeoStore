import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { getallcategory } from '../../../api/index';

export default function CategoryCarousel() {
    const [category, setCategory] = useState();
    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await getallcategory();
                setCategory(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);
    // console.log(category);
    return (
        <div>
            {category &&
                <Carousel fade>
                    {category.map(ele =>
                        <Carousel.Item key={ele._id}>
                            <img
                                className="d-block w-100"
                                height="500px"
                                src={`./Neostore_Images/${ele.category_value}/${ele.category_image}`}
                                alt={ele.category_value}
                            />
                            <Carousel.Caption>
                                <h3>{ele.category_label}</h3>
                                <p>{ele.category_description}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    )}
                </Carousel>
            }
        </div>
    )
}
