import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css'
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import EditProfile from './components/EditProfile';
import Navbar from './components/Navbar';
import TopicDetails from './components/TopicDetails'

import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';
import NewTopic from './pages/NewTopic';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        {/* <h1>Basic React Authentication</h1> */}
        <Switch>
          <AnonRoute exact path="/signup" component={Signup} />
          <AnonRoute exact path="/login" component={Login} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/profile/edit" component={EditProfile} />
          <PrivateRoute exact path="/addtopic" component={NewTopic} />
          <PrivateRoute exact path="/topics/:id" component={TopicDetails} />
          <PrivateRoute exact path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
