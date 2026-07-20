import React, { useState, useEffect, useRef } from 'react';
import {
  personal,
  summary,
  skills,
  experience,
  products,
  tools,
  achievements,
  education
} from '../data/resumeData';
import {
  FiTerminal,
  FiCornerDownLeft,
  FiTrash2,
  FiHelpCircle,
  FiUser,
  FiCode,
  FiGitCommit,
  FiBox,
  FiTool,
  FiAward,
  FiFileText,
  FiMail,
  FiDownload,
  FiSun,
  FiGithub,
  FiLinkedin,
  FiPhone,
  FiMapPin,
  FiBookOpen,
  FiCheckCircle,
  FiBriefcase,
  FiZap,
  FiCpu,
  FiLayers,
  FiActivity,
  FiDatabase,
  FiCheckSquare,
  FiTruck,
  FiShield,
  FiHome,
  FiBarChart2,
  FiTrendingUp,
  FiSearch,
  FiGlobe,
  FiStar
} from 'react-icons/fi';
import styles from './InteractiveTerminal.module.css';

// Icon mapping helper function to replace raw text emojis
function renderIcon(iconKey, size = 16) {
  switch (iconKey) {
    case '💻': return <FiCode size={size} />;
    case '🤖': return <FiCpu size={size} />;
    case '🔌': return <FiLayers size={size} />;
    case '⚡': return <FiZap size={size} />;
    case '🧠': return <FiActivity size={size} />;
    case '🏗️': return <FiLayers size={size} />;
    case '🛠️': return <FiTool size={size} />;
    case '🗄️': return <FiDatabase size={size} />;
    case '🔧': return <FiTool size={size} />;
    case '📋': return <FiCheckSquare size={size} />;
    case '🚛': return <FiTruck size={size} />;
    case '🛡️': return <FiShield size={size} />;
    case '🏠': return <FiHome size={size} />;
    case '📊': return <FiBarChart2 size={size} />;
    case '📝': return <FiFileText size={size} />;
    case '⚛️': return <FiCode size={size} />;
    case '🎓': return <FiBookOpen size={size} />;
    case '🏆': return <FiAward size={size} />;
    case '📦': return <FiBox size={size} />;
    case '🚀': return <FiTrendingUp size={size} />;
    case '🔍': return <FiSearch size={size} />;
    case '🌐': return <FiGlobe size={size} />;
    default: return <FiCode size={size} />;
  }
}

// Command list configuration
const COMMANDS = [
  { cmd: 'help', desc: 'Display all available commands', icon: <FiHelpCircle /> },
  { cmd: 'about', desc: 'Who is Harsha K R? (Profile & Bio)', icon: <FiUser /> },
  { cmd: 'skills', desc: 'Technical skills & framework stack', icon: <FiCode /> },
  { cmd: 'experience', desc: '4+ years career progression & git log', icon: <FiGitCommit /> },
  { cmd: 'projects', desc: 'Enterprise & AI platforms tested', icon: <FiBox /> },
  { cmd: 'tools', desc: '4 Internal tools built by Harsha', icon: <FiTool /> },
  { cmd: 'achievements', desc: 'Milestones & key impact logs', icon: <FiAward /> },
  { cmd: 'resume', desc: 'View complete resume & download options', icon: <FiFileText /> },
  { cmd: 'contact', desc: 'Email, phone, LinkedIn & social links', icon: <FiMail /> },
  { cmd: 'clear', desc: 'Clear terminal output screen', icon: <FiTrash2 /> },
];

