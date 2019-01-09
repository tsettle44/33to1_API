import React, { Component } from "react";
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from "react-router-dom";
import "../../styles/body.css";

class Body extends Component{
    render() {
        return (
            <div className="wrapper">
                <Container className="container">
                    <div className="headingWrapper">
                        <Row>
                            <Col sm="12" md={{ size: 6, offset: 3 }} className="center header"><h1>Welcome to Forum</h1></Col>
                        </Row>
                        <Row>
                            <Col sm="12" md={{ size: 6, offset: 3 }} className="center header"><h3>Sign in or Log in</h3></Col>
                        </Row>
                        <Row>
                            <Col sm="12" md={{ size: 6, offset: 3 }} className="center header">
                                <Link to="/sign-up">
                                    <Button className="margin" color="primary">Sign Up</Button>
                                </Link>
                                <Link to="login">
                                    <Button className="margin" color="success">Log in</Button>
                                </Link>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        );
    }
}

export default Body;