import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = ({ transparent, padding, containerClassName, className }) => {
  const location = useLocation();

  const isParentPage = location.pathname === '/parent-nomination';

  return (
    <nav className={`${styles.nav} ${transparent ? styles.transparent : ''} ${className || ''}`} style={padding ? { padding } : {}}>
      <div className={containerClassName || styles.container}>
        <div className={styles.navContent}>
          <Link to="/" className={styles.wm}>CMPTN<em>C</em>Y</Link>
          <div className={styles.navLinks}>
            <a href="/#how-it-works" className={styles.navLink}>How it works</a>
            <a href="/#pricing" className={styles.navLink}>Pricing</a>
            <Link to="/parent-nomination" className={styles.navLink} style={isParentPage ? { color: 'rgba(244,247,251,0.8)' } : {}}>For parents</Link>
            <Link to="/login" className={styles.navCta}>Log in</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
