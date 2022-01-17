import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { register } from "../../../actions/auth";

export default function Registration() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialState = { first_name: "", last_name: "", phone: "", email: "", gender: "", password: "", cpassword: "", };
    const regForname = RegExp("^[a-zA-Z]+$");
    const regForphone = RegExp('^((\\+91-?)|0)?[0-9]{10}$');
    const regForemail = RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.com$");
    const regForpassword = RegExp("^[a-zA-Z0-9@*!&%$]{8,15}");
    const user = JSON.parse(localStorage.getItem("profile"));

    useEffect(() => {
        if (user) {
            navigate('/');
        }// eslint-disable-next-line
    }, [user]);

    const [showpass, setShowpass] = useState(false);
    const [data, setData] = useState(initialState);
    const [verror, setVerror] = useState(initialState);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "first_name":
                setVerror({ ...verror, [name]: regForname.test(value) ? "" : 'Enter a valid first name ' })
                break;
            case "last_name":
                setVerror({ ...verror, [name]: regForname.test(value) ? "" : 'Enter a valid last name ' })
                break;
            case "phone":
                setVerror({ ...verror, [name]: regForphone.test(value) ? "" : 'Enter a Valid Phone number' })
                break;
            case "email":
                setVerror({ ...verror, [name]: regForemail.test(value) ? "" : 'Enter a Valid Email' })
                break;
            case "password":
                setVerror({ ...verror, [name]: regForpassword.test(value) ? "" : 'Enter a Valid Password (must include 8 character)' })
                break;
            case "cpassword":
                setVerror({ ...verror, [name]: data.password === value ? "" : 'Password Not Matched)' })
                break;
            default: break;
        }
        setData({ ...data, [name]: value });
    }
    const handleValidate = (errors) => {
        let validate = (errors.first_name === "" && errors.last_name === "" && errors.phone === "" && errors.email === "" && errors.password === "" && errors.cpassword === "") ? true : false;
        return validate;
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (handleValidate(verror)) {
            if (data.first_name !== "" && data.last_name !== "" && data.phone !== "" && data.email !== "" && data.gender !== "" && data.password !== "" && data.cpassword !== "") {
                dispatch(register(data));
                console.log(data);
                alert("User Registered");
            } else { alert("Please Fill All Fields"); }
        } else { alert("Please Enter Valid Details"); }
    }
    return (
        <div style={{ marginTop: '5%', marginBottom: "5%" }}>
            <Container className='my-2'>
                <div className='text-center'>
                    <button className="fb btn mx-2"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                    </svg>&nbsp;Login with Facebook</button>
                    <button className="google btn mx-2"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                        <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                    </svg>&nbsp;Login with Google</button>
                    <button className="twitter btn mx-2"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                    </svg>&nbsp;Login with Twitter</button>
                    <hr />
                </div>
                <div>
                    <Card bg='light' style={{ maxWidth: "70%", marginLeft: "auto", marginRight: "auto" }}>
                        <Card.Body>
                            <Form method='post' onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" md="4">
                                    <InputGroup hasValidation>
                                        <Form.Control type="text" placeholder="First Name" name="first_name" value={data.first_name} onChange={handleInputChange} isInvalid={!!verror.first_name} />
                                        <InputGroup.Text><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fonts" viewBox="0 0 16 16">
                                            <path d="M12.258 3h-8.51l-.083 2.46h.479c.26-1.544.758-1.783 2.693-1.845l.424-.013v7.827c0 .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.431.013c1.934.062 2.434.301 2.693 1.846h.479L12.258 3z" />
                                        </svg></InputGroup.Text>
                                        <Form.Control.Feedback type="invalid">{verror.first_name}</Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group className="mb-3" md="4">
                                    <InputGroup hasValidation>
                                        <Form.Control type="text" placeholder="Last Name" name="last_name" value={data.last_name} onChange={handleInputChange} isInvalid={!!verror.last_name} />
                                        <InputGroup.Text><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fonts" viewBox="0 0 16 16">
                                            <path d="M12.258 3h-8.51l-.083 2.46h.479c.26-1.544.758-1.783 2.693-1.845l.424-.013v7.827c0 .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.431.013c1.934.062 2.434.301 2.693 1.846h.479L12.258 3z" />
                                        </svg></InputGroup.Text>
                                        <Form.Control.Feedback type="invalid">
                                            {verror.last_name}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group className="mb-3" md="4">
                                    <InputGroup hasValidation>
                                        <Form.Control type="email" placeholder="Enter Email" name="email" value={data.email} onChange={handleInputChange} isInvalid={!!verror.email} />
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
                                <Form.Group className="mb-3" md="4">
                                    <InputGroup hasValidation>
                                        <Form.Control type="tel" placeholder="Phone Number" name="phone" value={data.phone} onChange={handleInputChange} isInvalid={!!verror.phone} />
                                        <InputGroup.Text><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                        </svg></InputGroup.Text>
                                        <Form.Control.Feedback type="invalid">
                                            {verror.phone}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group className="mb-3" md="4">
                                    <InputGroup>
                                        <Form.Check inline type="radio" label="Male" name="gender" onChange={handleInputChange} value="Male" id="gender_male" />
                                        <Form.Check inline type="radio" label="Female" name="gender" onChange={handleInputChange} value="Female" id="gender_female" />
                                    </InputGroup >
                                    <Form.Control.Feedback type="invalid">
                                        {data.gender === "" ? "Please select gender" : ""}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button variant="secondary" type="submit">Submit</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className='links text-center m-2 p-4'>
                        <a href="/login"> Already Registered ? Login </a>
                    </div>
                </div>
            </Container>
        </div>
    )
}
