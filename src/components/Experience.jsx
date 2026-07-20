import { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { experience } from '../data/resumeData';
import styles from './Experience.module.css';

const COMMITS = [
  { hash: 'a3f9c2e', role: 'Software Development Engineer in Test (SDET)', period: '2024 – Present', color: '#00ff41', current: true },
  { hash: '7b4d1a8', role: 'Senior Quality Engineer',                        period: '2023 – 2024',   color: '#58a6ff', current: false },
  { hash: '3e8f2c1', role: 'Quality Engineer',                               period: '2022 – 2023',   color: '#d2a8ff', current: false },
  { hash: '1d5a9b4', role: 'Junior Quality Engineer',                        period: 'Jul 2022',      color: '#f0883e', current: false },
];

export default function Experience() {
  const ref = useScrollReveal();
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="experience" className={`section section-alt ${styles.exp}`}>
      <div className="section-prompt">
        <span className="prompt-user">harsha</span>
        <span className="prompt-at">@</span>
        <span className="prompt-host">portfolio</span>
        <span className="prompt-path">:~/career</span>
        <span className="prompt-dollar">$</span>
        <span className="prompt-cmd">git log --all --graph --oneline --decorate</span>
      </div>

      <div ref={ref} className={`reveal ${styles.wrapper}`}>
        {/* Company header */}
        <div className={styles.companyBlock}>
          <span className={styles.companyBadge}>origin/main</span>
          <h3 className={styles.companyName}>EOX Vantage Pvt. Ltd.</h3>
          <span className={styles.companyMeta}>Bengaluru, Karnataka  ·  {experience.duration}</span>
        </div>

        {/* Git log timeline */}
        <div className={styles.gitLog}>
          {COMMITS.map((c, i) => (
            <div key={c.hash} className={styles.commit}>
              {/* Graph column */}
              <div className={styles.graphCol}>
                <div className={styles.vline} style={{ opacity: i === COMMITS.length - 1 ? 0 : 1 }} />
                <div className={styles.dot} style={{ background: c.color, boxShadow: `0 0 8px ${c.color}` }} />
              </div>

              {/* Content */}
              <div className={`term-window ${styles.commitCard}`} style={{ borderColor: c.current ? 'var(--border-green)' : 'var(--border)' }}>
                <div className={styles.commitHeader}>
                  <span className={styles.commitHash} style={{ color: c.color }}>{c.hash}</span>
                  {c.current && <span className={styles.headTag}>(HEAD → main)</span>}
                  <span className={styles.commitPeriod}>{c.period}</span>
                </div>
                <div className={styles.commitMsg}>
                  <span className={styles.commitType} style={{ color: c.color }}>feat:</span>
                  <span className={styles.commitTitle}>{c.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overview block */}
        <div className={styles.overview}>
          <div className={styles.overviewHeader}>
            <span className={styles.comment}># git show HEAD --stat</span>
          </div>
          <p className={styles.overviewText}>{experience.overview}</p>
        </div>

        {/* Responsibilities */}
        <div className={styles.respBlock}>
          <div className={styles.respHeader}>
            <span className={styles.comment}># key responsibilities ({experience.responsibilities.length} entries)</span>
            <button className={styles.toggleBtn} onClick={() => setShowAll(s => !s)}>
              {showAll ? '[collapse]' : '[expand all]'}
            </button>
          </div>

          <div className={styles.respList}>
            {(showAll ? experience.responsibilities : experience.responsibilities.slice(0, 4)).map((r, i) => (
              <div key={i} className={styles.respItem}>
                <span className={styles.respPrefix}>[{String(i + 1).padStart(2, '0')}]</span>
                <span className={styles.respText}>{r}</span>
              </div>
            ))}
            {!showAll && (
              <div className={styles.moreHint} onClick={() => setShowAll(true)}>
                ... {experience.responsibilities.length - 4} more entries — click [expand all]
              </div>
            )}
          </div>
        </div>

        {/* Domain tags */}
        <div className={styles.domains}>
          <span className={styles.comment}># domains/</span>
          <div className={styles.domainTags}>
            {[
              { l: 'AI-Platforms',    c: 'green'  },
              { l: 'BaaS',            c: 'cyan'   },
              { l: 'Insurance',       c: 'red'    },
              { l: 'Logistics',       c: 'amber'  },
              { l: 'Low-Code',        c: 'purple' },
              { l: 'Internal-Apps',   c: 'green'  },
            ].map(({ l, c }) => (
              <span key={l} className={`tag tag-${c}`}>{l}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
