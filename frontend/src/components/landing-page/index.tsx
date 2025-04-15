'use client';

import { useNavigate } from 'react-router-dom';
import './index.scss';
import logo from '../../assets/logo.png';
import layersIcon from '../../assets/layersIcon.png';
import cloudIcon from '../../assets/cloudIcon.png';
import cursorIcon from '../../assets/cursorIcon.png';
import networkIcon from '../../assets/networkIcon.png';
import terraformIcon from '../../assets/terraformIcon.png';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="landing-container">
      <header className="landing-header">
        <div className="logo-container">
          <img src={logo} alt="ArchiTech Logo" className="logo-image" />
        </div>
      </header>

      <main className="landing-main">
        <div className="bg-element layers-icon">
          <img src={layersIcon} alt="Layers" className="icon-image" />
        </div>

        <div className="bg-element cloud-icon">
          <img src={cloudIcon} alt="Cloud" className="icon-image" />
        </div>

        <div className="bg-element cursor-icon">
          <img src={cursorIcon} alt="Cursor" className="icon-image" />
        </div>

        <div className="bg-element network-icon">
          <img src={networkIcon} alt="Network" className="icon-image" />
        </div>

        <div className="bg-element terraform-icon">
          <img src={terraformIcon} alt="Terraform" className="icon-image" />
        </div>

        <div className="content">
          <h1 className="title">ArchiTech</h1>
          <p className="subtitle">One Click Architecture</p>
          <button className="login-button" onClick={handleLoginClick}>
            Login <span className="arrow">→</span>
          </button>
        </div>
      </main>
    </div>
  );
}
