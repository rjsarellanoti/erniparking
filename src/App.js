import logo from './logo.svg';
import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import pgiImage from './assets/images/pgi.jpg'







function App() {
  return (
    

    <Container>
      
      <Row>

      <Col md={4} className="my-2">
               <Card style={{ width: '40%', margin: '10px', }}>
                <Card.Img variant="top" src={pgiImage} />
                <Card.Body>
                <Card.Title>Gate 1</Card.Title>
                  <Card.Text>
                    Click to Enter gate 1
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
        </Col>


        <Col md={4} className="my-2">
              <Card style={{ width: '40%', margin: '10px' }}>
                <Card.Img variant="top" src={pgiImage} />
                <Card.Body>
                <Card.Title>Gate 2</Card.Title>
                  <Card.Text>
                    Click to Enter gate 2
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
        </Col>


        <Col md={4} className="my-2">
              <Card style={{ width: '40%', margin: '10px' }}>
                <Card.Img variant="top" src={pgiImage} />
                <Card.Body>
                  <Card.Title>Gate 3</Card.Title>
                  <Card.Text>
                    Click to Enter gate 3
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
        </Col>
        
        </Row>
        </Container>
  );
}

export default App;
