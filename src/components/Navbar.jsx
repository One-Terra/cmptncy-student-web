import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = ({ transparent, padding, containerClassName, className, user, testMode, onExit }) => {
  const location = useLocation();

  const isParentPage = location.pathname === '/parent-nomination';

  return (
    <nav className={`${styles.nav} ${transparent ? styles.transparent : ''} ${className || ''}`} style={padding ? { padding } : {}}>
      <div className={containerClassName || styles.container}>
        <div className={styles.navContent}>
          <Link to="/" className={styles.wm}>CMPTN<em>C</em>Y</Link>
          {testMode ? (
            <div className={styles.navLinks}>
              <button 
                onClick={onExit} 
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  color: 'rgba(244,247,251,0.45)', 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: '11px', 
                  letterSpacing: '1.5px', 
                  textTransform: 'uppercase', 
                  cursor: 'pointer',
                  transition: 'color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.color = 'rgba(244,247,251,0.8)'}
                onMouseOut={(e) => e.target.style.color = 'rgba(244,247,251,0.45)'}
              >
                Save & exit
              </button>
            </div>
          ) : user ? (
            <div className={styles.navUser}>
              {user.name} &middot; {user.plan}
            </div>
          ) : (
            <div className={styles.navLinks}>
              <a href="/#how-it-works" className={styles.navLink}>How it works</a>
              <a href="/#pricing" className={styles.navLink}>Pricing</a>
              <Link to="/parent-nomination" className={styles.navLink} style={isParentPage ? { color: 'rgba(244,247,251,0.8)' } : {}}>For parents</Link>
              <Link to="/login" className={styles.navCta}>Log in</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
