import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Button
} from "reactstrap";

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
                <Link to="/login">
                  <Button className="btn btn-success">Log In</Button>
                </Link>
            </Nav>
          </Collapse>
        </Navbar>
    );
  }
}

const NavStyle = {
  textDecoration: 'none',
  color: '#fff',
  paddingRight: '15px',
}

const center = {
  paddingTop: '7px',
}


export default NavBar;