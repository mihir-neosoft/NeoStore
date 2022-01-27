import React, { useState, useEffect } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { getuser } from "../../../api";
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [alertmsg, setAlertmsg] = useState(false);
  const User = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    if (!User) setAlertmsg(true);
    async function fetchData() {
      try {
        const { data } = await getuser(User.result._id);
        // setUser(data);
        console.log(data.orders);
        setOrders(data.orders);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

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
      <Card>
        <Card.Body>
          <Card.Title>
            <h3>Orders</h3>
          </Card.Title>
          <hr />
          {orders &&
            orders.map((order) => (
              <Card key={order.order_id}>
                <Card.Body>
                  <h6>
                    Order Status:&nbsp;
                    <span style={{ color: "orange" }}>
                      {order.order_status}
                    </span>{" "}
                    | Order Number: {order.order_id}
                  </h6>
                  <p>
                    Placed on: {order.order_date.slice(4, 24)} , Order Amount:
                    <span style={{ color: "green" }}> ${order.ordertotal}</span>
                  </p>
                  <hr />
                  {order.cart.map((product, index) => (
                    <img
                      key={index}
                      src={`/Neostore_Images/${product.category_name}/${product.product_name}/${product.product_image}`}
                      alt={product.product_name}
                      height={"100px"}
                      width={"100px"}
                      className="mx-2"
                      style={{ border: "1px solid black" }}
                    />
                  ))}
                  <hr />
                  <div className="text-end">
                    <Button
                      className="mx-2"
                      onClick={() => console.log(order._id)}
                    >
                      View Order
                    </Button>
                    <Button
                      className="mx-2"
                      onClick={() => console.log(order._id)}
                    >
                      Download Invoice as PDF
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
        </Card.Body>
      </Card>
    </div>
  );
}
