import { useState, useEffect } from 'react';
import styles from './Sidebar.module.css';

const NAV_ITEMS = [
  { id: 'hero',         cmd: '~/init',         label: 'init' },
  { id: 'about',        cmd: '--about',         label: 'about' },
  { id: 'skills',       cmd: '--skills',        label: 'skills' },
  { id: 'experience',   cmd: '--experience',    label: 'experience' },
  { id: 'projects',     cmd: '--platforms',     label: 'platforms' },
  { id: 'tools',        cmd: '--tools',         label: 'tools [built]' },
  { id: 'achievements', cmd: '--achievements',  label: 'achievements' },
  { id: 'contact',      cmd: '--contact',       label: 'contact' },
];

export default function Sidebar({ isOpen, onClose }) {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const onScroll = () => {
      const ids = NAV_ITEMS.map(n => n.id).reverse();
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(id);
          return;
        }
      }
      setActive('hero');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    onClose();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className={styles.overlay} onClick={onClose} />}

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.logo}>
            <span className={styles.logoText}>HKR</span>
          </div>
          <div className={styles.logoSub}>portfolio v1.0.0</div>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Label */}
        <div className={styles.navLabel}># navigation</div>

        {/* Nav items */}
        <nav className={styles.nav}>
          {NAV_ITEMS.map(({ id, cmd, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`${styles.navItem} ${active === id ? styles.navActive : ''}`}
            >
              <span className={styles.arrow}>{active === id ? '▶' : ' '}</span>
              <span className={styles.navCmd}>{cmd}</span>
            </button>
          ))}
        </nav>

        <div className={styles.divider} />

        {/* Status block */}
        <div className={styles.status}>
          <div className={styles.statusLine}>
            <span className={styles.statusDot} />
            <span className={styles.statusText}>open to work</span>
          </div>
          <div className={styles.statusDetail}>📍 Bengaluru, IN</div>
          <div className={styles.statusDetail}>⏱ IST (UTC+5:30)</div>
        </div>

        {/* Footer */}
        <div className={styles.sidebarFooter}>
          <span className={styles.footerText}>© 2025 Harsha K R</span>
        </div>
      </aside>
    </>
  );
}
