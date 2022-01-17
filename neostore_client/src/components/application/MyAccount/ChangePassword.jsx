import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { changePassword } from "../../../actions/auth";
import { Card, Form, Button, InputGroup } from 'react-bootstrap';

export default function ChangePassword() {
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    const initialState = { password: "", cpassword: "", opassword: "" };
    const regForpassword = RegExp("^[a-zA-Z0-9@*!&%$]{8,15}");
    const user = JSON.parse(localStorage.getItem("profile"));

    useEffect(() => {
        if (user) {
        }// eslint-disable-next-line
    }, [user]);

    const [showpass, setShowpass] = useState(false);
    const [showcpass, setShowcpass] = useState(false);
    const [showopass, setShowopass] = useState(false);
    const [data, setData] = useState(initialState);
    const [verror, setVerror] = useState(initialState);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "password":
                setVerror({ ...verror, [name]: regForpassword.test(value) ? "" : 'Enter a Valid Password (must include 8 character)' })
                break;
            case "cpassword":
                setVerror({ ...verror, [name]: data.password === value ? "" : 'Password Not Matched' })
                break;
            case "opassword":
                setVerror({ ...verror, [name]: regForpassword.test(value) ? "" : 'Enter a Valid Password (must include 8 character)' })
                break;
            default: break;
        }
        setData({ ...data, [name]: value });
    }
    const handleValidate = (errors) => {
        let validate = (errors.password === "" && errors.cpassword === "" && errors.opassword === "") ? true : false;
        return validate;
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (handleValidate(verror)) {
            if (data.password !== "" && data.cpassword !== "" && data.opassword !== "") {
                // dispatch(changePassword(data));
                console.log(data);
                alert("Password Changed");
                setData(initialState);
            } else { alert("Please Fill All Fields"); }
        } else { alert("Please Enter Valid Details"); }
    }
    return (
        <div>
            <Card>
                <Card.Body>
                    <Card.Title ><h3>Change Password</h3></Card.Title> <hr />
                    <Form method='post' onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" md="4">
                            <InputGroup hasValidation>
                                <Form.Control
                                    type={showopass ? "text" : "password"}
                                    placeholder="Enter Old Password"
                                    name="opassword"
                                    value={data.opassword}
                                    onChange={handleInputChange}
                                    isInvalid={!!verror.opassword}
                                />
                                {showopass ?
                                    <InputGroup.Text onClick={() => setShowopass(false)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                    </svg></InputGroup.Text>
                                    :
                                    <InputGroup.Text onClick={() => setShowopass(true)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                        <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                                        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                                    </svg></InputGroup.Text>
                                }
                                <Form.Control.Feedback type="invalid">
                                    {verror.opassword}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-3" md="4">
                            <InputGroup hasValidation>
                                <Form.Control
                                    type={showpass ? "text" : "password"}
                                    placeholder="Enter New Password"
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
                                    type={showcpass ? "text" : "password"}
                                    placeholder="Confirm New Password"
                                    name="cpassword"
                                    value={data.cpassword}
                                    onChange={handleInputChange}
                                    isInvalid={!!verror.cpassword}
                                />
                                {showcpass ?
                                    <InputGroup.Text onClick={() => setShowcpass(false)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                    </svg></InputGroup.Text>
                                    :
                                    <InputGroup.Text onClick={() => setShowcpass(true)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
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
        </div>
    )
}
