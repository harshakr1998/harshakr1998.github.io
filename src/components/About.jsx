import useScrollReveal from '../hooks/useScrollReveal';
import { personal, summary, education } from '../data/resumeData';
import styles from './About.module.css';

export default function About() {
  const ref = useScrollReveal();

  return (
    <section id="about" className={`section section-alt ${styles.about}`}>
      <div className="section-prompt">
        <span className="prompt-user">harsha</span>
        <span className="prompt-at">@</span>
        <span className="prompt-host">portfolio</span>
        <span className="prompt-path">:~/about</span>
        <span className="prompt-dollar">$</span>
        <span className="prompt-cmd">cat profile.md</span>
      </div>

      <div ref={ref} className={`reveal ${styles.grid}`}>
        {/* Left: identity card */}
        <div className={styles.identity}>
          {/* Avatar terminal window */}
          <div className={`term-window ${styles.avatarWin}`}>
            <div className="term-titlebar">
              <div className="term-dots">
                <span className="term-dot term-dot-r" />
                <span className="term-dot term-dot-y" />
                <span className="term-dot term-dot-g" />
              </div>
              <span className="term-title">profile.json</span>
            </div>
            <div className={`term-body ${styles.avatarBody}`}>
              {/* Big initials */}
              <div className={styles.initials}>HKR</div>
              {/* JSON-like display */}
              <div className={styles.json}>
                <span className={styles.jb}>{'{'}</span>
                {[
                  ['name',       '"Harsha K R"'],
                  ['role',       '"SDET"'],
                  ['location',   '"Bengaluru, IN"'],
                  ['experience', '"4+ years"'],
                  ['status',     '"🟢 open-to-work"'],
                ].map(([k, v]) => (
                  <div key={k} className={styles.jrow}>
                    <span className={styles.jkey}>"{k}"</span>
                    <span className={styles.jcolon}>: </span>
                    <span className={styles.jval}>{v}</span>
                    <span className={styles.jcomma}>,</span>
                  </div>
                ))}
                <span className={styles.jb}>{'}'}</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className={styles.stats}>
            {[
              { v: '4+',  l: 'Years Exp',      c: 'green' },
              { v: '6',   l: 'Platforms',       c: 'cyan'  },
              { v: '4',   l: 'Tools Built',     c: 'amber' },
              { v: '2K+', l: 'Users Tested',    c: 'purple'},
            ].map(({ v, l, c }) => (
              <div key={l} className={styles.stat}>
                <span className={styles[`statVal-${c}`]}>{v}</span>
                <span className={styles.statLabel}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: content */}
        <div className={styles.content}>
          {/* Summary */}
          {summary.map((p, i) => (
            <p key={i} className={styles.para}>
              <span className={styles.comment}>// {['Overview', 'Track Record', 'Philosophy'][i]}</span>
              {p}
            </p>
          ))}

          {/* What I do */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}># what I do</div>
            <div className={styles.pills}>
              {[
                { icon: '🤖', label: 'automation-frameworks', color: 'green'  },
                { icon: '🧠', label: 'ai-platform-testing',   color: 'cyan'   },
                { icon: '⚡', label: 'performance-testing',   color: 'amber'  },
                { icon: '🔌', label: 'api-automation',        color: 'purple' },
                { icon: '🔧', label: 'internal-tool-dev',     color: 'green'  },
                { icon: '🛡️', label: 'quality-engineering',   color: 'cyan'   },
              ].map(({ icon, label, color }) => (
                <span key={label} className={`tag tag-${color} ${styles.pill}`}>
                  {icon} ./{label}
                </span>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}># education</div>
            <div className={styles.edu}>
              <span className={styles.eduIcon}>🎓</span>
              <div>
                <div className={styles.eduDeg}>{education.degree}</div>
                <div className={styles.eduCol}>{education.college}</div>
                <div className={styles.eduUniv}>
                  <span className={styles.eduTag}>{education.university}</span>
                  <span className={styles.eduTag}>{education.year}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
