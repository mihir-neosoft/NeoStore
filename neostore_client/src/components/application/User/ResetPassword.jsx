import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from "../../../actions/auth";
import { Container, Card, Form, Button, InputGroup } from 'react-bootstrap';


export default function ResetPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialState = { password: "", cpassword: "", token: "" };
    const regFortoken = RegExp("^[0-9]{6}$");
    const regForpassword = RegExp("^[a-zA-Z0-9@*!&%$]{8,15}");
    const user = JSON.parse(localStorage.getItem("profile"));

    useEffect(() => {
        if (user) {
            // navigate('/');
        }// eslint-disable-next-line
    }, [user]);

    const [showpass, setShowpass] = useState(false);
    const [data, setData] = useState(initialState);
    const [verror, setVerror] = useState(initialState);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "token":
                setVerror({ ...verror, [name]: regFortoken.test(value) ? "" : 'Enter a Valid token' })
                break;
            case "password":
                setVerror({ ...verror, [name]: regForpassword.test(value) ? "" : 'Enter a Valid Password (must include 8 character)' })
                break;
            case "cpassword":
                setVerror({ ...verror, [name]: data.password === value ? "" : 'Password Not Matched' })
                break;
            default: break;
        }
        setData({ ...data, [name]: value });
    }
    const handleValidate = (errors) => {
        let validate = (errors.token === "" && errors.password === "" && errors.cpassword === "") ? true : false;
        return validate;
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (handleValidate(verror)) {
            if (data.token !== "" && data.password !== "" && data.cpassword !== "") {
                dispatch(resetPassword(data));
                console.log(data);
                alert("Password Changed");
            } else { alert("Please Fill All Fields"); }
        } else { alert("Please Enter Valid Details"); }
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
                                    <Form.Control type="text" placeholder="Verification Code" name="token" value={data.token} onChange={handleInputChange} isInvalid={!!verror.token} />
                                    <InputGroup.Text><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-asterisk" viewBox="0 0 16 16">
                                        <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z" />
                                    </svg></InputGroup.Text>
                                    <Form.Control.Feedback type="invalid">{verror.token}</Form.Control.Feedback>
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
                            </Form.Group>
                            <Form.Group className="mb-3" md="4">
                                <InputGroup hasValidation>
                                    <Form.Control
                                        type={showpass ? "text" : "password"}
                                        placeholder="Confirm Password"
                                        name="cpassword"
                                        value={data.cpassword}
                                        onChange={handleInputChange}
                                        isInvalid={!!verror.cpassword}
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
                                        {verror.cpassword}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Button variant="secondary" type="submit">Submit</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}
