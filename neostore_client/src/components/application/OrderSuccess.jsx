import React, { useState, useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import { ordercomplete } from "../../api";

export default function OrderSuccess() {
  const [order, setOrder] = useState();
  useEffect(() => {
    async function fetchData() {
      try {
        const User = await JSON.parse(localStorage.getItem("profile")).result;
        const Order = await JSON.parse(localStorage.getItem("order"));
        setOrder(Order);
        if (Order) {
          await ordercomplete(Order, User._id);
        }
      } catch (error) {
        console.log(error);
      }
      try {
        localStorage.removeItem("order");
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Container>
        <Card>
          <Card.Body>
            <h2>Order Success</h2>
            <p>{JSON.stringify(order)}</p>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
