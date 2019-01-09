import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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
import axios from "axios";

const Index = () => <p>Forum</p>;
const DiscussionRoom = () => <p>Discussion Room</p>
const About = () => <p>About</p>;
const Login = () => <p>Login</p>;

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
        <Navbar color="light" light expand="md">
          <NavbarBrand>
            <Link to="/">Forum</Link>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/discussion-room">Discussion Room</Link>
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

          <Route path="/" exact component={Index} />
          <Route path="/discussion-room/" component={DiscussionRoom} />
          <Route path="/about/" component={About} />
          <Route path="/login/" component={Login} />
        </Navbar>
      </Router>
    );
  }
}

export default NavBar;