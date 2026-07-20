import useScrollReveal from '../hooks/useScrollReveal';
import { personal } from '../data/resumeData';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin } from 'react-icons/fi';
import styles from './Contact.module.css';

const FLAGS = [
  { flag: '--email',    value: personal.email,    href: `mailto:${personal.email}`,    icon: <FiMail size={14} />,     desc: 'primary contact',    color: '#00ff41' },
  { flag: '--phone',    value: personal.phone,    href: `tel:${personal.phone}`,       icon: <FiPhone size={14} />,    desc: 'IST hours',          color: '#58a6ff' },
  { flag: '--location', value: personal.location, href: '#',                           icon: <FiMapPin size={14} />,   desc: 'open to remote',     color: '#d2a8ff' },
  { flag: '--linkedin', value: 'linkedin.com/in/harsha-k-r', href: personal.linkedin, icon: <FiLinkedin size={14} />, desc: 'professional',       color: '#58a6ff' },
  { flag: '--github',   value: 'github.com/harsharobo222',   href: personal.github,   icon: <FiGithub size={14} />,   desc: 'code & projects',    color: '#d97706' },
];

export default function Contact() {
  const ref = useScrollReveal();

  return (
    <section id="contact" className={`section section-alt ${styles.contact}`}>
      <div className="section-prompt">
        <span className="prompt-user">harsha</span>
        <span className="prompt-at">@</span>
        <span className="prompt-host">portfolio</span>
        <span className="prompt-path">:~</span>
        <span className="prompt-dollar">$</span>
        <span className="prompt-cmd">./contact.sh --help</span>
      </div>

      <div ref={ref} className={`reveal ${styles.wrapper}`}>
        {/* Help output window */}
        <div className={`term-window ${styles.helpWin}`}>
          <div className="term-titlebar">
            <div className="term-dots">
              <span className="term-dot term-dot-r" />
              <span className="term-dot term-dot-y" />
              <span className="term-dot term-dot-g" />
            </div>
            <span className="term-title">contact.sh — help</span>
          </div>

          <div className={styles.helpBody}>
            <div className={styles.usage}>
              <span className={styles.kw}>Usage:</span>
              {' '}harsha <span className={styles.arg}>[OPTIONS]</span>
            </div>

            <p className={styles.usageDesc}>
              Connect with Harsha K R — SDET & Automation Engineer. Open to SDET,
              Automation Architect, and AI Testing roles.
            </p>

            <div className={styles.separator}>Options:</div>

            <div className={styles.flagsTable}>
              {FLAGS.map(({ flag, value, href, icon, desc, color }) => (
                <a
                  key={flag}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className={styles.flagRow}
                >
                  <span className={styles.flagName} style={{ color }}>{flag}</span>
                  <div className={styles.flagIcon} style={{ color }}>{icon}</div>
                  <span className={styles.flagValue}>{value}</span>
                  <span className={styles.flagDesc}>// {desc}</span>
                </a>
              ))}
            </div>

            <div className={styles.separator}>Example:</div>
            <div className={styles.example}>
              <span className={styles.pu}>harsha</span>
              <span className={styles.pa}>@</span>
              <span className={styles.ph}>portfolio</span>
              <span className={styles.ps}>:~$</span>
              <span className={styles.cmd}> mail -s "Let's work together" {personal.email}</span>
            </div>

            <div className={styles.exitCode}>
              exit code: <span style={{ color: 'var(--green)' }}>0</span>
              {'  '}// All systems operational. Ready to connect.
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <p className={styles.ctaText}>
            <span style={{ color: 'var(--green)' }}>$ </span>
            I'm actively looking for SDET, Automation Architect, and AI Testing roles.
            If you have an interesting opportunity — let's talk!
          </p>
          <div className={styles.ctaBtns}>
            <a href={`mailto:${personal.email}`} className="btn-terminal">
              <FiMail size={14} /> Send Email
            </a>
            <a href={personal.linkedin} target="_blank" rel="noreferrer" className="btn-terminal-outline">
              <FiLinkedin size={14} /> LinkedIn
            </a>
            <a href={personal.github} target="_blank" rel="noreferrer" className="btn-terminal-outline">
              <FiGithub size={14} /> GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
