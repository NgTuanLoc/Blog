import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Post from "../../../components/Post/Post";
import FullPost from "../FullPost/FullPost";
import { Route } from "react-router-dom";
import "./Posts.css";

class Posts extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: false,
  };

  postSelectedHandler = (id) => {
    // this.setState({ selectedPostId: id });
    this.props.history.push("/posts/" + id);
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
          <Link to={"/posts/" + post.id} key={post.id}>
            <Post
              title={post.title}
              author={post.author}
              clicked={() => this.postSelectedHandler(post.id)}
            />
          </Link>
        );
      });
    }
    return (
      <div>
        <section className="Posts">{posts}</section>
        <Route path={this.props.match.url + "/:id"} component={FullPost} />
      </div>
    );
  }
}

export default Posts;
