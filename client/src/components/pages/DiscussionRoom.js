import React, { Component } from "react";
import { Container } from "reactstrap";
import axios from "axios";

export class DiscussionRoom extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/posts")
      .then(res => this.setState({ posts: res.data }));
  }

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
            {post.comments.map((comment, c) => (
              <div style={commentStyle} key={c}>
                <p style={cStyle}>{comment.name}</p>
                <p style={cStyle}>{comment.createdAt}</p>
                <p style={cStyle}>{comment.likes}</p>
                <p style={cStyle}>{comment.body}</p>
                {comment.comments.map((cc, cID) => (
                  <div style={ccDivStyle} key={cID}>
                    <p style={ccStyle}>{cc.name}</p>
                    <p style={ccStyle}>{cc.createdAt}</p>
                    <p style={ccStyle}>{cc.likes}</p>
                    <p style={ccStyle}>{cc.body}</p>
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
  marginTop: "10px"
};

const cStyle = {
  margin: "0",
  marginLeft: "50px",
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

export default DiscussionRoom;
