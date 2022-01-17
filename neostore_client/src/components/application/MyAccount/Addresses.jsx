import React, { useState, useEffect } from 'react'
import { Card, Modal, Row, Col, Form, Button } from 'react-bootstrap'
// import { Card, Modal, Row, Col, Form, Button, FormControl, Dropdown, DropdownButton, InputGroup, Alert } from 'react-bootstrap'
export default function Addresses() {
    const initialState = { _id: 0, address1: "", address2: "", city: "", pincode: "", state: "", country: "", phone: "" }
    const [data, setData] = useState([
        {
            _id: 9876543210,
            address1: "4/230, Western Railway Colony,",
            address2: "S.V. Road, Bandra(W),",
            city: "Mumbai",
            pincode: 400050,
            state: "Maharashtra",
            country: "India",
            phone: 9769017984
        },
        {
            _id: 9876543211,
            address1: "751/17, Mahim Machhimar Nagar,",
            address2: "S.L.Raheja Marg, Mahim(W),",
            city: "Mumbai",
            pincode: 400016,
            state: "Maharashtra",
            country: "India",
            phone: 9820017984
        }
    ]);
    // const [data, setData] = useState(initialState);
    const [editdata, setEditdata] = useState(initialState);
    const [newdata, setNewdata] = useState(initialState);
    const [verror, setVerror] = useState(initialState);
    const [editmodal, setEditmodal] = useState(false);
    const [newmodal, setNewmodal] = useState(false)
    const regForphone = RegExp('^((\\+91-?)|0)?[0-9]{10}$');
    const regForpincode = RegExp('^[1-9][0-9]{5}$'); // eslint-disable-next-line
    const regForaddress = RegExp('^[0-9\\\/# ,a-zA-Z]+[ ,]+[0-9\\\/#, a-zA-Z]{1,}$');
    const user = JSON.parse(localStorage.getItem("profile"));
    // console.log(user.result);
    useEffect(() => {
        if (user) {
            // setData(user.result);
            // setNewdata(user.result);
        }
        else { console.log("login first !"); }
        // eslint-disable-next-line
    }, []);
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
        let validate = (errors.first_name === "" && errors.last_name === "" && errors.phone === "" && errors.email === "") ? true : false;
        return validate;
    }
    const handleNewSubmit = (event) => {
        event.preventDefault();
        console.log("new address request");
        if (handleValidate(verror)) {
            if (newdata.first_name !== "" && newdata.last_name !== "" && newdata.phone !== "" && newdata.email !== "" && newdata.gender !== "") {
                // dispatch(editProfile(newdata));
                setData(newdata);
                setNewmodal(false);
            } else { alert("Please Fill All Fields"); }
        } else { alert("Please Enter Valid Details"); }
    }
    const handleEditSubmit = (event) => {
        event.preventDefault();
        console.log("edit address request");
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
                    {data.map(address =>
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

// import React, { useState, useEffect } from 'react'
// // import { orderaddress } from '../config/Myservice'
// import axios from 'axios'
// // import jwt_decode from 'jwt-decode'
// import { useNavigate } from 'react-router-dom';
// // import { useLocation } from 'react-router-dom';
// // import { MdSave } from 'react-icons/md'
// import { Form, FormControl, Button, Dropdown, DropdownButton, InputGroup, Alert } from 'react-bootstrap'
// const Apitoken = 'FIOD_ZjTY5s2akKAPBS9uvYtP1zNOr_wCO_BsOnrcT0lsZw5eH0Ror3QaTx40q8zlHQ'
// export default function Addresses() {
//     const navigate = useNavigate()
//     // const location = useLocation()
//     const [fields, setFields] = useState({ country: 'India', state: 'Maharashtra', city: 'Pune', address: '', pincode: '' })
//     const [errors, setErrors] = useState({ country: '', state: '', city: '', address: '', pincode: '' })
//     const [displayfields, setDisplayfields] = useState({ country: [], state: [], city: [] })
//     const [showAlert, setShowAlert] = useState(false)

//     useEffect(() => {
//         axios.get("https://www.universal-tutorial.com/api/countries/", { headers: { Authorization: Apitoken, Accept: 'application/json' } })
//             .then(res => { setDisplayfields({ ...displayfields, country: res.data }); })// eslint-disable-next-line
//     }, [])

//     useEffect(() => {
//         axios.get(`https://www.universal-tutorial.com/api/states/${fields.country}`, { headers: { Authorization: Apitoken, Accept: 'application/json' } })
//             .then(res => { setDisplayfields({ ...displayfields, state: res.data }); })// eslint-disable-next-line
//     }, [fields.country])

//     useEffect(() => {
//         axios.get(`https://www.universal-tutorial.com/api/cities/${fields.state}`, { headers: { Authorization: Apitoken, Accept: 'application/json' } })
//             .then(res => { setDisplayfields({ ...displayfields, city: res.data }); })// eslint-disable-next-line
//     }, [fields.state])

//     function handler(e) {
//         setFields({ ...fields, [e.target.name]: e.target.value })
//         if (e.target.name === "address") {
//             if (e.target.value.length < 10) { setErrors({ ...errors, [e.target.name]: 'Address to short' }) }
//             else { setErrors({ ...errors, [e.target.name]: '' }) }
//         }
//         if (e.target.name === "pincode") {
//             if (e.target.value < 100000 || e.target.value > 999999) { setErrors({ ...errors, [e.target.name]: 'Pincode invalid' }) }
//             else { setErrors({ ...errors, [e.target.name]: '' }) }
//         }
//     }

//     const save = () => {
//         let tmp = Object.keys(errors)
//         let count = tmp.reduce((sum, ele) => sum + errors[ele].length, 0)
//         if (count === 0) {
//             console.log("OK")
//             let tmp2 = Object.keys(fields)
//             let count2 = tmp2.reduce((sum, ele) => { if (fields[ele].length === 0) { return sum + 1 } return sum }, 0)
//             if (count2 === 0) {
//                 // let sessiontmp = fields
//                 // sessiontmp.email = jwt_decode(sessionStorage.getItem('_token')).email
//                 // orderaddress({ 'buyer': location.state.email, 'orderlist': location.state.cart, 'total': location.state.total, 'address': fields })
//                 //     .then(res => {
//                 //         if (res.data.err === 0)
//                 //             navigate("/myaccount/order")
//                 //     })
//             }
//             else {
//                 setShowAlert(true)
//             }
//         }
//         else {
//             setShowAlert(true)
//         }
//     }

//     return (
//         <div >
//             <Alert variant="danger" onClose={() => setShowAlert(false)}
//                 show={showAlert}
//                 dismissible>
//                 <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
//                 <p>Some fields are empty not valid.</p>
//             </Alert>
//             <Form className='p-3' style={{ borderRadius: '10px', boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.2)` }}>
//                 <h2>Add new address</h2>
//                 <hr />
//                 <Form.Group className="mb-3">
//                     <textarea className='w-100 p-2' name='address' onChange={handler}></textarea>
//                     <p className="text-danger">{errors.address}</p>
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                     <FormControl type="number" name='pincode' onChange={handler} placeholder="Pincode" />
//                     <p className="text-danger">{errors.pincode}</p>
//                 </Form.Group>
//                 <div className="d-flex justify-content-evenly">
//                     <InputGroup>
//                         <DropdownButton
//                             variant="outline-secondary"
//                             title={fields.country === '' ? "Country" : fields.country} >
//                             {displayfields.country.map((ele) =>
//                                 <Dropdown.Item
//                                     onClick={() => { setDisplayfields({ ...displayfields, state: [], city: [] }); setFields({ ...fields, country: ele.country_name }) }}>
//                                     {ele.country_name}</Dropdown.Item>
//                             )}
//                         </DropdownButton>
//                         <p className="text-danger">{errors.country}</p>
//                     </InputGroup>
//                     <InputGroup>
//                         <DropdownButton variant="outline-secondary" title={fields.state === '' ? "State" : fields.state} >
//                             {displayfields.state.map((ele) =>
//                                 <Dropdown.Item
//                                     onClick={() => { setDisplayfields({ ...displayfields, city: [] }); setFields({ ...fields, state: ele.state_name }) }}>
//                                     {ele.state_name}</Dropdown.Item>
//                             )}
//                         </DropdownButton>
//                         <p className="text-danger">{errors.state}</p>
//                     </InputGroup>
//                     <InputGroup>
//                         <DropdownButton variant="outline-secondary" title={fields.city === '' ? "City" : fields.city} >
//                             {displayfields.city.map((ele) =>
//                                 <Dropdown.Item
//                                     onClick={() => { setFields({ ...fields, city: ele.city_name }) }}>
//                                     {ele.city_name}</Dropdown.Item>
//                             )}
//                         </DropdownButton>
//                         <p className="text-danger">{errors.city}</p>
//                     </InputGroup>
//                 </div>
//                 <hr />
//                 <p><Button onClick={() => save()} variant="light" >Save</Button> <Button variant="light" onClick={() => navigate("/myaccount/address")} style={{ fontWeight: 'bolder' }}>X Cancel</Button></p>
//             </Form >
//         </div >
//     )
// }