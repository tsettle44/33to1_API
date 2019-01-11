import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { withAuth } from "@okta/okta-react";
import "../../styles/body.css";

export default withAuth(
  class Body extends Component {
    state = {
      authenticated: null
    };

    checkAuthentication = async () => {
      const authenticated = await this.props.auth.isAuthenticated();
      if (authenticated !== this.state.authenticated) {
        this.setState({ authenticated });
      }
    };

    async componentDidMount() {
      this.checkAuthentication();
    }

    async componentDidUpdate() {
      this.checkAuthentication();
    }

    login = async () => {
      // Redirect to '/' after login
      this.props.auth.login("/");
    };

    logout = async () => {
      // Redirect to '/' after logout
      this.props.auth.logout("/");
    };

    render() {
      if (this.state.authenticated === null) return null;

      const button = this.state.authenticated ? (
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }} className="center header">
            <Link to="/profile">
              <Button className="btn btn-lg btn-info">My Profile</Button>
            </Link>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }} className="center header">
            <Link to="/sign-up">
              <Button className="margin" color="primary">
                Sign Up
              </Button>
            </Link>
            <Link to="login">
              <Button className="margin" color="success">
                Log in
              </Button>
            </Link>
          </Col>
        </Row>
      );

      return (
        <div className="wrapper">
          <Container className="container">
            <div className="headingWrapper">
              <Row>
                <Col
                  sm="12"
                  md={{ size: 6, offset: 3 }}
                  className="center header"
                >
                  <h1>Welcome to Forum</h1>
                </Col>
              </Row>
              {button}
            </div>
          </Container>
        </div>
      );
    }
  }
);
