import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
// import ProfileDetails from "../components/ProfileDetails";
import axios from "axios";
import { Link } from "react-router-dom";
import TopicListProfile from "./../components/TopicListProfile";
import userService from "../lib/user-service";
import TopicCardProfile from "../components/TopicCardProfile";
import CommentCardProfile from "../components/CommentCardProfile";


class Profile extends Component {
  state = {
    username: "",
    description: "",
    topicsList: [],
    commentsList: [],
    showCard: false
  };

  componentDidMount() {
    console.log('IN COMPONENT DID MOUNT');
    
    // userService
    //   .getMyComments()
    //   .then(data => {
    //     this.setState({ commentsList: data });
    //   })
    //   .catch(err => console.log(err));

    // userService
    //   .getMyTopics()
    //   .then( (data) => {
    //       this.setState({ topicsList: data })
    //   })
    //   .catch( (err) => console.log(err));

    this.getUserData()
  }


  getUserData = () => {

    userService
    .getUserData()
    .then( (data) => {
      const { username, description, topics, comments} = data;
      
        this.setState({
          username,
          description,
          topicsList: topics,
          commentsList: comments,
        })
    })
    .catch( (err) => console.log(err));
  }

  toggleSection = () => {
    let showCommentCard = this.state.showCard
    this.setState({showCard: !showCommentCard})  
  }

  render() {

    const {commentsList} = this.state
    const allMyComments = commentsList.map( element => {

      return <CommentCardProfile key={element._id} user={element.user} message={element.message} />
        // return <div key={element._id}> 
        //     <h3>title: {element.title}</h3>
        //     <p>message: {element.message}</p>
        // </div>
    })

    const { topicsList } = this.state;
    const allMyTopics = topicsList.map( element => {

      return <TopicCardProfile key={element._id} title={element.title} message={element.message} />
        // return <div key={element._id}>
        //             <h3>{element.title}</h3>
        //             <p>{element.message}</p>
        //         </div>
    })

    return (
      <div className="profile-container">

        <div className="profile-data">


          <img src="/Photo Linkedin a envoyer copie.jpg" className='profile-picture' alt="profile picture"/>

          <h2>{this.state.username}</h2>
          <p>{this.state.description}</p>

          <Link to="/profile-edit">
            <button className='edit-btn'>Edit</button>
          </Link>

        </div>

        <div className="separation-profile"></div>

        <div className="fav-section">
          <h1>
            {/* <Link to="/profile/mytopics">My Topics</Link>  */}
            <h2 onClick={() => this.toggleSection()}>TOPICS</h2>
            <Link to="/profile/mycomments">My comments</Link>
          </h1>
          {this.state.showCard ? (
              <div>
                {allMyTopics}
              </div>
            ) : (
              <div>
                {allMyComments}
              </div>
            )
          }
        </div>

      </div>
    );
  }
}

export default withAuth(Profile);
