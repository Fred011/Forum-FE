import axios from 'axios';

class Comment {
  constructor() {
    this.comment = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true,
    });
  }

  getMyComments = () => {
    return this.comment.get(process.env.REACT_APP_API_URL + '/mycomments')
      .then( (response) => {
        return response.data
      })
      .catch( (err) => console.log(err));
  }

}

const commentService = new Comment();

export default commentService
