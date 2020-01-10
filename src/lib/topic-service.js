import axios from "axios";

class Topic {
  constructor() {
    this.topic = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true
    });
  }

  getAllTopics = () => {
    return this.topic
      .get(process.env.REACT_APP_API_URL + "/home")
      .then(response => {
        return response.data;
      })
      .catch(err => console.log(err));
  };

  getOneTopic = id => {
    return this.topic
      .get(process.env.REACT_APP_API_URL + `/topics/${id}`)
      .then(response => {
        return response.data;
      })
      .catch(err => console.log(err));
  };

  getMyTopics = () => {
    return this.topic
      .get(process.env.REACT_APP_API_URL + "/mytopics")
      .then(response => {
        return response.data;
      })
      .catch(err => console.log(err));
  };

  getUserTopic = id => {
    return this.topic
      .get(process.env.REACT_APP_API_URL + `/mytopics/${id}`)
      .then(response => {
        return response.data;
      })
      .catch(err => console.log(err));
  };

  addTopic = topic => {
    return this.topic
      .post(process.env.REACT_APP_API_URL + `/addtopic`, topic)
      .then(response => {
        return response.data;
      })
      .catch(err => console.log(err));
  };

  addVote = id => {
    return this.topic
      .put(process.env.REACT_APP_API_URL + `/topic/${id}/vote`)
      .then(response => {
        return response.data;
      })
      .catch(err => console.log(err));
  };

  downVote = id => {
    return this.topic
      .put(process.env.REACT_APP_API_URL + `/topic/${id}/downvote`)
      .then(response => {
        return response.data;
      })
      .catch(err => console.log(err));
  };

  deleteOneTopic = id => {
    return this.topic
      .delete(process.env.REACT_APP_API_URL + `/mytopics/${id}/delete`)
      .then(response => {
        return response.data;
      })
      .catch(err => console.log(err));
  };
}

const topicService = new Topic();

export default topicService;
