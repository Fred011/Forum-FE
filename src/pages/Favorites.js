import React, { Component } from "react";
import TopicCard from "../components/TopicCard";
import { withAuth } from "../lib/AuthProvider";
import userService from "../lib/user-service";
import Navbar from "../components/Navbar";

export class Favorites extends Component {
  state = {
    favoritesList: []
  };

  componentDidMount() {
    userService
      .getFavorites()
      .then(response => {
        this.setState({ favoritesList: response });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { favoritesList } = this.state;
    const allFavorites = favoritesList.map((element, i) => {
      return (
        <TopicCard
          title={element.title}
          creator={element.creator}
          description={element.message}
          comments={element.comments}
          upvote={element.upVote}
          date={element.created_at} // not working
          id={element._id}
          key={i}
        />
      );
    });

    return (
      <div className="testcards">
        <Navbar />
        <div className="big-topic-container">
          <div className="favorites-section">
            <h1 className="favorites-title">Favorites</h1>
            <div className="active"></div>
            {favoritesList ? (
              <div className="last-favorites-added">{allFavorites}</div>
            ) : (
              <h1>Loading...</h1>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Favorites);
