import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css"
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice'; // Import your logout action

export default function Navbar() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Dispatch the logout action to update the authentication state
    dispatch(logout());
    // Perform any additional logout-related actions if necessary
  };

  return (
    <nav className='nav'>
      <Link to="/" className='title'>RateMyHunter</Link>  
      <ul>
        {userInfo ? (
          <>
            <li><Link to="/addrating">Add Rating</Link></li>
            <li><Link to="/profile">My Profile</Link></li>
            <li><Link id='signOutBtn' to='' onClick={handleLogout}>Sign Out</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Log In</Link></li>
            <li><Link id='signUpBtn' to="/register">Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

