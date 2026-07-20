import { useState, useEffect, useRef } from 'react';
import { FiDownload, FiChevronDown, FiGithub } from 'react-icons/fi';
import { personal } from '../data/resumeData';
import styles from './Hero.module.css';

// Matrix Rain Canvas
function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const chars  = '01アイウエカキセラ<>{}[]();$#HKR4SDET';
    const fSize  = 13;
    let cols     = Math.floor(canvas.width / fSize);
    let drops    = Array.from({ length: cols }, () => Math.random() * -50);

    let raf;
    let last = 0;
    const INTERVAL = 60; // ms between frames

    function draw(now) {
      raf = requestAnimationFrame(draw);
      if (now - last < INTERVAL) return;
      last = now;

      ctx.fillStyle = 'rgba(13,17,23,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fSize}px JetBrains Mono, monospace`;

      drops.forEach((y, i) => {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        // Lead char: bright
        ctx.fillStyle = y > 0 ? '#7fffd4' : 'transparent';
        ctx.globalAlpha = 0.8;
        ctx.fillText(ch, i * fSize, y * fSize);
        // Trail
        ctx.fillStyle = '#00ff41';
        ctx.globalAlpha = 0.12;
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fSize, (y - 1) * fSize);
        ctx.globalAlpha = 1;

        if (y * fSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.6;
      });
    }

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.matrix} />;
}

// Boot sequence lines
const BOOT = [
  { delay: 200,  type: 'sys',  text: 'Initializing portfolio system...' },
  { delay: 800,  type: 'ok',   text: '[OK] Loaded module: automation-frameworks' },
  { delay: 1200, type: 'ok',   text: '[OK] Loaded module: ai-platform-testing' },
  { delay: 1600, type: 'ok',   text: '[OK] Loaded module: chrome-extensions (4 tools)' },
  { delay: 2100, type: 'sep',  text: '─'.repeat(52) },
  { delay: 2400, type: 'cmd',  text: 'whoami' },
  { delay: 2800, type: 'out',  text: 'Harsha K R' },
  { delay: 3000, type: 'out2', text: 'SDET  ·  Automation Architect  ·  AI Platform Tester' },
  { delay: 3300, type: 'sep',  text: '─'.repeat(52) },
  { delay: 3600, type: 'cmd',  text: 'cat experience.txt' },
  { delay: 4000, type: 'out',  text: '4+ years  │  EOX Vantage Pvt. Ltd.  │  Bengaluru, IN' },
  { delay: 4300, type: 'sep',  text: '─'.repeat(52) },
  { delay: 4600, type: 'cmd',  text: 'ls core-skills/' },
  { delay: 5000, type: 'ls',   text: 'Java/  Python/  Selenium/  Playwright/  JMeter/  AI-Testing/' },
  { delay: 5400, type: 'sep',  text: '─'.repeat(52) },
  { delay: 5700, type: 'cmd',  text: 'echo $STATUS' },
  { delay: 6100, type: 'status', text: '🟢  Open to new opportunities' },
];

export default function Hero() {
  const [visibleLines, setVisibleLines] = useState([]);
  const [showCtas, setShowCtas]         = useState(false);
  const [typingCmd, setTypingCmd]       = useState(null); // {text, chars}

  useEffect(() => {
    const timers = [];

    BOOT.forEach((line, idx) => {
      timers.push(setTimeout(() => {
        setVisibleLines(prev => [...prev, line]);
      }, line.delay));
    });

    // After last line, show CTAs
    timers.push(setTimeout(() => setShowCtas(true), 6700));

    return () => timers.forEach(clearTimeout);
  }, []);

  const scrollDown = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className={styles.hero}>
      <MatrixRain />
      <div className={styles.scanline} />

      <div className={styles.content}>
        {/* Terminal window */}
        <div className={styles.termWin}>
          {/* Title bar */}
          <div className={styles.titleBar}>
            <div className={styles.dots}>
              <span className={`${styles.dot} ${styles.dotR}`} />
              <span className={`${styles.dot} ${styles.dotY}`} />
              <span className={`${styles.dot} ${styles.dotG}`} />
            </div>
            <span className={styles.tabTitle}>harsha@portfolio: ~</span>
            <div className={styles.tabRight}>bash — 80×24</div>
          </div>

          {/* Terminal body */}
          <div className={styles.termBody}>
            {visibleLines.map((line, i) => (
              <div key={i} className={`${styles.line} ${styles[`line-${line.type}`]}`}>
                {line.type === 'cmd' && (
                  <span className={styles.inlinePrompt}>
                    <span className={styles.pu}>harsha</span>
                    <span className={styles.pa}>@</span>
                    <span className={styles.ph}>portfolio</span>
                    <span className={styles.ps}>:~$</span>
                    {' '}
                  </span>
                )}
                {line.text}
                {i === visibleLines.length - 1 && !showCtas && (
                  <span className={styles.inlineCursor}>▋</span>
                )}
              </div>
            ))}

            {/* Final prompt */}
            {showCtas && (
              <div className={styles.line}>
                <span className={styles.inlinePrompt}>
                  <span className={styles.pu}>harsha</span>
                  <span className={styles.pa}>@</span>
                  <span className={styles.ph}>portfolio</span>
                  <span className={styles.ps}>:~$</span>
                  {' '}
                </span>
                <span className={styles.inlineCursor}>▋</span>
              </div>
            )}
          </div>
        </div>

        {/* CTAs */}
        {showCtas && (
          <div className={styles.ctas}>
            <button onClick={scrollDown} className="btn-terminal">
              <FiChevronDown size={14} /> ./explore-portfolio
            </button>
            <a href={personal.github} target="_blank" rel="noreferrer" className="btn-terminal-outline">
              <FiGithub size={14} /> github
            </a>
            <a href={`mailto:${personal.email}`} className="btn-terminal-outline">
              $ --contact
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
