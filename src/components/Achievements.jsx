import useScrollReveal from '../hooks/useScrollReveal';
import { achievements } from '../data/resumeData';
import styles from './Achievements.module.css';

const LOG_LEVELS = ['SUCCESS', 'MILESTONE', 'SUCCESS', 'MILESTONE', 'SUCCESS', 'INFO', 'SUCCESS', 'INFO', 'MILESTONE'];
const LEVEL_COLORS = { SUCCESS: '#00ff41', MILESTONE: '#58a6ff', INFO: '#d2a8ff' };

export default function Achievements() {
  const ref = useScrollReveal();

  return (
    <section id="achievements" className={`section ${styles.ach}`}>
      <div className="section-prompt">
        <span className="prompt-user">harsha</span>
        <span className="prompt-at">@</span>
        <span className="prompt-host">portfolio</span>
        <span className="prompt-path">:~/logs</span>
        <span className="prompt-dollar">$</span>
        <span className="prompt-cmd">tail -f achievements.log | grep -E "SUCCESS|MILESTONE|INFO"</span>
      </div>

      <div className={styles.logHeader}>
        <span className={styles.logMeta}>achievements.log — {achievements.length} entries</span>
        <div className={styles.legend}>
          {Object.entries(LEVEL_COLORS).map(([level, color]) => (
            <span key={level} className={styles.legendItem} style={{ color }}>
              ● {level}
            </span>
          ))}
        </div>
      </div>

      <div ref={ref} className={`reveal ${styles.logWin}`}>
        <div className="term-titlebar">
          <div className="term-dots">
            <span className="term-dot term-dot-r" />
            <span className="term-dot term-dot-y" />
            <span className="term-dot term-dot-g" />
          </div>
          <span className="term-title">achievements.log</span>
        </div>

        <div className={styles.logBody}>
          {achievements.map((item, i) => {
            const level = LOG_LEVELS[i % LOG_LEVELS.length];
            const color = LEVEL_COLORS[level];
            return (
              <div key={i} className={styles.logEntry} style={{ animationDelay: `${i * 0.05}s` }}>
                <span className={styles.logNum}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.logLevel} style={{ color, borderColor: `${color}30`, background: `${color}08` }}>
                  {level}
                </span>
                <span className={styles.logIcon}>{item.icon}</span>
                <div className={styles.logContent}>
                  <span className={styles.logTitle}>{item.title}</span>
                  <span className={styles.logDesc}>{item.description}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
