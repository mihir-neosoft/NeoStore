import React, { useEffect, useState } from "react";
// import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { Accordion, Alert, Button, Col, Container, Row } from "react-bootstrap";
import {
  FacebookShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookIcon,
  TelegramIcon,
  WhatsappIcon,
  PinterestIcon,
  TwitterIcon,
  EmailIcon,
} from "react-share";
import Magnifier from "react-magnifier";
import { getproduct, getuser, addtocart } from "../../../api";

export default function ProductDetail() {
  const [alertmsg, setAlertmsg] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const dispatch = useDispatch()
  const User = JSON.parse(localStorage.getItem("profile"));

  // let cart = [];
  let [cart, setCart] = useState([]);
  const [product, setProduct] = useState();
  const [user, setUser] = useState();
  const [image, setImage] = useState("1.webp");
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await getproduct(id);
        setProduct(data);
        setImage(data.product_image);
      } catch (error) {
        console.log(error);
      }
      try {
        const { data } = await getuser(User.result._id);
        setUser(data);
        setCart(data.cart);
        console.log(data.cart);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData(); // eslint-disable-next-line
  }, []);

  const addToCart = () => {
    if (!User) {
      //   navigate("/login");
      setAlertmsg(true);
    } else {
      const productExist = cart.find((ele) => ele._id === product._id);
      if (!productExist) {
        cart = [
          ...cart,
          {
            _id: product._id,
            product_name: product.product_name,
            product_image: product.product_image,
            product_cost: product.product_cost,
            product_description: product.product_description,
            color_id: product.color_id._id,
            color_code: product.color_id.color_code,
            category_id: product.category_id._id,
            category_name: product.category_id.category_name,
            quantity: 1,
          },
        ];
        addtocart(cart, user._id);
        alert("Product Added to Cart ");
      } else {
        cart = cart.map((ele) =>
          ele._id === product._id ? { ...ele, quantity: ele.quantity + 1 } : ele
        );
        addtocart(cart, user._id);
        alert("Product Quantity Increased ");
      }
      console.log(cart);
    }
  };
  const rateProduct = () => {
    console.log("Rate Product");
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
          Login First !!!
        </Alert>
      )}
      {product && (
        <Container>
          <Row className="text-end">
            <div>
              <Button
                variant="outline-dark"
                onClick={() => navigate("/products")}
              >
                Back to Products
              </Button>
            </div>
          </Row>
          <Row>
            <Col sm={6}>
              <div className="m-2">
                <Magnifier
                  style={{ border: "1px solid black" }}
                  src={`/Neostore_Images/${product.category_id.category_name}/${product.product_name}/${image}`}
                  alt={image}
                  width="90%"
                />
              </div>
              <div className="m-2">
                {/* {console.log(product.product_subimages)} */}
                {product.product_subimages.map((ele, index) => (
                  <img
                    key={index}
                    src={`/Neostore_Images/${product.category_id.category_name}/${product.product_name}/${ele}`}
                    onClick={() => setImage(ele)}
                    alt={ele}
                    width="15%"
                    className="me-1"
                    style={{ border: "1px solid black" }}
                  />
                ))}
              </div>
            </Col>
            <Col sm={6} className="p-4">
              <div style={{ width: "100%" }}>
                <div className="my-4">
                  <h3>{product.product_name}</h3>
                  <h5>{product.product_rating}</h5>
                  <hr />
                  <h5>
                    Price:{" "}
                    <span style={{ color: "green" }}>
                      ${product.product_cost}
                    </span>
                  </h5>
                  <h5>
                    Color: {product.color_id.color_name}{" "}
                    <span
                      style={{
                        backgroundColor: `${product.color_id.color_code}`,
                        border: "1px solid black",
                      }}
                    >
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                  </h5>
                  <br />
                  <h4>Share</h4>
                  <h5>
                    <FacebookShareButton
                      className="m-1"
                      url={window.location}
                      title={product.product_name}
                    >
                      <FacebookIcon
                        className="rounded-circle"
                        size="50px"
                      ></FacebookIcon>
                    </FacebookShareButton>
                    <TelegramShareButton
                      className="m-1"
                      url={window.location}
                      title={product.product_name}
                    >
                      <TelegramIcon
                        className="rounded-circle"
                        size="50px"
                      ></TelegramIcon>
                    </TelegramShareButton>
                    <WhatsappShareButton
                      className="m-1"
                      url={window.location}
                      title={product.product_name}
                    >
                      <WhatsappIcon
                        className="rounded-circle"
                        size="50px"
                      ></WhatsappIcon>
                    </WhatsappShareButton>
                    <PinterestShareButton
                      className="m-1"
                      url={window.location}
                      title={product.product_name}
                    >
                      <PinterestIcon
                        className="rounded-circle"
                        size="50px"
                      ></PinterestIcon>
                    </PinterestShareButton>
                    <TwitterShareButton
                      className="m-1"
                      url={window.location}
                      title={product.product_name}
                    >
                      <TwitterIcon
                        className="rounded-circle"
                        size="50px"
                      ></TwitterIcon>
                    </TwitterShareButton>
                    <EmailShareButton
                      className="m-1"
                      url={window.location}
                      title={product.product_name}
                    >
                      <EmailIcon
                        className="rounded-circle"
                        size="50px"
                      ></EmailIcon>
                    </EmailShareButton>
                  </h5>
                </div>
                <div>
                  <Button
                    className="me-4 "
                    size="lg"
                    variant="primary"
                    onClick={() => addToCart()}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    className="me-4 "
                    size="lg"
                    variant="warning"
                    onClick={() => rateProduct()}
                  >
                    Rate Product
                  </Button>
                  <br />
                  <br />
                </div>
              </div>
            </Col>
          </Row>
          <Row className="my-4 py-4">
            <div>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <h5>Description</h5>
                  </Accordion.Header>
                  <Accordion.Body>
                    {product.product_description} <br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    <h5>Features</h5>
                  </Accordion.Header>
                  <Accordion.Body>
                    {product.product_description} <br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </Row>
        </Container>
      )}
      {!product && (
        <Container>
          <h2>Products Not Found</h2>
        </Container>
      )}
    </div>
  );
}
