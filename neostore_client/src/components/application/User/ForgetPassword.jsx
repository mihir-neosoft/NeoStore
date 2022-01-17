import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container, Card, Form, Button, InputGroup } from 'react-bootstrap';
import { forgotPassword } from '../../../actions/auth';

export default function ForgetPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const regForemail = RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.com$');
    const user = JSON.parse(localStorage.getItem("profile"));

    useEffect(() => {
        if (user) {
            navigate('/');
        }// eslint-disable-next-line
    }, [user]);

    const [data, setData] = useState({ email: "" });
    const [verror, setVerror] = useState({ email: "" });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "email":
                setVerror({ ...verror, [name]: regForemail.test(value) ? "" : 'Enter a Valid Email' })
                break;
            default: break;
        }
        setData({ ...data, [name]: value });
    }
    const handleValidate = (verror) => {
        let validate = (verror.email === "") ? true : false;
        return validate;
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (handleValidate(verror)) {
            if (data.email !== "") {
                console.log(data);
                dispatch(forgotPassword(data));
                // alert("User Loggedin");
            } else { alert("Please Fill All Fields"); }
        } else { alert("Please Enter Valid Email"); }
    }
    return (
        <div style={{ marginTop: '10%', marginBottom: "10%" }}>
            <Container>
                <Card bg='light' style={{ maxWidth: "70%", marginLeft: "auto", marginRight: "auto" }}>
                    <Card.Body>
                        <Form className='text-center' method='post' onSubmit={handleSubmit}>
                            <h3>Recovery Password</h3><br />
                            <Form.Group className="mb-3" md="4">
                                <InputGroup hasValidation>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter Email"
                                        name="email"
                                        value={data.email}
                                        onChange={handleInputChange}
                                        isInvalid={!!verror.email}
                                    />
                                    <InputGroup.Text><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                                    </svg></InputGroup.Text>
                                    <Form.Control.Feedback type="invalid">
                                        {/* {verror.email} */}
                                    </Form.Control.Feedback>
                                </InputGroup>
                                <Form.Text className="text-muted">OTP will be sent to Email.</Form.Text>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}
