import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Navbar.module.css';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { id: 'home', label: 'Home', sectionId: 'hero' },
  { id: 'work', label: 'Work', sectionId: 'work' },
  { id: 'about', label: 'About', sectionId: 'about-me' },
  { id: 'contact', label: 'Contact', sectionId: 'contact' },
];

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const triggers = navItems.map((item) => {
      return ScrollTrigger.create({
        trigger: `#${item.sectionId}`,
        start: 'top 40%',
        end: 'bottom 40%',
        onToggle: (self) => {
          if (self.isActive) setActiveSection(item.id);
        },
      });
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [location.pathname]);

  const handleClick = (sectionId: string) => {
    const lenis = (window as any).lenis;
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          if (lenis) {
            lenis.scrollTo(element);
          } else {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        if (lenis) {
          lenis.scrollTo(element);
        } else {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <nav className={`${styles.navContainer} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.navLinks}>
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`${styles.navItem} ${activeSection === item.id ? styles.active : ''}`}
            onClick={() => handleClick(item.sectionId)}
          >
            {item.label}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
