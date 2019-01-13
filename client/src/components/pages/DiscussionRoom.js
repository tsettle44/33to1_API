import React, { Component } from "react";
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
      <div>
        {this.state.posts.map((post, i) => (
          <div key={i}>
            <h3>{post.body}</h3>
            <h5>{post.createdAt}</h5>
            <h5>{post.likes}</h5>
            <h5>{post.name}</h5>
            {post.comments.map((comment, c) => (
              <div key={c}>
                <li>{comment.name}</li>
                <li>{comment.createdAt}</li>
                <li>{comment.body}</li>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default DiscussionRoom;
