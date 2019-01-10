import React, { Component } from 'react'
import { Container, Row, Form, FormGroup, Label, Col, Input, Button } from 'reactstrap';
import  { Redirect } from 'react-router-dom'
import axios from 'axios';

export class SignUp extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    SignUp = (e) => {
        e.preventDefault();
        
        const { firstName, lastName, email, password, confirmPassword } = this.state
        
        if(password !== this.state.confirmPassword) {
            console.log("Passwords do not match")
        } else {
            axios.post('http://localhost:5000/api/users', {
                firstName,
                lastName,
                email,
                password, 
                confirmPassword
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

    onChange = (e) => this.setState({ [e.target.name] : e.target.value });

    render() {
    return (
        <Container>
            <Row style={rowStyle}>
                <Col style={colStyle} sm="12" md={{ size: 6, offset: 3 }}>
                    <Form onSubmit={this.SignUp} style={formStlye}>
                        <FormGroup row>
                            <Label for="firstName" sm={4}>First Name</Label>
                            <Col sm={8}>
                                <Input onChange={this.onChange} name="firstName" id="firstName" placeholder="First Name" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="lastName" sm={4}>Last Name</Label>
                            <Col sm={8}>
                                <Input onChange={this.onChange} name="lastName" id="lastName" placeholder="Last Name" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="email" sm={4}>Email</Label>
                            <Col sm={8}>
                                <Input onChange={this.onChange} name="email" type="email" id="email" placeholder="Email" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="password" sm={4}>Password</Label>
                            <Col sm={8}>
                                <Input onChange={this.onChange} name="password" type="password" id="password" placeholder="Password" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="confirmPassword" sm={4}>Confirm Password</Label>
                            <Col sm={8}>
                                <Input onChange={this.onChange} name="confirmPassword" type="password" id="confirmPassword" placeholder="Confirm Password" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Button className="btn btn-info">Sign Up</Button>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
    }
}

const rowStyle = {
    marginTop: '100px'
}

const colStyle = {
    border: '1px solid grey',
    borderRadius: '5px',
    backgroundColor: '#f2f2f2'
}

const formStlye = {
    padding: '20px'
}

export default SignUp
