import { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { products } from '../data/resumeData';
import styles from './Projects.module.css';

export default function Projects() {
  const ref = useScrollReveal();
  const [active, setActive] = useState(null);

  return (
    <section id="projects" className={`section ${styles.projects}`}>
      <div className="section-prompt">
        <span className="prompt-user">harsha</span>
        <span className="prompt-at">@</span>
        <span className="prompt-host">portfolio</span>
        <span className="prompt-path">:~/platforms</span>
        <span className="prompt-dollar">$</span>
        <span className="prompt-cmd">ls -la --type=platform --tested-by=me</span>
      </div>

      <div className={styles.tableHeader}>
        <span className={styles.th} style={{ width: '30px'  }}>#</span>
        <span className={styles.th} style={{ width: '30px'  }}>icon</span>
        <span className={styles.th} style={{ flex: 1       }}>platform</span>
        <span className={styles.th} style={{ width: '160px'}}>domain</span>
        <span className={styles.th} style={{ width: '70px' }}>action</span>
      </div>

      <div ref={ref} className={`reveal ${styles.list}`}>
        {products.map((p, i) => (
          <div key={p.name} className={styles.entry}>
            {/* Row */}
            <div
              className={`${styles.row} ${active === i ? styles.rowActive : ''}`}
              onClick={() => setActive(active === i ? null : i)}
            >
              <span className={styles.idx} style={{ width: '30px'  }}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.ico} style={{ width: '30px'  }}>{p.icon}</span>
              <div className={styles.nameCol} style={{ flex: 1 }}>
                <span className={styles.platformName}>{p.name}</span>
                <span className={styles.platformSub}>{p.subtitle}</span>
              </div>
              <span
                className={styles.domain}
                style={{ width: '160px', color: p.domainColor, borderColor: `${p.domainColor}30`, background: `${p.domainColor}0c` }}
              >
                {p.domain}
              </span>
              <span className={styles.action} style={{ width: '70px' }}>
                {active === i ? '[-cat]' : '[+cat]'}
              </span>
            </div>

            {/* Expanded: cat output */}
            {active === i && (
              <div className={styles.catOutput}>
                <div className={styles.catPrompt}>
                  <span className="prompt-user">harsha</span>
                  <span className="prompt-at">@</span>
                  <span className="prompt-host">portfolio</span>
                  <span className="prompt-dollar">:~$</span>
                  {' '}cat platforms/{p.name.toLowerCase().replace(/\s+/g, '-')}/README.md
                </div>
                <p className={styles.catDesc}>{p.description}</p>

                <div className={styles.highlights}>
                  {p.highlights.map((h, hi) => (
                    <div key={hi} className={styles.highlightRow}>
                      <span className={styles.hi}>{'>'}</span>
                      <span className={styles.hText}>{h}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.techLine}>
                  <span className={styles.techLabel}>// tech-stack:</span>
                  {p.tech.map(t => (
                    <span key={t} className={styles.techChip}>{t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
