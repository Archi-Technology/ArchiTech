import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/userContext';
import appLogo from '../../assets/site-logo.png';
import './index.scss'; // Import the CSS styles for the navbar
import { AxiosInstence } from '../../services/axios/AxiosInstance';

const Navbar: React.FC = () => {
  const { setUserData, user } = useUser();
  const { logoutUser } = useUser();

  return (
    <div className="navbar">
      <div className="navbarLeft">
        <div className="logoContainer">
          <div className="logo">A</div>
          <div className="appName">ArchiTech</div>
          <Link to="/projects">
            <button className="navButton">Projects</button>
          </Link>
        </div>
        {/* <div className="appTitle">AWS 3 tier web app with a database</div> */}
      </div>
      <div className="navbarRight">
        <button
          className="navButton"
          onClick={async () => {
            try {
              const response = await AxiosInstence.post('/auth/logout');
              if (response.status === 200) {
                // setUserData(null); // Clear user data
                window.location.href = '/login'; // Redirect to login
              }
            } catch (error) {
              console.error('Logout failed:', error);
            }
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
