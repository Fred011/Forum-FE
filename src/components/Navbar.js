import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';
 

// height: 900px; width: 50px; position: absolute; for the CSS
// style={{ borderRadius: '5px', padding: '20px', background: '#686de0', height: '50px' }}

class Navbar extends Component {
  render() {
    const { user, logout, isLoggedin, profile, addTopic } = this.props;
    return (
      <div className='navbar'>
        {isLoggedin ? (
          <div className='navbar-container'>
            {/* <p>username: {user.username}</p> */}

            <div className='nav-btn'>
              <Link to='/'>
                <img src="/home.svg" alt="home-section" />
              </Link>
            </div>

            <div className='nav-btn'>
              <Link to='/profile'>
                <img src="/profile.svg" alt="profile-section" onClick={profile} />
                {/* <img src='./public/profile.svg' onClick={profile} /> */}
                {/* <button onClick={profile}>Profile</button> */}
              </Link>
            </div>

            <div className='nav-btn'>
              <Link to='/favorites'>
                <img src="/favorites.svg" alt="favorites-section" />
              </Link>
            </div>

            <div className='nav-btn'>
              <Link to='/mytopics'>
                <img src="/mytopics.svg" alt="mytopics-section" />
              </Link>
            </div>

            <div className='nav-btn'>
              <Link to='/addtopic'>
                <img src="/create.svg" alt="create a topic" onClick={addTopic} />
                {/* <button onClick={addTopic}>New Topic</button> */}
              </Link>
            </div>

            <div className="logout-nav">
              <div className='nav-btn'>
                <img src="/logout.svg" alt="log out" onClick={logout} />
                {/* <button onClick={logout}>Logout</button> */}
              </div>
            </div>

          </div>
        ) : (
          <div>
            <Link to="/login">
              {' '}
              <button>Login</button>{' '}
            </Link>
            <br />
            <Link to="/signup">
              {' '}
              <button>Signup</button>{' '}
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default withAuth(Navbar);
