import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/userContext';
import appLogo from '../../assets/site-logo.png';
import './index.scss'; // Import the CSS styles for the navbar


const Navbar: React.FC = () => {

  const { setUserData, user } = useUser();
  const { logoutUser } = useUser();

  return (
  
        <div className="navbar">
        <div className="navbarLeft">
          <div className="logoContainer">
            <div className="logo">A</div>
            <div className="appName">ArchiTech</div>
          </div>
          <div className="appTitle">AWS 3 tier web app with a database</div>
        </div>
        <div className="navbarRight">
          <button className="navButton">
            Templates <span className="chevronDown">▼</span>
          </button>
          <button className="iconButton">
            <span className="shareIcon">↗</span>
          </button>
          <button className="iconButton">
            <span className="settingsIcon">⚙</span>
          </button>
        </div>
      </div>
  );
};

export default Navbar;