export default function InteractiveTerminal() {
  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [theme, setTheme] = useState('green'); // 'green' | 'cyan' | 'amber' | 'purple'

  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  // Focus input on click anywhere inside terminal
  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Initial history state with SINGLE welcome block
  const [history, setHistory] = useState([
    {
      id: 'init-welcome',
      cmd: null,
      component: <WelcomeOutput onRun={(cmd) => executeCommand(cmd)} />,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour12: false }),
    }
  ]);

  // Scroll to bottom whenever history updates
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Command Execution Handler
  const executeCommand = (rawCmd, isInit = false) => {
    const cleanCmd = rawCmd.trim().toLowerCase();
    if (!cleanCmd && !isInit) return;

    if (cleanCmd === 'clear' || cleanCmd === 'cls') {
      setHistory([]);
      setInputVal('');
      return;
    }

    let outputComponent = null;

    switch (cleanCmd) {
      case 'welcome':
      case 'init':
        outputComponent = <WelcomeOutput onRun={executeCommand} />;
        break;
      case 'help':
      case '?':
      case 'menu':
        outputComponent = <HelpOutput onRun={executeCommand} />;
        break;
      case 'about':
      case 'bio':
      case 'whoami':
        outputComponent = <AboutOutput />;
        break;
      case 'skills':
      case 'ls skills':
        outputComponent = <SkillsOutput />;
        break;
      case 'exp':
      case 'experience':
      case 'career':
      case 'git log':
        outputComponent = <ExperienceOutput />;
        break;
      case 'projects':
      case 'platforms':
      case 'work':
        outputComponent = <ProjectsOutput />;
        break;
      case 'tools':
      case 'built':
      case 'apps':
        outputComponent = <ToolsOutput />;
        break;
      case 'achievements':
      case 'logs':
      case 'awards':
        outputComponent = <AchievementsOutput />;
        break;
      case 'resume':
      case 'cat resume':
      case 'cv':
        outputComponent = <ResumeOutput />;
        break;
      case 'contact':
      case 'email':
      case 'hire':
        outputComponent = <ContactOutput />;
        break;
      case 'sudo hire':
      case 'hire me':
        outputComponent = <SudoHireOutput />;
        break;
      case 'matrix':
        outputComponent = <MatrixOutput />;
        break;
      case 'theme':
        const themes = ['green', 'cyan', 'amber', 'purple'];
        const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
        setTheme(nextTheme);
        outputComponent = (
          <div className={styles.systemMsg}>
            <FiSun size={14} /> Theme updated to <span className={styles.accentText}>{nextTheme}</span> mode!
          </div>
        );
        break;
      default:
        outputComponent = (
          <div className={styles.errorMsg}>
            bash: command not found: <span className={styles.badCmd}>{cleanCmd}</span>.
            Type <button className={styles.linkCmd} onClick={() => executeCommand('help')}>help</button> for available commands.
          </div>
        );
    }

    const newEntry = {
      id: Date.now() + Math.random(),
      cmd: isInit ? null : cleanCmd,
      component: outputComponent,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour12: false }),
    };

    setHistory(prev => [...prev, newEntry]);
    if (!isInit) {
      setCmdHistory(prev => [cleanCmd, ...prev]);
      setHistoryIndex(-1);
    }
    setInputVal('');
  };

  // Keyboard navigation (Enter, Up, Down, Tab)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0 && historyIndex < cmdHistory.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = COMMANDS.find(c => c.cmd.startsWith(inputVal.toLowerCase()));
      if (match) {
        setInputVal(match.cmd);
      }
    }
  };

  return (
    <div className={`${styles.cliContainer} theme-${theme}`} onClick={handleTerminalClick}>
      {/* Top CLI Header / Toolbar */}
      <div className={styles.cliHeader}>
        <div className={styles.winControls}>
          <span className={`${styles.dot} ${styles.red}`} />
          <span className={`${styles.dot} ${styles.yellow}`} />
          <span className={`${styles.dot} ${styles.green}`} />
        </div>
        <div className={styles.winTitle}>
          <FiTerminal className={styles.titleIcon} /> harsha@sdet-portfolio: ~ (zsh)
        </div>
        <div className={styles.headerRight}>
          <button className={styles.themeToggle} onClick={() => executeCommand('theme')} title="Toggle Color Accent">
            <FiSun size={13} /> {theme}
          </button>
        </div>
      </div>

      {/* Quick Navigation Action Bar */}
      <div className={styles.quickBar}>
        <span className={styles.quickLabel}>QUICK COMMANDS:</span>
        <div className={styles.quickButtons}>
          {COMMANDS.map(c => (
            <button
              key={c.cmd}
              className={`${styles.quickBtn} ${c.cmd === 'resume' ? styles.quickBtnHighlight : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                executeCommand(c.cmd);
              }}
            >
              {c.icon} {c.cmd}
            </button>
          ))}
        </div>
      </div>

      {/* Main Terminal Screen History Output */}
      <div className={styles.cliBody}>
        {history.map((item) => (
          <div key={item.id} className={styles.historyBlock}>
            {item.cmd && (
              <div className={styles.commandLine}>
                <span className={styles.promptUser}>harsha</span>
                <span className={styles.promptAt}>@</span>
                <span className={styles.promptHost}>portfolio</span>
                <span className={styles.promptPath}>:~ $</span>
                <span className={styles.commandText}>{item.cmd}</span>
                <span className={styles.timeTag}>[{item.timestamp}]</span>
              </div>
            )}
            <div className={styles.outputBlock}>{item.component}</div>
          </div>
        ))}

        {/* Current Active Command Input Line */}
        <div className={styles.activePromptLine}>
          <span className={styles.promptUser}>harsha</span>
          <span className={styles.promptAt}>@</span>
          <span className={styles.promptHost}>portfolio</span>
          <span className={styles.promptPath}>:~ $</span>
          <input
            ref={inputRef}
            type="text"
            className={styles.cliInput}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type command (e.g. 'help', 'resume', 'skills', 'about')..."
            autoFocus
            spellCheck="false"
            autoComplete="off"
          />
          <button
            className={styles.sendBtn}
            onClick={() => executeCommand(inputVal)}
            title="Execute Command"
          >
            <FiCornerDownLeft size={14} />
          </button>
        </div>
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   COMMAND OUTPUT COMPONENTS
───────────────────────────────────────────── */

// 1. WELCOME / BOOT
function WelcomeOutput() {
  const asciiArt = [
    "  █████   █████                             █████                   █████   ████    ███████████  ",
    " ░░███   ░░███                             ░░███                   ░░███   ███░    ░░███░░░░░███ ",
    "  ░███    ░███   ██████   ████████   █████  ░███████    ██████      ░███  ███       ░███    ░███ ",
    "  ░███████████  ░░░░░███ ░░███░░███ ███░░   ░███░░███  ░░░░░███     ░███████        ░██████████  ",
    "  ░███░░░░░███   ███████  ░███ ░░░ ░░█████  ░███ ░███   ███████     ░███░░███       ░███░░░░░███ ",
    "  ░███    ░███  ███░░███  ░███      ░░░░███ ░███ ░███  ███░░███     ░███ ░░███      ░███    ░███ ",
    "  █████   █████░░████████ █████     ██████  ████ █████░░████████    █████ ░░████    █████   █████",
    " ░░░░░   ░░░░░  ░░░░░░░░ ░░░░░     ░░░░░░  ░░░░ ░░░░░  ░░░░░░░░    ░░░░░   ░░░░    ░░░░░   ░░░░░ "
  ].join('\n');

  return (
    <div className={styles.welcomeContainer}>
      <pre className={styles.asciiBanner}>{asciiArt}</pre>
      <div className={styles.welcomeSubtitle}>
        Software Development Engineer in Test (SDET) | Automation Architect | AI Platform Tester
      </div>
    </div>
  );
}

// 2. HELP
function HelpOutput({ onRun }) {
  return (
    <div className={styles.outputBox}>
      <div className={styles.outputTitle}>
        <FiBookOpen size={16} /> Available Terminal Commands
      </div>
      <div className={styles.helpGrid}>
        {COMMANDS.map(c => (
          <div key={c.cmd} className={styles.helpItem} onClick={() => onRun(c.cmd)}>
            <span className={styles.helpCmd}>{c.cmd}</span>
            <span className={styles.helpDesc}>{c.desc}</span>
          </div>
        ))}
        <div className={styles.helpItem} onClick={() => onRun('sudo hire')}>
          <span className={styles.helpCmd}>sudo hire</span>
          <span className={styles.helpDesc}>Hire Harsha for SDET / QE roles (Fast track)</span>
        </div>
        <div className={styles.helpItem} onClick={() => onRun('theme')}>
          <span className={styles.helpCmd}>theme</span>
          <span className={styles.helpDesc}>Toggle terminal color themes (Green, Cyan, Amber, Purple)</span>
        </div>
      </div>
    </div>
  );
}

// 3. ABOUT
function AboutOutput() {
  return (
    <div className={styles.outputBox}>
      <div className={styles.outputTitle}>
        <FiUser size={16} /> Profile & Engineering Background
      </div>
      <div className={styles.aboutGrid}>
        <div className={styles.profileCard}>
          <div className={styles.profileInitials}>HKR</div>
          <h3 className={styles.profileName}>{personal.name}</h3>
          <p className={styles.profileRole}>{personal.title}</p>
          <div className={styles.profileLoc}>
            <FiMapPin size={12} /> {personal.location}
          </div>
          <div className={styles.profileBadge}>
            <FiCheckCircle size={12} color="var(--accent-color)" /> {personal.yearsExp} Years Exp · Open to Roles
          </div>
        </div>
        <div className={styles.aboutTextCol}>
          {summary.map((para, i) => (
            <p key={i} className={styles.summaryPara}>
              <span className={styles.commentPrefix}>// Section {i + 1}: </span>
              {para}
            </p>
          ))}
          <div className={styles.eduBlock}>
            <span className={styles.eduLabel}>
              <FiBookOpen size={14} /> Education:
            </span> {education.degree} — {education.college} ({education.year})
          </div>
        </div>
      </div>
    </div>
  );
}

// 4. SKILLS
function SkillsOutput() {
  return (
    <div className={styles.outputBox}>
      <div className={styles.outputTitle}>
        <FiCode size={16} /> Core Technical Stack & Capabilities
      </div>
      <div className={styles.skillsGrid}>
        {skills.map((group) => (
          <div key={group.category} className={styles.skillCard}>
            <div className={styles.skillHeader} style={{ color: group.color }}>
              <span>{renderIcon(group.icon, 16)}</span> {group.category}
            </div>
            <div className={styles.skillTags}>
              {group.items.map(item => (
                <span key={item} className={styles.skillTag} style={{ borderColor: `${group.color}40`, color: group.color }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 5. EXPERIENCE
function ExperienceOutput() {
  return (
    <div className={styles.outputBox}>
      <div className={styles.outputTitle}>
        <FiBriefcase size={16} /> Career Log (4+ Years at EOX Vantage)
      </div>
      <div className={styles.expHeader}>
        <strong>Company:</strong> {experience.company} ({experience.location}) | <strong>Duration:</strong> {experience.duration}
      </div>

      <div className={styles.gitTimeline}>
        {experience.progression.map((role, idx) => (
          <div key={role} className={styles.gitCommitRow}>
            <span className={styles.gitCommitDot} />
            <span className={styles.gitHash}>c0mmit-{idx + 1}a</span>
            <span className={styles.gitRoleTitle}>{role}</span>
            {idx === experience.progression.length - 1 && <span className={styles.gitHead}>(HEAD -&gt; main)</span>}
          </div>
        ))}
      </div>

      <div className={styles.respHeaderTitle}># Key Responsibilities & Achievements:</div>
      <ul className={styles.respList}>
        {experience.responsibilities.map((r, i) => (
          <li key={i} className={styles.respLine}>
            <span className={styles.bullet}>&gt;</span> {r}
          </li>
        ))}
      </ul>
    </div>
  );
}

// 6. PROJECTS / PLATFORMS
function ProjectsOutput() {
  return (
    <div className={styles.outputBox}>
      <div className={styles.outputTitle}>
        <FiBox size={16} /> Products & Platforms Validated
      </div>
      <div className={styles.projectsGrid}>
        {products.map(p => (
          <div key={p.name} className={styles.projectCard}>
            <div className={styles.projectHeader}>
              <span className={styles.projectIcon}>{renderIcon(p.icon, 20)}</span>
              <div>
                <h4 className={styles.projectName}>{p.name}</h4>
                <div className={styles.projectDomain} style={{ color: p.domainColor }}>{p.domain}</div>
              </div>
            </div>
            <p className={styles.projectDesc}>{p.description}</p>
            <div className={styles.projectHighlights}>
              {p.highlights.map((h, hi) => (
                <div key={hi} className={styles.hItem}>• {h}</div>
              ))}
            </div>
            <div className={styles.techBadges}>
              {p.tech.map(t => (
                <span key={t} className={styles.tBadge}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 7. TOOLS
function ToolsOutput() {
  return (
    <div className={styles.outputBox}>
      <div className={styles.outputTitle}>
        <FiTool size={16} /> 4 Internal Engineering Tools Built by Harsha
      </div>
      <div className={styles.toolsGrid}>
        {tools.map(tool => (
          <div key={tool.name} className={styles.toolCard}>
            <div className={styles.toolHeader}>
              <span className={styles.toolIcon}>{renderIcon(tool.icon, 20)}</span>
              <div>
                <h4 className={styles.toolName}>{tool.name}</h4>
                <span className={styles.toolType} style={{ color: tool.color }}>{tool.type}</span>
              </div>
            </div>
            <p className={styles.toolDesc}>{tool.description}</p>
            <div className={styles.toolImpact}>
              <FiZap size={14} /> <strong>Impact:</strong> {tool.impact}
            </div>
            <div className={styles.toolTech}>
              {tool.tech.map(t => (
                <span key={t} className={styles.toolChip} style={{ color: tool.color, borderColor: `${tool.color}40` }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 8. ACHIEVEMENTS
function AchievementsOutput() {
  return (
    <div className={styles.outputBox}>
      <div className={styles.outputTitle}>
        <FiAward size={16} /> Key Engineering Achievements & Impact Logs
      </div>
      <div className={styles.achList}>
        {achievements.map((item, i) => (
          <div key={i} className={styles.achRow}>
            <span className={styles.achIcon}>{renderIcon(item.icon, 18)}</span>
            <div className={styles.achText}>
              <strong className={styles.achTitle}>[{String(i + 1).padStart(2, '0')}] {item.title}:</strong> {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 9. RESUME OUTPUT (COMPLETE FORMATTED RESUME + DOWNLOAD)
function ResumeOutput() {
  return (
    <div className={styles.outputBox}>
      <div className={styles.resumeBanner}>
        <div className={styles.outputTitle}>
          <FiFileText size={16} /> Master Resume — Harsha K R
        </div>
        <div className={styles.resumeActionBtns}>
          <a
            href={`mailto:${personal.email}?subject=Requesting%20Resume%20Copy`}
            className={styles.downloadBtn}
          >
            <FiDownload size={14} /> Request Resume Copy / Email
          </a>
        </div>
      </div>

      <div className={styles.resumePaper}>
        <div className={styles.resHeader}>
          <h1>{personal.name}</h1>
          <h2>{personal.title}</h2>
          <div className={styles.resContactLine}>
            <FiMapPin size={12} /> {personal.location} | <FiPhone size={12} /> {personal.phone} | <FiMail size={12} /> {personal.email}
          </div>
          <div className={styles.resContactLine}>
            <FiLinkedin size={12} /> <a href={personal.linkedin} target="_blank" rel="noreferrer">LinkedIn</a> | <FiGithub size={12} /> <a href={personal.github} target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>

        <div className={styles.resSection}>
          <div className={styles.resSectionTitle}>SUMMARY</div>
          {summary.map((para, i) => (
            <p key={i} className={styles.resPara}>{para}</p>
          ))}
        </div>

        <div className={styles.resSection}>
          <div className={styles.resSectionTitle}>PROFESSIONAL EXPERIENCE</div>
          <div className={styles.resJobHeader}>
            <div>
              <strong>EOX Vantage Pvt. Ltd.</strong> — {personal.title}
            </div>
            <div>{experience.duration} | {experience.location}</div>
          </div>
          <div className={styles.resProgressionLine}>
            <em>Career Progression:</em> {experience.progression.join(" ➔ ")}
          </div>
          <ul className={styles.resBulletList}>
            {experience.responsibilities.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>

        <div className={styles.resSection}>
          <div className={styles.resSectionTitle}>INTERNAL TOOLS & AI APPLICATIONS BUILT</div>
          {tools.map((tool) => (
            <div key={tool.name} className={styles.resToolBlock}>
              <strong>{tool.name}</strong> ({tool.type}) — <em>{tool.impact}</em>
              <p className={styles.resPara}>{tool.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.resSection}>
          <div className={styles.resSectionTitle}>CORE TECHNICAL SKILLS</div>
          <div className={styles.resSkillsGrid}>
            {skills.map((s) => (
              <div key={s.category}>
                <strong>{s.category}:</strong> {s.items.join(', ')}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.resSection}>
          <div className={styles.resSectionTitle}>EDUCATION</div>
          <p className={styles.resPara}>
            <strong>{education.degree}</strong> — {education.college} ({education.university}), Year: {education.year}
          </p>
        </div>
      </div>
    </div>
  );
}

// 10. CONTACT
function ContactOutput() {
  return (
    <div className={styles.outputBox}>
      <div className={styles.outputTitle}>
        <FiMail size={16} /> Contact & Connectivity Options
      </div>
      <div className={styles.contactCardsGrid}>
        <a href={`mailto:${personal.email}`} className={styles.cCard}>
          <FiMail className={styles.cIcon} />
          <div>
            <div className={styles.cLabel}>Email</div>
            <div className={styles.cVal}>{personal.email}</div>
          </div>
        </a>
        <a href={`tel:${personal.phone}`} className={styles.cCard}>
          <FiPhone className={styles.cIcon} />
          <div>
            <div className={styles.cLabel}>Phone</div>
            <div className={styles.cVal}>{personal.phone}</div>
          </div>
        </a>
        <a href={personal.linkedin} target="_blank" rel="noreferrer" className={styles.cCard}>
          <FiLinkedin className={styles.cIcon} />
          <div>
            <div className={styles.cLabel}>LinkedIn</div>
            <div className={styles.cVal}>harsha-k-r</div>
          </div>
        </a>
        <a href={personal.github} target="_blank" rel="noreferrer" className={styles.cCard}>
          <FiGithub className={styles.cIcon} />
          <div>
            <div className={styles.cLabel}>GitHub</div>
            <div className={styles.cVal}>harsharobo222</div>
          </div>
        </a>
      </div>
    </div>
  );
}

// 11. SUDO HIRE
function SudoHireOutput() {
  return (
    <div className={styles.outputBox}>
      <div className={styles.sudoSuccess}>
        <FiStar size={18} /> [ACCESS GRANTED] Sudo permissions unlocked!
      </div>
      <p>Thank you for considering Harsha K R for your engineering team!</p>
      <p>Direct contact line: <strong>{personal.phone}</strong> | Email: <strong>{personal.email}</strong></p>
      <div className={styles.sudoBtnRow}>
        <a href={`mailto:${personal.email}?subject=Job%20Opportunity%20for%20Harsha%20K%20R`} className={styles.ctaPillPrimary}>
          <FiMail size={14} /> Send Hiring Email directly
        </a>
      </div>
    </div>
  );
}

// 12. MATRIX
function MatrixOutput() {
  return (
    <div className={styles.matrixAnim}>
      01010011 01000100 01000101 01010100 00100000 01001000 01000001 01010010 01010011 01001000 01000001
      <br />
      Wake up, recruiter... The matrix has you. Harsha is ready to automate your quality engineering pipeline. <FiTrendingUp size={14} />
    </div>
  );
}
