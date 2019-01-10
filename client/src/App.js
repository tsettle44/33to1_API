import React, { Component } from "react";
import NavBar from "./components/layout/Navbar";
import Body from "./components/layout/Body";
import About from "./components/pages/About";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from "./components/pages/SignUp";
import Login from "./components/pages/Login";
import DiscussionRoom from "./components/pages/DiscussionRoom";
import Success from "./components/pages/Success";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Route exact path="/" component={Body}></Route>
          <Route path="/about" component={About}></Route>
          <Route path="/discussion-room" component={DiscussionRoom}></Route>
          <Route path="/sign-up" component={SignUp}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/sign-up/success" component={Success}></Route>
        </div>
      </Router>
    );
  }
}

export default App;