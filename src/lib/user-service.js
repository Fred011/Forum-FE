import axios from 'axios';

class User {
  constructor() {
    this.user = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true,
    });
  }

  getMyComments() {
    return this.user.get('/mycomments')
      .then(response => {
        console.log('my comments', response.data);
        return response.data
    })
    .catch( (err) => console.log(err));
  }
  
  getMyTopics() {
    return this.user.get('/mytopics').then(response => {
      console.log('my topics', response.data);
      return response.data
    })
    .catch( (err) => console.log(err));
  }

  getUserData() {
    return this.user.get('/profile')
      .then( (user) => {
        console.log(user.data)
        return user.data
      })
      .catch( (err) => console.log(err))
  }

  updateUserData(newUser) {
    return this.user.put('profile/edit', newUser)
      .then( (res) => {
        console.log('resssssssss', res.data);
        
        return res.data
      })
      .catch( (err) => console.log(err));
  }
 


}

const userService = new User();

export default userService
