'use client';

import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import './index.scss';
import logoIcon from '../../assets/logo.png';
import layersIcon from '../../assets/layersIcon.png';
import cloudIcon from '../../assets/cloudIcon.png';
import cursorIcon from '../../assets/cursorIcon.png';
import networkIcon from '../../assets/networkIcon.png';
import terraformIcon from '../../assets/terraformIcon.png';

export default function LandingPage() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleLoginClick = () => {
    navigate('/login');
  };

  // Add parallax effect based on mouse movement
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      const elements = container.querySelectorAll('.bg-element');
      elements.forEach((el) => {
        const element = el as HTMLElement;
        const speed = Number.parseFloat(
          element.getAttribute('data-speed') || '0.05',
        );
        const xOffset = (x - 0.5) * speed * 100;
        const yOffset = (y - 0.5) * speed * 100;

        element.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="landing-container" ref={containerRef}>
      <header className="landing-header">
        <div className="logo-container">
          <img src={logoIcon} alt="ArchiTech Logo" className="logo-image" />
        </div>
      </header>

      <main className="landing-main">
        <div className="bg-element layers-icon floating" data-speed="0.05">
          <img src={layersIcon} alt="Layers" className="icon-image" />
        </div>

        <div
          className="bg-element cloud-icon floating-reverse"
          data-speed="0.03"
        >
          <img src={cloudIcon} alt="Cloud" className="icon-image" />
        </div>

        <div className="bg-element cursor-icon floating-slow" data-speed="0.08">
          <img src={cursorIcon} alt="Cursor" className="icon-image" />
        </div>

        <div
          className="bg-element network-icon floating-diagonal"
          data-speed="0.04"
        >
          <img src={networkIcon} alt="Network" className="icon-image" />
        </div>

        <div
          className="bg-element terraform-icon floating-rotate"
          data-speed="0.06"
        >
          <img src={terraformIcon} alt="Terraform" className="icon-image" />
        </div>

        {/* Floating particles */}
        <div className="particles">
          {[...Array(15)].map((_, i) => (
            <div key={i} className={`particle particle-${i % 5}`}></div>
          ))}
        </div>

        {/* Main content */}
        <div className="content">
          <h1 className="title">ArchiTech</h1>
          <p className="subtitle">One Click Architecture</p>
          <button className="login-button pulse" onClick={handleLoginClick}>
            Login <span className="arrow">→</span>
          </button>
        </div>
      </main>
    </div>
  );
}
