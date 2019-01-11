import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from '@okta/okta-react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Button
} from "reactstrap";

export default withAuth(class NavBar extends Component {

  state = {
    isOpen: false,
    authenticated: null
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  checkAuthentication = async() => {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  async componentDidMount() {
    this.checkAuthentication();
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  login = async() => {
    // Redirect to '/' after login
    this.props.auth.login('/');
  }

  logout = async() => {
    // Redirect to '/' after logout
    this.props.auth.logout('/');
  }

  render() {
    if (this.state.authenticated === null) return null;

    const button = this.state.authenticated ? 
    <Button onClick={this.logout} className="btn btn-danger">Log Out</Button> :
    <Button onClick={this.login} className="btn btn-success">Log In</Button>;

    return (
        <Navbar color="dark" light expand="md">
          <Link style={NavStyle} to="/">Forum</Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem style={center}>
                  <Link style={NavStyle} to="/discussion-room">Discussion Room</Link>
              </NavItem>
              <NavItem style={center}>
                  <Link style={NavStyle} to="/about">About</Link>
              </NavItem>
              <NavItem style={center}>
                  <Link style={NavStyle} to="/profile">Profile</Link>
              </NavItem>
              {button}
            </Nav>
          </Collapse>
        </Navbar>
    );
  }
});

const NavStyle = {
  textDecoration: 'none',
  color: '#fff',
  paddingRight: '15px',
}

const center = {
  paddingTop: '7px',
}

