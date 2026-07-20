import useScrollReveal from '../hooks/useScrollReveal';
import { tools } from '../data/resumeData';
import styles from './Tools.module.css';

const IMPORT_COLORS = ['#00ff41', '#58a6ff', '#059669', '#d97706'];

export default function Tools() {
  const ref = useScrollReveal();

  return (
    <section id="tools" className={`section section-alt ${styles.tools}`}>
      <div className="section-prompt">
        <span className="prompt-user">harsha</span>
        <span className="prompt-at">@</span>
        <span className="prompt-host">portfolio</span>
        <span className="prompt-path">:~/tools</span>
        <span className="prompt-dollar">$</span>
        <span className="prompt-cmd">ls --built-by=me --type=application</span>
      </div>

      <div className={styles.subheading}>
        <span className={styles.comment}>// 4 internal tools built & deployed — actively used by the Quality Engineering team</span>
      </div>

      <div ref={ref} className={`reveal ${styles.grid}`}>
        {tools.map((tool, i) => (
          <div key={tool.name} className={`term-window ${styles.card}`} style={{ animationDelay: `${i * 0.08}s` }}>
            {/* Title bar */}
            <div className="term-titlebar">
              <div className="term-dots">
                <span className="term-dot term-dot-r" />
                <span className="term-dot term-dot-y" />
                <span className="term-dot term-dot-g" />
              </div>
              <span className="term-title" style={{ color: tool.color }}>{tool.name.toLowerCase().replace(/\s+/g, '_')}.{tool.type.includes('Chrome') ? 'ext' : 'app'}</span>
              <span className={styles.builtTag}>BUILT BY ME</span>
            </div>

            {/* Code-style body */}
            <div className={styles.cardBody}>
              {/* Import block */}
              <div className={styles.imports}>
                {tool.tech.slice(0, 3).map((t, ti) => (
                  <div key={t} className={styles.importLine}>
                    <span className={styles.importKw}>import</span>
                    <span className={styles.importMod} style={{ color: IMPORT_COLORS[i % IMPORT_COLORS.length] }}>
                      {' '}{t.toLowerCase().replace(/\s+/g, '')}
                    </span>
                    <span className={styles.importFrom}> from </span>
                    <span className={styles.importStr}>'{t}'</span>
                  </div>
                ))}
              </div>

              <div className={styles.divider} />

              {/* Type badge */}
              <span className={styles.typeBadge} style={{ color: tool.color, borderColor: `${tool.color}30`, background: `${tool.color}0c` }}>
                // {tool.type}
              </span>

              {/* Tool name */}
              <h3 className={styles.toolName}>{tool.name}</h3>

              {/* Description */}
              <p className={styles.desc}>{tool.description}</p>

              {/* Impact */}
              <div className={styles.impact} style={{ borderColor: `${tool.color}25` }}>
                <span className={styles.impactTag} style={{ color: tool.color }}>[IMPACT]</span>
                <span className={styles.impactText}>{tool.impact}</span>
              </div>

              {/* All tech chips */}
              <div className={styles.techRow}>
                {tool.tech.map(t => (
                  <span key={t} className={styles.chip}
                    style={{ color: tool.color, borderColor: `${tool.color}25`, background: `${tool.color}08` }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom accent line */}
            <div className={styles.accentLine} style={{ background: tool.color }} />
          </div>
        ))}
      </div>
    </section>
  );
}
