import React, { Component } from "react";
import NavBar from "./components/layout/Navbar";
import Body from "./components/layout/Body";
import About from "./components/pages/About";
import { BrowserRouter as Router, Route,  } from "react-router-dom";
import SignUp from "./components/pages/SignUp";
import Login from "./components/pages/Login";
import DiscussionRoom from "./components/pages/DiscussionRoom";
import Success from "./components/pages/Success";
import axios from "axios";

class App extends Component {

  state = {
    authed: false,
  }

  SignUp = (state) => {
    
    const { firstName, lastName, email, password, confirmPassword } = state;

    const self = this;
    
    if(password !== confirmPassword) {
        console.log("Passwords do not match")
    } else {
        axios.post('http://localhost:5000/api/test/users', {
            firstName,
            lastName,
            email,
            password, 
            confirmPassword
        })
        .then(function (response) {
            console.log(response);
            self.setState({authed: true});
            //window.location = '/sign-up/success';
        })
        .catch(function (error) {
            console.log(error);
        });
    }
  } 

  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Route exact path="/" component={Body}></Route>
          <Route path="/about" component={About}></Route>
          <Route path="/discussion-room" component={DiscussionRoom}></Route>
          <Route exact path="/sign-up" render={(props) => <SignUp {...props} SignUp={this.SignUp} /> } />
          <Route path="/login" component={Login}></Route>
          <Route path="/sign-up/success" component={Success} />
        </div>
      </Router>
    );
  }
}

export default App;