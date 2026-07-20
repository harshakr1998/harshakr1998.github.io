import { personal } from '../data/resumeData';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Exit command line */}
        <div className={styles.exitLine}>
          <span className={styles.pu}>harsha</span>
          <span className={styles.pa}>@</span>
          <span className={styles.ph}>portfolio</span>
          <span className={styles.ps}>:~$</span>
          <span className={styles.cmd}> exit</span>
        </div>

        <div className={styles.middle}>
          <p className={styles.copy}>
            © 2025 <span className={styles.name}>{personal.name}</span>
            {' — '}Built with React + ❤️ in Bengaluru, India
          </p>
          <div className={styles.socials}>
            <a href={personal.github} target="_blank" rel="noreferrer" className={styles.soc}><FiGithub size={15} /></a>
            <a href={personal.linkedin} target="_blank" rel="noreferrer" className={styles.soc}><FiLinkedin size={15} /></a>
            <a href={`mailto:${personal.email}`} className={styles.soc}><FiMail size={15} /></a>
          </div>
        </div>

        {/* Process exit */}
        <div className={styles.processExit}>
          <span className={styles.exitCode}>[process exited with code 0]</span>
        </div>
      </div>
    </footer>
  );
}
