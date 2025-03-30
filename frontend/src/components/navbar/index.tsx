import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/userContext';
import appLogo from '../../assets/site-logo.png';
import './index.scss'; // Import the CSS styles for the navbar


const Navbar: React.FC = () => {

  const { setUserData, user } = useUser();
  const { logoutUser } = useUser();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={appLogo} alt="TripsNet Logo" className="navbar-logo-img" />
        <span className="navbar-logo">TripsNet</span>
      </div>
      <div className="navbar-center">
        <Link to="/" className="navbar-link">Feed</Link>
        <Link to="/map" className="navbar-link">Map</Link>
        <Link to={`/profile?id=${user?._id}`}  className="navbar-link">Profile</Link>
      </div>
      <div className="navbar-right">
        <button onClick={logoutUser} className="btn sign-out-btn">Sign Out</button>
      </div>
    </nav>
  );
};

export default Navbar;
