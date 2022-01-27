import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom';
import { Card, Modal, Row, Col, Form, Button } from 'react-bootstrap'
import { addaddress, getuser } from '../../../api/index';

export default function Addresses() {
    // const navigate = useNavigate();
    // const dispatch = useDispatch()
    const initialState = { _id: 0, address1: "", address2: "", city: "", pincode: "", state: "", country: "", phone: "" }
    const [data, setData] = useState([initialState]);
    const [editdata, setEditdata] = useState(initialState);
    const [newdata, setNewdata] = useState(initialState);
    const [verror, setVerror] = useState(initialState);
    const [editmodal, setEditmodal] = useState(false);
    const [newmodal, setNewmodal] = useState(false)
    const regForphone = RegExp('^((\\+91-?)|0)?[0-9]{10}$');
    const regForpincode = RegExp('^[1-9][0-9]{5}$'); // eslint-disable-next-line
    const regForaddress = RegExp('^[0-9\\\/# ,a-zA-Z]+[ . , ( )]+[0-9\\\/#, a-zA-Z]{1,}$');
    const user = JSON.parse(localStorage.getItem("profile"));
    console.log(user.result._id);
    useEffect(() => {
        async function fetchData() {
            if (user) {
                try {
                    const { data } = await getuser(user.result._id);
                    console.log(data);
                    setData(data.addresses);
                } catch (error) {
                    console.log(error);
                }
            } else { console.log("login first !"); }
        }
        fetchData(); // eslint-disable-next-line
    }, [data]);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "address1":
                setVerror({ ...verror, [name]: regForaddress.test(value) ? "" : 'Enter a Valid Address' })
                break;
            case "address2":
                setVerror({ ...verror, [name]: regForaddress.test(value) ? "" : 'Enter a Valid Address' })
                break;
            case "pincode":
                setVerror({ ...verror, [name]: regForpincode.test(value) ? "" : 'Enter a Valid Pincode' })
                break;
            case "phone":
                setVerror({ ...verror, [name]: regForphone.test(value) ? "" : 'Enter a Valid Phone number' })
                break;
            default: break;
        }
        setEditdata({ ...editdata, [name]: value });
        setNewdata({ ...newdata, [name]: value });
    }
    const handleValidate = (errors) => {
        let validate = (errors.address1 === "" && errors.address2 === "" && errors.city === "" && errors.pincode === "" && errors.state === "" && errors.country === "" && errors.phone === "") ? true : false;
        return validate;
    }
    const handleNewSubmit = (event) => {
        event.preventDefault();
        console.log("new address request");
        if (handleValidate(verror)) {
            if (newdata.address1 !== "" && newdata.address2 !== "" && newdata.city !== "" && newdata.pincode !== "" && newdata.state !== "" && newdata.country !== "" && newdata.phone !== "") {
                newdata._id = Math.floor(Math.random() * 1000000);
                addaddress(newdata, user.result._id);
                // setData(newdata);
                setNewmodal(false);
            } else { alert("Please Fill All Fields"); }
        } else { alert("Please Enter Valid Details"); }
    }
    const handleEditSubmit = (event) => {
        event.preventDefault();
        if (handleValidate(verror)) {
            console.log("edit address request");
        } else { alert("Please Enter Valid Details"); }
        setData(editdata);
        setEditmodal(false);
    }
    const handleEdit = (edata) => {
        setEditdata(edata);
        setEditmodal(true);
        // console.log(editdata);
    }
    const handleDelete = (ddata) => {
        // setEditdata(ddata);
        // setEditmodal(true);
        console.log(ddata);
    }
    return (
        <div>
            <Card>
                <Card.Body>
                    <Card.Title ><h3>Addresses</h3></Card.Title><hr />
                    {data && data.map(address =>
                        <Card key={address._id}>
                            <Card.Body>
                                <p><b>Address:</b></p>
                                <p>{address.address1}</p>
                                <p>{address.address2},{address.city}-{address.pincode},</p>
                                <p>{address.state}, {address.country}.</p>
                                <p><b>Phone:</b>{address.phone}</p>
                                <Button variant='primary' onClick={() => handleEdit(address)} className=' px-4'>Edit</Button>
                                <Button variant='danger' onClick={() => handleDelete(address)} className='mx-4 px-4'>Delete</Button>
                            </Card.Body>
                        </Card>
                    )}
                    <hr /><Button variant='outline-dark' onClick={() => setNewmodal(true)}>Add Address</Button>
                </Card.Body>
            </Card>
            <Modal show={editmodal} onHide={() => setEditmodal(false)} size='lg' backdrop="static">
                <Modal.Header closeButton><Modal.Title>Edit Address</Modal.Title></Modal.Header>
                <Form onSubmit={handleEditSubmit}>
                    <Modal.Body>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Address Line 1</Form.Label>
                                <Form.Control type="text" placeholder="House/Room/Building/Colony" name="address1" value={editdata.address1} onChange={handleInputChange} isInvalid={!!verror.address1} required />
                                <Form.Control.Feedback type="invalid">{verror.address1}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Address Line 2</Form.Label>
                                <Form.Control type="text" placeholder="Road/Area/Village " name="address2" value={editdata.address2} onChange={handleInputChange} isInvalid={!!verror.address2} required />
                                <Form.Control.Feedback type="invalid">{verror.address2}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" placeholder="City" name="city" value={editdata.city} onChange={handleInputChange} isInvalid={!!verror.city} required />
                                <Form.Control.Feedback type="invalid">{verror.city}Please provide a valid city.</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label>Pincode</Form.Label>
                                <Form.Control type="text" placeholder="Pincode" name="pincode" value={editdata.pincode} onChange={handleInputChange} isInvalid={!!verror.pincode} required />
                                <Form.Control.Feedback type="invalid">{verror.pincode}Please provide a valid zip.</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label>State</Form.Label>
                                <Form.Control type="text" placeholder="State" name="state" value={editdata.state} onChange={handleInputChange} isInvalid={!!verror.state} required />
                                <Form.Control.Feedback type="invalid">{verror.state}Please provide a valid state.</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label>Country</Form.Label>
                                <Form.Control type="text" placeholder="Country" name="country" value={editdata.country} onChange={handleInputChange} isInvalid={!!verror.country} required />
                                <Form.Control.Feedback type="invalid">{verror.country}Please provide a valid country.</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="tel" placeholder="Phone Number" name="phone" value={editdata.phone} onChange={handleInputChange} isInvalid={!!verror.phone} required />
                                <Form.Control.Feedback type="invalid">{verror.phone}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type='submit' ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-save" viewBox="0 0 16 16">
                            <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z" />
                        </svg> Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Modal show={newmodal} onHide={() => setNewmodal(false)} size='lg' backdrop="static">
                <Modal.Header closeButton><Modal.Title>Add New Address</Modal.Title></Modal.Header>
                <Form onSubmit={handleNewSubmit}>
                    <Modal.Body>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Address Line 1</Form.Label>
                                <Form.Control type="text" placeholder="House/Room/Building/Colony" name="address1" value={newdata.address1} onChange={handleInputChange} isInvalid={!!verror.address1} required />
                                <Form.Control.Feedback type="invalid">{verror.address1}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Address Line 2</Form.Label>
                                <Form.Control type="text" placeholder="Road/Area/Village " name="address2" value={newdata.address2} onChange={handleInputChange} isInvalid={!!verror.address2} required />
                                <Form.Control.Feedback type="invalid">{verror.address2}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" placeholder="City" name="city" value={newdata.city} onChange={handleInputChange} isInvalid={!!verror.city} required />
                                <Form.Control.Feedback type="invalid">{verror.city}Please provide a valid city.</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label>Pincode</Form.Label>
                                <Form.Control type="text" placeholder="Pincode" name="pincode" value={newdata.pincode} onChange={handleInputChange} isInvalid={!!verror.pincode} required />
                                <Form.Control.Feedback type="invalid">{verror.pincode}Please provide a valid zip.</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label>State</Form.Label>
                                <Form.Control type="text" placeholder="State" name="state" value={newdata.state} onChange={handleInputChange} isInvalid={!!verror.state} required />
                                <Form.Control.Feedback type="invalid">{verror.state}Please provide a valid state.</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label>Country</Form.Label>
                                <Form.Control type="text" placeholder="Country" name="country" value={newdata.country} onChange={handleInputChange} isInvalid={!!verror.country} required />
                                <Form.Control.Feedback type="invalid">{verror.country}Please provide a valid country.</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="tel" placeholder="Phone Number" name="phone" value={newdata.phone} onChange={handleInputChange} isInvalid={!!verror.phone} required />
                                <Form.Control.Feedback type="invalid">{verror.phone}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type='submit' ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-save" viewBox="0 0 16 16">
                            <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z" />
                        </svg> Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}