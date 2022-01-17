import React from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
// import Order from './Order'
// import Checkout from './Checkout'
// import Profile from './Profile'
// import AddNewAddress from './AddNewAddress'

export default function MyAccount() {
    const navigate = useNavigate()
    return (
        <div className="p-4">
            <Container>
                <h3>My Account</h3><hr />
                <Row className='mx-2'>
                    <Col className='p-4' xs={12} md={4}>
                        <div className='p-2 text-center'>
                            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="profile_picture" width={"90%"} style={{ borderRadius: "50%" }} /><br /><br />
                            <h4>User Name</h4>
                        </div>
                        <div className="p-2">
                            <Button variant='light' className='w-100 m-1' onClick={() => navigate("orders")}>Orders</Button>
                            <Button variant='light' className='w-100 m-1' onClick={() => navigate("")}>Profile</Button>
                            <Button variant='light' className='w-100 m-1' onClick={() => navigate("addresses")}>Addresses</Button>
                            <Button variant='light' className='w-100 m-1' onClick={() => navigate("changepassword")}>Change Password</Button>
                        </div>
                    </Col>
                    <Col className='p-4 my-4 ' xs={12} md={8}>
                        <Outlet />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
