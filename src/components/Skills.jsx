import { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { skills } from '../data/resumeData';
import styles from './Skills.module.css';

// Map category colors to CSS class names
const COLOR_MAP = {
  '#7C3AED': 'purple',
  '#2563EB': 'cyan',
  '#059669': 'green',
  '#DC2626': 'red',
  '#D97706': 'amber',
};

export default function Skills() {
  const ref = useScrollReveal();
  const [open, setOpen] = useState(null);

  return (
    <section id="skills" className={`section ${styles.skills}`}>
      <div className="section-prompt">
        <span className="prompt-user">harsha</span>
        <span className="prompt-at">@</span>
        <span className="prompt-host">portfolio</span>
        <span className="prompt-path">:~/skills</span>
        <span className="prompt-dollar">$</span>
        <span className="prompt-cmd">ls -la --categorized --color=auto</span>
      </div>

      <div ref={ref} className={`reveal ${styles.grid}`}>
        {skills.map((group, gi) => {
          const colorKey = COLOR_MAP[group.color] || 'green';
          const isOpen = open === gi;
          return (
            <div
              key={group.category}
              className={`term-window ${styles.card} ${isOpen ? styles.cardOpen : ''}`}
              style={{ animationDelay: `${gi * 0.04}s` }}
            >
              {/* Directory header = title bar */}
              <div
                className={`term-titlebar ${styles.dirHeader}`}
                onClick={() => setOpen(isOpen ? null : gi)}
              >
                <div className="term-dots">
                  <span className="term-dot term-dot-r" />
                  <span className="term-dot term-dot-y" />
                  <span className="term-dot term-dot-g" />
                </div>
                <span className={styles.dirIcon} style={{ color: group.color }}>📁</span>
                <span className={styles.dirName} style={{ color: group.color }}>
                  {group.category.toLowerCase().replace(/\s+/g, '-')}/
                </span>
                <span className={styles.dirCount}>{group.items.length} items</span>
                <span className={styles.chevron}>{isOpen ? '▾' : '▸'}</span>
              </div>

              {/* File listing */}
              <div className={`${styles.listing} ${isOpen ? styles.listingOpen : ''}`}>
                {group.items.map((item, ii) => (
                  <div key={item} className={styles.fileRow}>
                    <span className={styles.filePerms}>-rw-r--r--</span>
                    <span className={styles.fileSize}>{(Math.random() * 5 + 1).toFixed(1)}K</span>
                    <span
                      className={styles.fileName}
                      style={{ color: group.color }}
                    >
                      {item.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}
                      <span className={styles.fileExt}>
                        {group.category.includes('Language') ? '.class'
                          : group.category.includes('API') ? '.json'
                          : group.category.includes('Database') ? '.sql'
                          : group.category.includes('Web') ? '.js'
                          : '.sh'}
                      </span>
                    </span>
                  </div>
                ))}
              </div>

              {/* Collapsed: show first 3 as tags */}
              {!isOpen && (
                <div className={styles.collapsed}>
                  {group.items.slice(0, 4).map(item => (
                    <span
                      key={item}
                      className={styles.chip}
                      style={{
                        color: group.color,
                        borderColor: `${group.color}30`,
                        background: `${group.color}0d`,
                      }}
                    >
                      {item}
                    </span>
                  ))}
                  {group.items.length > 4 && (
                    <span className={styles.more}>+{group.items.length - 4} more</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
