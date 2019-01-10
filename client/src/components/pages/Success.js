import React, { Component } from 'react'
import { Container, Row, Col, Alert } from 'reactstrap';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export class Success extends Component {
  render() {
    return (
      <Container>
          <Row>
              <Col style={{textAlign: "center", padding: "50px"}}>
                <FontAwesomeIcon style={{fontSize: "200px", color: "green"}} icon={faCheckCircle} />
                <Alert style={{margin: "30px"}} color="success">Success, you have offically signed up</Alert>
                <p>Take me back <Link to="/">home</Link></p>
              </Col>
          </Row>
      </Container>
    )
  }
}

export default Success
