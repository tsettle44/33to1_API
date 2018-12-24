import React, { Component } from "react";
import { Container, Row, Col, Button } from 'reactstrap';
import "../styles/body.css";
import axios from "axios";

class Body extends Component{
    render() {
        return (
            <div className="wrapper">
                <Container className="container">
                    <div className="headingWrapper">
                        <Row>
                            <Col sm="12" md={{ size: 6, offset: 3 }} className="center header"><h1>Welcome to 33TO1</h1></Col>
                        </Row>
                        <Row>
                            <Col sm="12" md={{ size: 6, offset: 3 }} className="center header"><h3>Sign in or Log in</h3></Col>
                        </Row>
                        <Row>
                            <Col sm="12" md={{ size: 6, offset: 3 }} className="center header">
                                <Button className="margin" color="primary">Sign Up</Button>
                                <Button className="margin" color="success">Log in</Button>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        );
    }
}

export default Body;