import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from "../../../actions/auth";
import { Container, Row, Col, InputGroup, Card, Form, Button } from 'react-bootstrap';


export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const regForemail = RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.com$');
    const regForpassword = RegExp('^[a-zA-Z0-9@*!&%$]{8,15}$');
    const user = JSON.parse(localStorage.getItem("profile"));

    useEffect(() => {
        if (user) {
            navigate('/');
        }// eslint-disable-next-line
    }, [user]);
    const [showpass, setShowpass] = useState(false);
    const [data, setData] = useState({ email: "", password: "" });
    const [verror, setVerror] = useState({ email: "", password: "" });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "email":
                setVerror({ ...verror, [name]: regForemail.test(value) ? "" : 'Enter a Valid Email' })
                break;
            case "password":
                setVerror({ ...verror, [name]: regForpassword.test(value) ? "" : 'Enter a Valid Password (must include 8 character)' })
                break;
            default: break;
        }
        setData({ ...data, [name]: value });
    }
    const handleValidate = (verror) => {
        let validate = (verror.email === "" && verror.password === "") ? true : false;
        return validate;

    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (handleValidate(verror)) {
            if (data.email !== "" && data.password !== "") {
                console.log(data);
                dispatch(login(data));
                alert("User Loggedin");
            } else { alert("Please Fill All Fields"); }
        } else { alert("Please Enter Valid Email and Password"); }
    }
    return (
        <div style={{ marginTop: '5%', marginBottom: "10%" }}>
            <Container >
                <Row className='my-4'>
                    <Col className='' style={{ margin: "auto" }}>
                        <button className="fb sbtn"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                        </svg>&nbsp;Login with Facebook</button>
                        <button className="google sbtn"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                        </svg>&nbsp;Login with Google</button>
                        <button className="twitter sbtn"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                        </svg>&nbsp;Login with Twitter</button>
                    </Col>
                    <Col className='py-4' style={{ borderLeft: "2px solid black" }}>
                        <Card bg='light'>
                            <Card.Body>
                                <Form method='post' onSubmit={handleSubmit}>
                                    <h3>Login to NeoSTORE</h3><br />
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
                                                {verror.email}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group className="mb-3" md="4">
                                        <InputGroup hasValidation>
                                            <Form.Control
                                                type={showpass ? "text" : "password"}
                                                placeholder="Enter Password"
                                                name="password"
                                                value={data.password}
                                                onChange={handleInputChange}
                                                isInvalid={!!verror.password}
                                            />
                                            {showpass ?
                                                <InputGroup.Text onClick={() => setShowpass(false)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                                </svg></InputGroup.Text>
                                                :
                                                <InputGroup.Text onClick={() => setShowpass(true)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                                    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                                                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                                                </svg></InputGroup.Text>
                                            }
                                            <Form.Control.Feedback type="invalid">
                                                {verror.password}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group><br />
                                    <Button variant="secondary" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className='links'>
                    <Col className='text-end' style={{ borderRight: "2px solid black" }}><a href="/register">Register Now</a></Col>
                    <Col><a href="/forgetpassword">Forgot Password ?</a></Col>
                </Row>
            </Container>
        </div>
    )
}
