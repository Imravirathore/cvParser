
import React, { useState, useRef, useEffect } from "react";


// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col
} from "react-bootstrap";

function Dashboard() {
  const [loading, setLoading] = useState(false);

  // Pro Plan
  function proPlan()
  {
    let store = JSON.parse(localStorage.getItem("login"));
    let authToken = store.token;

const url = 'http://127.0.0.1:8000/pro'; // Replace with your API endpoint
const accessToken = authToken;
const data = {
  planname: 'Pro'
};

const requestOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  },
  body: JSON.stringify(data)
};

setLoading(true); // Start loader

fetch(url, requestOptions)
.then(response => response.json())
.then(data => {
  const responseURL = data.url;
  if (responseURL) {
    setTimeout(() => {
      setLoading(false); // Stop loader after 5 seconds
      window.open(responseURL, '_blank');
    }, 2000);
  }
})
.catch(error => {
  console.error('Error:', error);
  setLoading(false); // Stop loader if there's an error
});
}

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
          <Button onClick={proPlan} variant="success" disabled={loading}>
          {loading ? "Please wait..." : "Buy Pro Plan"}
        </Button>{' '}
        
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
