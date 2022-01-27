import React from "react";
import { Card, Container } from "react-bootstrap";

export default function NotFound() {
  return (
    <div>
      <Container style={{ marginTop: "100px", marginBottom: "250px" }}>
        <Card className="m-4">
          <Card.Body>
            <h2>404 - Page Not Found</h2>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
