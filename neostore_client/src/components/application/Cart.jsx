import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { getuser } from "../../api";

export default function Cart() {
  const navigate = useNavigate();
  const User = JSON.parse(localStorage.getItem("profile"));
  const [cart, setCart] = useState();
  const [alertmsg, setAlertmsg] = useState(false);
  // const [user, setUser] = useState();
  // const [order, setOrder] = useState();
  let order = {};
  let subtotal = 0;
  let taxtotal = 0;
  let ordertotal = 0;
  useEffect(() => {
    if (!User) setAlertmsg(true);
    async function fetchData() {
      try {
        const { data } = await getuser(User.result._id);
        // setUser(data);
        setCart(data.cart);
        // console.log(data.cart);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData(); // eslint-disable-next-line
  }, []);

  const handleProceedBuy = () => {
    order = {
      order_id: Math.floor(Math.random() * 1000000),
      order_status: "TRANSIT",
      order_date: Date(),
      user_id: User.result._id,
      cart: cart,
      subtotal: subtotal,
      taxtotal: taxtotal,
      ordertotal: ordertotal,
    };
    console.log(order);
    localStorage.setItem("order", JSON.stringify(order));
    navigate("/addresscheckout");
  };
  return (
    <div>
      {alertmsg && (
        <Alert
          className="mx-4 text-center"
          variant="danger"
          onClose={() => setAlertmsg(false)}
          dismissible
        >
          {" "}
          Login First !!!
        </Alert>
      )}
      <Container>
        <Row>
          <Col sm="2" lg="1">
            <span>
              <Badge pill bg="primary">
                1
              </Badge>{" "}
              Cart{" "}
            </span>
          </Col>
          <Col sm="7" lg="8">
            <hr />
          </Col>
          <Col sm="3">
            <span>
              <Badge pill bg="secondary">
                2
              </Badge>{" "}
              Delivery Address{" "}
            </span>
          </Col>
        </Row>
        <Row>
          <Col md="9" className="my-4">
            <Card>
              <Card.Body>
                <Row>
                  <Col sm="5">Product</Col>
                  <Col sm="2">Quantity</Col>
                  <Col sm="2">Price</Col>
                  <Col sm="2">Total</Col>
                  <Col sm="1"></Col>
                </Row>
                <hr />
                {cart &&
                  cart.map((ele) => (
                    <Row key={ele._id}>
                      <Col sm="5">
                        <Row>
                          <Col sm="4">
                            <img
                              src={`/Neostore_Images/${ele.category_name}/${ele.product_name}/${ele.product_image}`}
                              alt="1.webp"
                              width="100%"
                            />
                          </Col>
                          <Col sm="8">
                            <h6>{ele.product_name}</h6>
                            <h6>by Appario Retail Private Ltd</h6>
                            <h6>
                              Status:{" "}
                              <span style={{ color: "green" }}>In Stock</span>
                            </h6>
                          </Col>
                        </Row>
                      </Col>
                      <Col sm="2">
                        <p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-dash-circle"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                          </svg>
                          &nbsp;
                          <span style={{ border: "1px solid black" }}>
                            &nbsp;{ele.quantity}&nbsp;
                          </span>
                          &nbsp;
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-plus-circle"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                          </svg>
                        </p>
                      </Col>
                      <Col sm="2">
                        <p>{ele.product_cost}</p>
                      </Col>
                      <Col sm="2">
                        <span style={{ display: "none" }}>
                          {
                            (subtotal =
                              subtotal + ele.product_cost * ele.quantity)
                          }
                        </span>
                        <p>{ele.product_cost * ele.quantity}</p>
                      </Col>
                      <Col sm="1">
                        <p style={{ color: "red" }}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-trash"
                            viewBox="0 0 16 16"
                          >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path
                              fillRule="evenodd"
                              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                            />
                          </svg>
                        </p>
                      </Col>
                      <hr />
                    </Row>
                  ))}
                {!cart && (
                  <Row>
                    <h3>No Product in Cart</h3>
                  </Row>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col md="3" className="my-4">
            <Card>
              <Card.Body>
                <Row className="mb-4">
                  <Col>
                    <h3>Review Order</h3>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>Subtotal</h6>
                  </Col>
                  <Col className="text-end">
                    <h6>{subtotal}</h6>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col>
                    <h6>GST(18%)</h6>
                  </Col>
                  <Col className="text-end">
                    <h6>
                      <span style={{ display: "none" }}>
                        {(taxtotal = (subtotal * 18) / 100)}
                      </span>
                      {taxtotal}
                    </h6>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col>
                    <h6>Order Total</h6>
                  </Col>
                  <Col className="text-end">
                    <h6>
                      <span style={{ display: "none" }}>
                        {(ordertotal = subtotal + taxtotal)}
                      </span>
                      {ordertotal}
                    </h6>
                  </Col>
                </Row>
                <Row className="mt-4 px-2">
                  <Button className="w-100" onClick={handleProceedBuy}>
                    Proceed To Buy
                  </Button>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
