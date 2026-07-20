import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { personal } from '../data/resumeData';
import styles from './Navbar.module.css';

export default function Navbar({ onMenuToggle, menuOpen }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-IN', { hour12: false }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className={styles.navbar}>
      {/* Left: prompt */}
      <div className={styles.left}>
        <button className={styles.hamburger} onClick={onMenuToggle} aria-label="Toggle menu">
          {menuOpen ? <FiX size={16} /> : <FiMenu size={16} />}
        </button>
        <span className={styles.prompt}>
          <span className={styles.user}>harsha</span>
          <span className={styles.at}>@</span>
          <span className={styles.host}>portfolio</span>
          <span className={styles.sep}>:</span>
          <span className={styles.path}>~</span>
          <span className={styles.dollar}>$</span>
          <span className={styles.cmd}>./run --portfolio</span>
          <span className={styles.cursor}>▋</span>
        </span>
      </div>

      {/* Right: links + clock */}
      <div className={styles.right}>
        <span className={styles.clock}>[{time}]</span>
        <a href={personal.github} target="_blank" rel="noreferrer" className={styles.iconBtn} title="GitHub">
          <FiGithub size={15} />
          <span>GitHub</span>
        </a>
        <a href={personal.linkedin} target="_blank" rel="noreferrer" className={styles.iconBtn} title="LinkedIn">
          <FiLinkedin size={15} />
          <span>LinkedIn</span>
        </a>
        <a href={`mailto:${personal.email}`} className={`${styles.iconBtn} ${styles.hirebtn}`} title="Email">
          <FiMail size={15} />
          <span>Hire Me</span>
        </a>
      </div>
    </header>
  );
}
