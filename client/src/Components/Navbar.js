import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from "reactstrap";
import "../styles/navbar.css";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <Router>
        <Navbar color="dark" light expand="md">
          <NavbarBrand>
            <Link to="/">Forum</Link>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem style={NavStyle}>
                <NavLink>
                  <Link to="/discussion-room">Discussion Room</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <Link to="/about">About</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <Link to="/login">
                  <Button className="btn btn-success">Log In</Button>
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </Router>
    );
  }
}

const NavStyle = {
  textDecoration: "none"
}

export default NavBar;