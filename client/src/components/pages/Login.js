import React, { Component } from 'react'
import { Container, Row, Form, FormGroup, Label, Col, Input, Button } from 'reactstrap';

export class Login extends Component {
  render() {
    return (
        <Container>
            <Row style={rowStyle}>
                <Col style={colStyle} sm="12" md={{ size: 6, offset: 3 }}>
                    <Form style={formStlye}>
                        <FormGroup row>
                            <Label for="email" sm={4}>Email</Label>
                            <Col sm={8}>
                                <Input type="email" id="email" placeholder="Email" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="password" sm={4}>Password</Label>
                            <Col sm={8}>
                                <Input type="password" id="password" placeholder="Password" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Button className="btn btn-success">Login</Button>
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

export default Login
