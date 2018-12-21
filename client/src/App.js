import React, { Component } from "react";
import NavBar from "./Components/Navbar";
import Body from "./Components/Body";

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