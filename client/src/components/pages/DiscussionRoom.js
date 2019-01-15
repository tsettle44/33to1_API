import React, { Component } from "react";
import {
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  FormGroup
} from "reactstrap";
import axios from "axios";

export class DiscussionRoom extends Component {
  state = {
    posts: [],
    modal: false,
    backdrop: "static",
    ids: [],
    name: "",
    body: ""
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/posts")
      .then(res => this.setState({ posts: res.data }));
  }

  toggle = (p, c) => {
    this.setState({
      modal: !this.state.modal,
      ids: { p, c }
    });
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  reply = id => {
    if (id.p && id.c) {
      axios
        .post(
          "http://localhost:5000/api/posts/" + id.p + "/" + id.c + "/comment",
          {
            name: this.state.name,
            body: this.state.body
          }
        )
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
      window.location.reload();
    } else {
      axios
        .post("http://localhost:5000/api/posts/" + id.p + "/comment", {
          name: this.state.name,
          body: this.state.body
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
      window.location.reload();
    }
  };

  render() {
    return (
      <Container>
        {this.state.posts.map((post, i) => (
          <div style={postStyle} key={i}>
            <h3 style={pNameStyle}>
              {post.name} at {post.createdAt}
            </h3>
            <h5 style={pLikesStyle}>{post.likes}</h5>
            <h5>{post.body}</h5>
            <Button onClick={() => this.toggle(post._id)}>Reply</Button>
            {post.comments.map((comment, c) => (
              <div style={commentStyle} key={c}>
                <p style={cNameStyle}>
                  {comment.name} at {comment.createdAt}
                </p>
                <p style={cLikesStyle}>{comment.likes}</p>
                <p style={cStyle}>{comment.body}</p>
                <Button onClick={() => this.toggle(post._id, comment._id)}>
                  Reply
                </Button>
                {comment.comments.map((cc, cID) => (
                  <div style={ccDivStyle} key={cID}>
                    <p style={ccNameStyle}>
                      {cc.name} at {cc.createdAt}
                    </p>
                    <p style={ccLikesStyle}>{cc.likes}</p>
                    <p style={ccStyle}>{cc.body}</p>
                    <Modal
                      isOpen={this.state.modal}
                      toggle={this.toggle}
                      className={this.props.className}
                      backdrop={this.state.backdrop}
                    >
                      <ModalHeader toggle={this.toggle}>Reply</ModalHeader>
                      <ModalBody>
                        <FormGroup>
                          <Label for="name">Name</Label>
                          <Input
                            onChange={this.handleChange}
                            type="text"
                            name="name"
                            id="name"
                          />
                          <Label for="body">Reply</Label>
                          <Input
                            onChange={this.handleChange}
                            type="textarea"
                            name="body"
                            id="body"
                          />
                        </FormGroup>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="success"
                          onClick={() => this.reply(this.state.ids)}
                        >
                          Submit
                        </Button>{" "}
                        <Button color="danger" onClick={this.toggle}>
                          Cancel
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </Container>
    );
  }
}

const postStyle = {
  padding: "20px",
  marginTop: "20px"
};

const pNameStyle = {
  display: "inline"
};

const pLikesStyle = {
  display: "inline",
  float: "right"
};

const commentStyle = {
  padding: "10px",
  marginTop: "10px",
  marginLeft: "50px"
};

const cStyle = {
  margin: "0",
  padding: "0"
};

const ccDivStyle = {
  padding: "10px",
  marginTop: "10px"
};

const ccStyle = {
  margin: "0",
  marginLeft: "100px",
  padding: "0"
};

const ccNameStyle = {
  display: "inline",
  margin: "0",
  marginLeft: "100px",
  padding: "0",
  fontWeight: "bold"
};

const ccLikesStyle = {
  display: "inline",
  float: "right",
  fontWeight: "bold"
};

const cNameStyle = {
  display: "inline",
  margin: "0",
  padding: "0",
  fontWeight: "bold"
};

const cLikesStyle = {
  display: "inline",
  float: "right",
  fontWeight: "bold"
};

export default DiscussionRoom;
