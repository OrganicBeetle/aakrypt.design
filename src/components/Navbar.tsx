import React, { useState } from 'react';
import { useNavAnimation } from '../hooks/useNavAnimation';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

const Navbar: React.FC = () => {
  const [hoveredId, setHoveredId] = useState('home');
  const { dotRef, pathRef, containerRef } = useNavAnimation(hoveredId);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      // Use a timeout to wait for navigation and then scroll
      setTimeout(() => {
        const element = document.getElementById(id === 'home' ? 'hero' : id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id === 'home' ? 'hero' : id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={styles.navContainer}>
      <div className={styles.navWrapper}>
        <div ref={containerRef} className={styles.navLinks}>
          {navItems.map((item) => (
            <div
              key={item.id}
              data-nav-id={item.id}
              className={`${styles.navItem} ${hoveredId === item.id ? styles.active : ''}`}
              onMouseEnter={() => setHoveredId(item.id)}
              onClick={() => handleClick(item.id)}
            >
              {item.label}
            </div>
          ))}
        </div>

        <svg className={styles.navSvg} viewBox="0 0 100 10" fill="none" preserveAspectRatio="none">
          <path
            ref={pathRef}
            id="navPath"
            d="M0,5 L100,5" 
            className={styles.pathLine}
          />
          <circle
            ref={dotRef}
            id="navDot"
            r="1.2"
            className={styles.dot}
          />
        </svg>
      </div>
    </nav>
  );
};

export default Navbar;
