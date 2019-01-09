import React, { Component } from 'react'
import axios from 'axios';

export class DiscussionRoom extends Component {

    state = {
        posts: []
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/posts')
        .then(res => this.setState({ posts: res.data }))
    }

    render() {
        return (
            <div>
            <h1>Discussion Room</h1>
            </div>
        )
    }
}

export default DiscussionRoom
