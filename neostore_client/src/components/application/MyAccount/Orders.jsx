import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
export default function Orders() {
    const initialState = [
        {
            _id: 9876543211,
            order_status: "TRANSIT",
            order_date: Date.now(),
            order_amount: 10900,
            order_products: [
                {
                    product_name: "TABLE",
                    product_image: "https://source.unsplash.com/random",
                }
            ]
        },
        {
            _id: 9876543210,
            order_status: "TRANSIT",
            order_date: Date.now(),
            order_amount: 60900,
            order_products: [
                {
                    product_name: "BED",
                    product_image: "https://source.unsplash.com/random",
                },
                {
                    product_name: "SOFA",
                    product_image: "https://source.unsplash.com/random",
                }
            ]
        }
    ]
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(initialState);
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            <Card>
                <Card.Body>
                    <Card.Title ><h3>Orders</h3></Card.Title><hr />
                    {data.map(order =>
                        <Card key={order._id}>
                            <Card.Body>
                                <h5><span style={{ color: "orange" }}>{order.order_status}</span> Order By:{order._id}</h5>
                                <p>Placed on: {order.order_date} , Order Amount: <span style={{ color: "green" }}>{order.order_amount}</span></p><hr />
                                {order.order_products.map((products, index) =>
                                    <img key={index} src={products.product_image} alt={products.product_name} height={"100px"} width={"100px"} className='mx-2' />
                                )}
                                <hr /><Button onClick={() => console.log(order._id)}>Download Invoice as PDF</Button>
                            </Card.Body>
                        </Card>
                    )}
                </Card.Body>
            </Card>
        </div>
    )
}
