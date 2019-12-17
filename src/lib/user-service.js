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
        
        // return newUser.datar
      })
      .catch( (err) => console.log(err));
  }

  // FROM PROJECT MANAGEMENT
  handleFormSubmit = (event) => {
    event.preventDefault();
    const { title, description } = this.state;
    const { _id } = this.props.theProject;
  
    axios.put(
      `http://localhost:5000/api/projects/${_id}`,
      { title, description }
    )
    .then( () => {
      this.props.getTheProject();						//  <---  hmmm
      this.props.history.push('/projects');    
      // after submitting the form, redirect to '/projects'
    })
     .catch( (err) => console.log(err) )
  }

  // END OF PROJECT MANAGEMENT EXAMPLE











}

const userService = new User();

export default userService
