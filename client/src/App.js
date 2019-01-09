import React, { Component } from "react";
import NavBar from "./components/Navbar";
import Body from "./components/Body";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar></NavBar>
        <Body></Body>
      </div>
    );
  }
}

export default App;