import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { getuser } from '../../api'
export default function AddressCheckout() {
    const navigate = useNavigate()
    const [address, setAddress] = useState([])
    const User = JSON.parse(localStorage.getItem("profile"));
    let Order = JSON.parse(localStorage.getItem("order"));
    useEffect(() => {
        async function fetchData() {
            if (User) {
                try {
                    const { data } = await getuser(User.result._id);
                    setAddress(data.addresses);
                } catch (error) {
                    console.log(error);
                }
            } else { console.log("login first !"); }
        }
        fetchData(); // eslint-disable-next-line
    }, []);

    const handleSelectAddress = (selectedaddress) => {
        Order = {
            ...Order, address: {
                address1: selectedaddress.address1,
                address2: selectedaddress.address2,
                city: selectedaddress.city,
                pincode: selectedaddress.pincode,
                state: selectedaddress.state,
                country: selectedaddress.country,
            }
        }
        localStorage.setItem('order', JSON.stringify(Order));
        navigate("/checkout");
    }
    return (
        <Container>
            <Card className='my-4'>
                <Card.Body>
                    <div className='d-flex justify-content-between align-items-end'>
                        <h2>Addresses</h2>
                        <h6>Please select one address for delivery</h6>
                    </div><hr />
                    {address.map((ele, index) =>
                        <Card key={index} className="my-3">
                            <Card.Body>
                                <Row>
                                    <Col sm="9">
                                        <h6>Address: <span style={{ color: "#989898" }}>{ele.address1} {ele.address2} {ele.city} - {ele.pincode}, {ele.state}, {ele.country}.</span></h6>
                                        <h6>Contact Number: <span style={{ color: "#989898" }}>{ele.phone}</span></h6>
                                    </Col>
                                    <Col sm="3" className='text-end'>
                                        <Button variant='warning' onClick={() => handleSelectAddress(ele)}>Select this Address</Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    )}
                    <hr />
                    <div className='text-end'>
                        <Button variant="outline-dark" onClick={() => navigate("/myaccount/addresses")} >Add New Address</Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    )
}