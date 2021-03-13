import React, { Component } from "react";
import axios from "axios";
import Post from '../../../components/Post/Post'
import './Posts.css'

class Posts extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: false,
  };

  postSelectedHandler = (id) => {
    this.setState({ selectedPostId: id });
  };

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        const posts = response.data.splice(0, 4);
        const updatedPosts = posts.map((post) => {
          return { ...post, author: "NgTuanLoc" };
        });
        this.setState({
          posts: updatedPosts,
        });
      })
      .catch((response) => {
        this.setState({
          error: true,
        });
        console.log(response);
      });
  }
  render() {
    let posts = <p>Something went wrong !!! </p>;
    if (!this.state.error) {
      posts = this.state.posts.map((post) => {
        return (
          <Post
            title={post.title}
            key={post.id}
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)}
          />
        );
      });
    }
    return <section className="Posts">{posts}</section>;
  }
}

export default Posts;
