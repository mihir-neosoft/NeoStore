import React, { useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";
import { addsubscriber } from "../../api";

export default function Footer() {
  const regForemail = RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.com$");
  const [data, setData] = useState({ subemail: "" });
  const [verror, setVerror] = useState({ subemail: "" });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "subemail":
        setVerror({
          ...verror,
          [name]: regForemail.test(value) ? "" : "Enter a Valid Email",
        });
        break;
      default:
        break;
    }
    setData({ ...data, [name]: value });
  };
  const handleValidate = (verror) => {
    let validate = verror.subemail === "" ? true : false;
    return validate;
  };
  const handleAddtoMailingList = (event) => {
    event.preventDefault();
    if (handleValidate(verror)) {
      if (data.subemail !== "") {
        console.log(data);
        addsubscriber(data);
        alert("Email Added");
      } else {
        alert("Please Add Email");
      }
    } else {
      alert("Please Enter Valid Email");
    }
  };
  return (
    <div className="text-center">
      <Navbar bg="dark" variant="dark">
        <Container fluid style={{ color: "white", display: "block" }}>
          <Row>
            <Col>
              <h6>About Company</h6>
              <p>
                NeoSOFT Technologies is here at your quick and easy service for
                shopping.
                <br />
                Contact Information
                <br />
                Email: contact@neosofttech.com
                <br />
                Phone: +91 9876543210
                <br />
                Mumbai,India
              </p>
            </Col>
            <Col>
              <h6>Information</h6>
              <p>
                <Nav.Link
                  style={{ color: "white", padding: 0 }}
                  href="/termsandcondition"
                >
                  Terms and Conditions
                </Nav.Link>
                {/* Terms and Conditions<br /> */}
                Gurantee and Return Policy
                <br />
                Contact Us
                <br />
                Privacy Policy
                <br />
                {/* Locate Us */}
                <Nav.Link
                  style={{ color: "white", padding: 0 }}
                  href="/locateus"
                >
                  Locate Us
                </Nav.Link>
              </p>
            </Col>
            <Col>
              <h6>Newsletter</h6>
              <p>
                Signup to get exclusive offer from our favourite brands and to
                be well up in the news
              </p>
              <Form
                method="post"
                onSubmit={handleAddtoMailingList}
                className="px-4"
              >
                <Form.Group>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email to Subscribe"
                    name="subemail"
                    value={data.subemail}
                    onChange={handleInputChange}
                    isInvalid={!!verror.subemail}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {verror.subemail}
                  </Form.Control.Feedback>
                </Form.Group>
                {/* <Form.Group>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Enter Email to Subscribe"
                    value={data.subemail}
                    name="subemail"
                    onChange={handleInputChange}
                    isInvalid={!!verror.subemail}
                  />
                  <Form.Control.Feedback type="invalid">
                    {verror.subemail}
                  </Form.Control.Feedback>
                </Form.Group> */}
                {/* <Form.Control type="email" placeholder="Enter email" /> */}
                <Button className="my-2" variant="secondary" type="submit">
                  Subscribe
                </Button>
              </Form>
            </Col>
            <p>
              Copyright 2017 NeoSOFT Technologies All rights reserved | Design
              By Mihir Adelkar
            </p>
          </Row>
        </Container>
      </Navbar>
    </div>
  );
}
