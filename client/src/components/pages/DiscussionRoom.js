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
  FormGroup,
  Jumbotron
} from "reactstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

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
    console.log(p, c);
    this.setState({
      modal: !this.state.modal,
      ids: { p, c }
    });
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  post = () => {
    axios
      .post("http://localhost:5000/api/posts", {
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
  };

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

  like = (p, c, cc) => {
    if (p && c && cc) {
      axios
        .post(
          "http://localhost:5000/api/posts/" + p + "/" + c + "/" + cc + "/like"
        )
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
      window.location.reload();
    } else if (p && c) {
      axios
        .post("http://localhost:5000/api/posts/" + p + "/" + c + "/like")
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
      window.location.reload();
    } else {
      axios
        .post("http://localhost:5000/api/posts/" + p + "/like")
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
        <h1 className="display-3">33to1 Discussion Board</h1>
        <p className="lead">
          We’ve noticed everyone has taken a liking to talking about the race.
          So we’re giving you a place to do that, and just that. Feel free to
          use this area to discuss anything and everything about the Little 500
          — Qualifications, Spring Series, the race itself.
        </p>
        <hr className="my-2" />
        <p>
          Please, no character attacks. Trash-talking is great, but slandering
          people isn’t. Let’s keep it clean. Or your post will be deleted.
        </p>
        <Jumbotron
          style={{
            marginTop: "15px",
            paddingTop: "10px",
            paddingBottom: "10px"
          }}
        >
          <FormGroup>
            <h3>Post on the Board</h3>
            <Label for="name">Name</Label>
            <Input
              onChange={this.handleChange}
              type="text"
              name="name"
              id="name"
            />
            <Label for="body">Post</Label>
            <Input
              onChange={this.handleChange}
              type="textarea"
              name="body"
              id="body"
            />
            <Button
              style={{ marginTop: "15px" }}
              onClick={this.post}
              color="success"
            >
              Submit
            </Button>
          </FormGroup>
        </Jumbotron>
        {this.state.posts.map((post, i) => (
          <div style={postStyle} key={i}>
            <h3 style={pNameStyle}>
              {post.name} at {post.createdAt}
            </h3>
            <p style={pLikesStyle}>{post.likes}</p>
            <FontAwesomeIcon
              onClick={() => {
                this.like(post._id);
              }}
              icon={faHeart}
              style={iconHeart}
            />
            <h5>{post.body}</h5>
            <Button style={replyBtn} onClick={() => this.toggle(post._id)}>
              Reply
            </Button>
            {post.comments.map((comment, c) => (
              <div style={commentStyle} key={c}>
                <p style={cNameStyle}>
                  {comment.name} at {comment.createdAt}
                </p>
                <p style={cLikesStyle}>{comment.likes}</p>
                <FontAwesomeIcon
                  onClick={() => {
                    this.like(post._id, comment._id);
                  }}
                  icon={faHeart}
                  style={iconHeart}
                />
                <p style={cStyle}>{comment.body}</p>
                <Button
                  style={replyBtn}
                  onClick={() => this.toggle(post._id, comment._id)}
                >
                  Reply
                </Button>
                {comment.comments.map((cc, cID) => (
                  <div style={ccDivStyle} key={cID}>
                    <p style={ccNameStyle}>
                      {cc.name} at {cc.createdAt}
                    </p>
                    <p style={ccLikesStyle}>{cc.likes}</p>
                    <FontAwesomeIcon
                      onClick={() => {
                        this.like(post._id, comment._id, cc._id);
                      }}
                      icon={faHeart}
                      style={iconHeart}
                    />
                    <p style={ccStyle}>{cc.body}</p>
                    <Button
                      style={replyBtn}
                      onClick={() => this.toggle(post._id, comment._id)}
                    >
                      Reply
                    </Button>
                  </div>
                ))}
              </div>
            ))}
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
      </Container>
    );
  }
}

const postStyle = {
  padding: "20px",
  marginTop: "20px",
  border: "2px #ededed solid",
  borderRadius: "5px"
};

const pNameStyle = {
  display: "inline"
};

const pLikesStyle = {
  display: "inline",
  float: "right"
};

const iconHeart = {
  color: "red",
  display: "inline",
  float: "right",
  fontSize: "1.5rem",
  marginRight: "10px"
};

const replyBtn = {
  border: "none"
};

const commentStyle = {
  padding: "10px",
  marginTop: "10px",
  marginLeft: "10px",
  borderLeft: "2px #ededed solid",
  borderRight: "2px #ededed solid"
};

const cStyle = {
  margin: "0",
  padding: "0"
};

const ccDivStyle = {
  padding: "10px",
  marginTop: "10px",
  marginLeft: "20px",
  borderLeft: "2px #ededed solid",
  borderRight: "2px #ededed solid"
};

const ccStyle = {
  margin: "0",
  padding: "0"
};

const ccNameStyle = {
  display: "inline",
  margin: "0",
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
