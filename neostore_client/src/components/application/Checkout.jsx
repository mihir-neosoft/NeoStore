import React, { useState, useEffect } from 'react';
import { Container, Card, Accordion, Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
    const navigate = useNavigate();
    const initialState = {
        nameoncard: "", cardnumber: "", month: "", year: "", cvv: "", vpa: ""
    }
    const [data, setData] = useState(initialState);
    const [verror, setVerror] = useState(initialState);
    let Order = JSON.parse(localStorage.getItem("order"));

    const regForname = RegExp("^[a-zA-Z]+\\s[a-zA-Z]+$");                                                                                                                                   // eslint-disable-next-line
    const regForcard = RegExp('^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$');
    const regForcvv = RegExp("^[0-9]{3}");
    const regFormonth = RegExp("^[0-9]{2}");
    const regForyear = RegExp("^[0-9]{4}");
    const regForvpa = RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z]+$");

    useEffect(() => {
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "nameoncard":
                setVerror({ ...verror, [name]: regForname.test(value) ? "" : 'Enter a valid name ' })
                break;
            case "cardnumber":
                setVerror({ ...verror, [name]: regForcard.test(value) ? "" : 'Enter a valid card number ' })
                break;
            case "month":
                setVerror({ ...verror, [name]: regFormonth.test(value) ? "" : 'Enter a valid month' })
                break;
            case "year":
                setVerror({ ...verror, [name]: regForyear.test(value) ? "" : 'Enter a valid year' })
                break;
            case "cvv":
                setVerror({ ...verror, [name]: regForcvv.test(value) ? "" : 'Enter a valid cvv' })
                break;
            case "vpa":
                setVerror({ ...verror, [name]: regForvpa.test(value) ? "" : 'Enter a valid vpa' })
                break;
            default: break;
        }
        setData({ ...data, [name]: value });
    }
    const handleValidate = (errors) => {
        let validate = ((errors.nameoncard === "" && errors.cardnumber === "" && errors.month === "" && errors.year === "" && errors.cvv === "") || (errors.vpa === "")) ? true : false;
        return validate;
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (handleValidate(verror)) {
            if ((data.nameoncard !== "" && data.cardnumber !== "" && data.month !== "" && data.year !== "" && data.cvv !== "") || (data.vpa !== "")) {
                // dispatch(register(data));
                console.log(data);
                Order = {
                    ...Order, paymentdetails: {
                        nameoncard: data.nameoncard,
                        cardnumber: data.cardnumber,
                        month: data.month,
                        year: data.year,
                        cvv: data.cvv,
                        vpa: data.vpa,
                    }
                }
                localStorage.setItem('order', JSON.stringify(Order));
                navigate("/ordersuccess");
                alert("order Success");
            } else { alert("Please Fill All Fields"); }
        } else { alert("Please Enter Valid Details"); }
    }

    return (
        <Container>
            <Card>
                <Card.Body>
                    <h2>Select Payment Mode</h2>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Debit/Credit Card</Accordion.Header>
                            <Accordion.Body>
                                <Card>
                                    <Card.Body>
                                        <Form onSubmit={handleSubmit}>
                                            <Row className="mb-3">
                                                <Form.Group as={Col}>
                                                    <Form.Label>Card Number</Form.Label>
                                                    <Form.Control type="text" placeholder="Card Number" name="cardnumber" value={data.cardnumber} onChange={handleInputChange} isInvalid={!!verror.cardnumber} required />
                                                    <Form.Control.Feedback type="invalid">{verror.cardnumber}</Form.Control.Feedback>
                                                </Form.Group>
                                            </Row>
                                            <Row className="mb-3">
                                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                                    <Form.Group as={Col} sm="2">
                                                        <Form.Label as={Row}>&nbsp;</Form.Label>
                                                        <Form.Label as={Row}>&nbsp; Expiry Date</Form.Label>
                                                    </Form.Group>
                                                    <Form.Group as={Col} sm="2">
                                                        <Form.Label>Month</Form.Label>
                                                        <Form.Control type="text" placeholder="Month" name="month" value={data.month} onChange={handleInputChange} isInvalid={!!verror.month} required />
                                                        <Form.Control.Feedback type="invalid">{verror.month}</Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group as={Col} sm="2">
                                                        <Form.Label>/ Year</Form.Label>
                                                        <Form.Control type="text" placeholder="Year" name="year" value={data.year} onChange={handleInputChange} isInvalid={!!verror.year} required />
                                                        <Form.Control.Feedback type="invalid">{verror.year}</Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group as={Col} sm="1">

                                                    </Form.Group>
                                                    <Form.Group as={Col} sm="4">
                                                        <Form.Label>CVV Code</Form.Label>
                                                        <Form.Control type="text" placeholder="CVV" name="cvv" value={data.cvv} onChange={handleInputChange} isInvalid={!!verror.cvv} required />
                                                        <Form.Control.Feedback type="invalid">{verror.cvv}</Form.Control.Feedback>
                                                    </Form.Group>
                                                </Form.Group>
                                            </Row>
                                            <Row className="mb-3">
                                                <Form.Group as={Col}>
                                                    <Form.Label>Name on Card</Form.Label>
                                                    <Form.Control type="text" placeholder="Name on Card" name="nameoncard" value={data.nameoncard} onChange={handleInputChange} isInvalid={!!verror.nameoncard} required />
                                                    <Form.Control.Feedback type="invalid">{verror.nameoncard}</Form.Control.Feedback>
                                                </Form.Group>
                                            </Row>
                                            <Button type="submit">Pay</Button>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>UPI</Accordion.Header>
                            <Accordion.Body>
                                <Form onSubmit={handleSubmit}>
                                    <Row className="mb-3">
                                        <Form.Group as={Col}>
                                            <Form.Label>Virtual Private Address (VPA)</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Your Virtual Private Address" name="vpa" value={data.vpa} onChange={handleInputChange} isInvalid={!!verror.vpa} required />
                                            <Form.Control.Feedback type="invalid">{verror.vpa}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Button type="submit">Pay</Button>
                                </Form>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>PayPal</Accordion.Header>
                            <Accordion.Body>
                                <Form onSubmit={handleSubmit}>
                                    <Row className="mb-3">
                                        <Form.Group as={Col}>
                                            <Form.Label>Virtual Private Address (VPA)</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Your Virtual Private Address" name="vpa" value={data.vpa} onChange={handleInputChange} isInvalid={!!verror.vpa} required />
                                            <Form.Control.Feedback type="invalid">{verror.vpa}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Button type="submit">Pay</Button>
                                </Form>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Net Banking</Accordion.Header>
                            <Accordion.Body>
                                <Form onSubmit={handleSubmit}>
                                    <Row className="mb-3">
                                        <Form.Group as={Col}>
                                            <Form.Label>Virtual Private Address (VPA)</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Your Virtual Private Address" name="vpa" value={data.vpa} onChange={handleInputChange} isInvalid={!!verror.vpa} required />
                                            <Form.Control.Feedback type="invalid">{verror.vpa}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Button type="submit">Pay</Button>
                                </Form>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Card.Body>
            </Card>
        </Container>
    )
}
