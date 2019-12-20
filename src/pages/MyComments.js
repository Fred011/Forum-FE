import React, { Component } from "react";
import { Link } from "react-router-dom";
import commentService from "../lib/comment-service";
import CommentCard from "../components/CommentCard";
import Navbar from "../components/Navbar";

export default class MyComments extends Component {
  state = {
    listOfComments: []
  };

  componentDidMount() {
    commentService
      .getMyComments()
      .then(data => {
        this.setState({ listOfComments: data });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { listOfComments } = this.state;
    
    const allMyComments = listOfComments.map((element, i) => {
      return <CommentCard message={element.message} id={element._id} key={i} />;
    });
    return (
      <div className="testcards">
        <Navbar />
        <div className="big-topic-container">
          <div>
            {listOfComments ? (
              <div>{allMyComments}</div>
            ) : (
              <h1>Loading...</h1>
            )}
          </div>
        </div>
      </div>
    );
  }
}
