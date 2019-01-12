import React from "react";
import OktaAuth from "@okta/okta-auth-js";
import { withAuth } from "@okta/okta-react";
import {
  Container,
  Row,
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  Button
} from "reactstrap";

export default withAuth(
  class RegistrationForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        sessionToken: null
      };
      this.oktaAuth = new OktaAuth({
        url: "https://dev-612249.oktapreview.com"
      });
      this.checkAuthentication();
    }

    checkAuthentication = async () => {
      const sessionToken = await this.props.auth.getIdToken();
      if (sessionToken) {
        this.setState({ sessionToken });
      }
    };

    componentDidUpdate() {
      this.checkAuthentication();
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    handleSubmit = e => {
      e.preventDefault();
      fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state)
      })
        .then(user => {
          this.oktaAuth
            .signIn({
              username: this.state.email,
              password: this.state.password
            })
            .then(res =>
              this.setState({
                sessionToken: res.sessionToken
              })
            );
        })
        .catch(err => console.log);
    };

    render() {
      if (this.state.sessionToken) {
        this.props.auth.redirect({ sessionToken: this.state.sessionToken });
        return null;
      }

      return (
        <Container>
          <Row style={rowStyle}>
            <Col style={colStyle} sm="12" md={{ size: 6, offset: 3 }}>
              <Form onSubmit={this.handleSubmit} style={formStlye}>
                <FormGroup row>
                  <Label for="firstName" sm={4}>
                    First Name
                  </Label>
                  <Col sm={8}>
                    <Input
                      onChange={this.onChange}
                      type="text"
                      value={this.state.firstName}
                      name="firstName"
                      id="firstName"
                      placeholder="First Name"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="lastName" sm={4}>
                    Last Name
                  </Label>
                  <Col sm={8}>
                    <Input
                      onChange={this.onChange}
                      type="text"
                      value={this.state.lastName}
                      name="lastName"
                      id="lastName"
                      placeholder="Last Name"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="email" sm={4}>
                    Email
                  </Label>
                  <Col sm={8}>
                    <Input
                      onChange={this.onChange}
                      name="email"
                      value={this.state.email}
                      type="email"
                      id="email"
                      placeholder="Email"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="password" sm={4}>
                    Password
                  </Label>
                  <Col sm={8}>
                    <Input
                      onChange={this.onChange}
                      name="password"
                      value={this.state.password}
                      type="password"
                      id="password"
                      placeholder="Password"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="confirmPassword" sm={4}>
                    Confirm Password
                  </Label>
                  <Col sm={8}>
                    <Input
                      onChange={this.onChange}
                      name="confirmPassword"
                      value={this.state.confirmPassword}
                      type="password"
                      id="confirmPassword"
                      placeholder="Confirm Password"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Button
                    type="submit"
                    value="Register"
                    className="btn btn-info"
                  >
                    Sign Up
                  </Button>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Container>
      );
    }
  }
);

const rowStyle = {
  marginTop: "100px"
};

const colStyle = {
  border: "1px solid grey",
  borderRadius: "5px",
  backgroundColor: "#f2f2f2"
};

const formStlye = {
  padding: "20px"
};
