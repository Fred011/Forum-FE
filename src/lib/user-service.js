import axios from "axios";

class User {
  constructor() {
    this.user = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true
    });
  }

  getMyComments() {
    return this.user
      .get("/mycomments")
      .then(response => {
        return response.data;
      })
      .catch(err => console.log(err));
  }

  getMyTopics() {
    return this.user
      .get(process.env.REACT_APP_API_URL + "/mytopics")
      .then(response => {
        return response.data;
      })
      .catch(err => console.log(err));
  }

  getUserData() {
    return this.user
      .get(process.env.REACT_APP_API_URL + "/profile")
      .then(user => {
        return user.data;
      })
      .catch(err => console.log(err));
  }

  updateUserData(newUser) {
    return this.user
      .put(process.env.REACT_APP_API_URL + "/profile/edit", newUser)
      .then(res => {
        return res.data;
      })
      .catch(err => console.log(err));
  }

  addFavorites(id) {
    return this.user
      .patch(process.env.REACT_APP_API_URL + `/favorites/add/${id}`)
      .then(response => {
        return response.data;
      })
      .catch(err => console.log(err));
  }

  removeFavorites(id) {
    return this.user
      .patch(process.env.REACT_APP_API_URL + `/topics/${id}/remove`)
      .then(response => {
        return response.data;
      })
      .catch(err => console.log(err));
  }

  getFavorites() {
    return this.user
      .get("/favorites")
      .then(response => {
        return response.data;
      })
      .catch(err => console.log(err));
  }

  deleteUser(id) {
    return this.user
      .delete(process.env.REACT_APP_API_URL + `/profile`, id)
      .then(response => {
        console.log(response)
      })
      .catch(err => console.log(err));
  }
}

const userService = new User();

export default userService;
