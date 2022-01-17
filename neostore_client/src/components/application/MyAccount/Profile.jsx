import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { editProfile } from "../../../actions/auth";
import { Card, Button, Row, Col, Modal, Form, InputGroup } from 'react-bootstrap';

export default function Profile() {
    // const dispatch = useDispatch();
    const initialState = { first_name: "", last_name: "", phone: "", email: "", gender: "" };
    const [data, setData] = useState(initialState);
    const [newdata, setNewdata] = useState(initialState);
    const [verror, setVerror] = useState(initialState);
    const [modal, setModal] = useState(false);
    const regForname = RegExp("^[a-zA-Z]+$");
    const regForphone = RegExp('^((\\+91-?)|0)?[0-9]{10}$');
    const regForemail = RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.com$");
    const user = JSON.parse(localStorage.getItem("profile"));

    useEffect(() => {
        if (user) {
            setData(user.result);
            setNewdata(user.result);
        }
        else { console.log("login first !"); }
        // eslint-disable-next-line
    }, []);

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
            default: break;
        }
        setNewdata({ ...newdata, [name]: value });
    }
    const handleValidate = (errors) => {
        let validate = (errors.first_name === "" && errors.last_name === "" && errors.phone === "" && errors.email === "") ? true : false;
        return validate;
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (handleValidate(verror)) {
            if (newdata.first_name !== "" && newdata.last_name !== "" && newdata.phone !== "" && newdata.email !== "" && newdata.gender !== "") {
                // dispatch(editProfile(newdata));
                setData(newdata);
                setModal(false)
            } else { alert("Please Fill All Fields"); }
        } else { alert("Please Enter Valid Details"); }
    }

    return (
        <div>
            <Card>
                <Card.Body>
                    <Card.Title ><h3>Profile</h3></Card.Title><hr />
                    <div style={{ fontSize: "1.3rem" }}>
                        <Row className='my-2'>
                            <Col sm={4} lg={3}><p><b>First Name</b></p></Col>
                            <Col><p>{data.first_name}</p></Col>
                        </Row>
                        <Row className='my-2'>
                            <Col sm={4} lg={3}><p><b>Last Name</b></p></Col>
                            <Col><p>{data.last_name}</p></Col>
                        </Row>
                        <Row className='my-2'>
                            <Col sm={4} lg={3}><p><b>Email</b></p></Col>
                            <Col><p>{data.email}</p></Col>
                        </Row>
                        <Row className='my-2'>
                            <Col sm={4} lg={3}><p><b>Phone</b></p></Col>
                            <Col><p>{data.phone}</p></Col>
                        </Row>
                        <Row className='my-2'>
                            <Col sm={4} lg={3}><p><b>Gender</b></p></Col>
                            <Col><p>{data.gender}</p></Col>
                        </Row>
                    </div><hr />
                    <Button variant='outline-dark' onClick={() => setModal(true)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                    </svg> Edit</Button>
                </Card.Body>
            </Card>
            <Modal show={modal} onHide={() => setModal(false)} size='lg' backdrop="static">
                <Modal.Header closeButton><Modal.Title>Profile</Modal.Title></Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3" md="4">
                            <InputGroup hasValidation>
                                <Form.Control type="text" placeholder="First Name" name="first_name" value={newdata.first_name} onChange={handleInputChange} isInvalid={!!verror.first_name} />
                                <InputGroup.Text><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fonts" viewBox="0 0 16 16">
                                    <path d="M12.258 3h-8.51l-.083 2.46h.479c.26-1.544.758-1.783 2.693-1.845l.424-.013v7.827c0 .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.431.013c1.934.062 2.434.301 2.693 1.846h.479L12.258 3z" />
                                </svg></InputGroup.Text>
                                <Form.Control.Feedback type="invalid">{verror.first_name}</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-3" md="4">
                            <InputGroup hasValidation>
                                <Form.Control type="text" placeholder="Last Name" name="last_name" value={newdata.last_name} onChange={handleInputChange} isInvalid={!!verror.last_name} />
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
                                <Form.Control type="email" placeholder="Enter Email" name="email" value={newdata.email} onChange={handleInputChange} isInvalid={!!verror.email} />
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
                                <Form.Control type="tel" placeholder="Phone Number" name="phone" value={newdata.phone} onChange={handleInputChange} isInvalid={!!verror.phone} />
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
                                {newdata.gender === "" ? "Please select gender" : ""}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer><Button variant="primary" type='submit' ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-save" viewBox="0 0 16 16">
                        <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z" />
                    </svg> Save</Button></Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}