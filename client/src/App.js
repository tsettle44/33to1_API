import React, { Component } from "react";
import NavBar from "./components/layout/Navbar";
import Body from "./components/layout/Body";
import About from "./components/pages/About";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from "./components/pages/SignUp";
import Login from "./components/auth/Login";
import DiscussionRoom from "./components/pages/DiscussionRoom";
import axios from "axios";
import Profile from "./components/pages/Profile";
import { Security, ImplicitCallback } from '@okta/okta-react'

const config = {
  issuer: 'https://dev-612249.oktapreview.com/oauth2/default',
  redirect_uri: window.location.origin + '/implicit/callback',
  client_id: '0oaiwik3abIBUoTca0h7'
}

function onAuthRequired({ history }) {
  history.push('/login');
}

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
        <Security issuer={config.issuer}
                  client_id={config.client_id}
                  redirect_uri={config.redirect_uri}
                  onAuthRequired={onAuthRequired}
        >
          <div>
            <NavBar />
            <Route exact path="/" component={Body}></Route>
            <Route path="/about" component={About}></Route>
            <Route path="/discussion-room" component={DiscussionRoom}></Route>
            <Route exact path="/sign-up" render={(props) => <SignUp {...props} SignUp={this.SignUp} /> } />
            <Route 
              path="/login" 
              render={() => (
                    <Login baseUrl="https://dev-612249.oktapreview.com" />
                  )}>
            </Route>
            <Route path='/implicit/callback' component={ImplicitCallback}/>
          </div>
        </Security>
      </Router>
    );
  }
}

export default App;