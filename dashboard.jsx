import { useState, useEffect, useRef } from "react";

/* ─── REAL DATA ─── */
const PROJECTS = [
  { id: 1, title: "TECHHACK — TOOLBOX DE PENTEST", description: "Développement d'une toolbox automatisée intégrant Nmap, Metasploit, SQLMap et OpenVAS pour optimiser les processus de tests d'intrusion. Objectif : -40% de temps de test.", severity: "CRITICAL", date: "2025", tags: ["PYTHON", "REACT", "DOCKER", "METASPLOIT", "NMAP"], category: "Offensive Security" },
  { id: 2, title: "MIGRATION CLOUD AZURE AVD", description: "Migration complète d'une infrastructure RDS OVH vers Azure Virtual Desktop pour 50+ utilisateurs répartis sur 10 agences. Haute disponibilité 99.99%.", severity: "HIGH", date: "2024", tags: ["AZURE", "AVD", "ENTRA ID", "FSLOGIX", "POWERSHELL"], category: "Cloud Infrastructure" },
  { id: 3, title: "SOC EXTERNALISÉ — AUDIOPRO", description: "Conception d'un SOC hybride pour un réseau de 30 centres d'audioprothèses. Surveillance continue, détection proactive et conformité RGPD/HDS.", severity: "HIGH", date: "2025", tags: ["SIEM", "RGPD", "SOC", "CHIFFREMENT", "RBAC"], category: "Blue Team / SOC" },
];
const SKILLS = [
  { category: "Offensive Security", items: ["Tests d'intrusion / Pentesting", "Red Team & Blue Team", "Injection de code & exploitation", "Metasploit, Nmap, Burp Suite, SQLMap"] },
  { category: "Infrastructure & Cloud", items: ["Azure Virtual Desktop & Bastion", "Microsoft 365, Entra ID, Intune", "Active Directory & GPO", "PowerShell scripting & automation"] },
  { category: "Réseau & Sécurité", items: ["Firewall, IDS/IPS, VPN IPsec", "Architecture Zero-Trust", "Cryptographie, SSL/TLS", "Cisco IronPort, pfSense"] },
  { category: "SOC & Forensique", items: ["SIEM & supervision SOC", "Gestion de crise (CyberBit)", "Conformité RGPD, HDS, ANSSI", "Journalisation & audit de sécurité"] },
];
const STATS = [
  { value: "3", label: "PROJETS MAJEURS" },
  { value: "50+", label: "POSTES MIGRÉS CLOUD" },
  { value: "99.99%", label: "DISPONIBILITÉ INFRA" },
  { value: "2+", label: "ANS D'ALTERNANCE" },
];
const EXPERIENCE = [
  { role: "Administrateur Cybersécurité", company: "TECHNEMA", period: "SEPT. 2024 → PRÉSENT", tasks: ["Configuration solutions de sécurité", "Audits & tests d'intrusion", "Veille technologique cyber"] },
  { role: "Admin Système & Réseaux", company: "TECHNEMA", period: "2023 → 2024", tasks: ["Support N1-N3", "Administration parc informatique", "Déploiement infrastructures clients"] },
  { role: "Technicien Informatique", company: "CLINIQUE VAUBAN", period: "2021 → 2023", tasks: ["Gestion parc IT", "Traitement incidents", "Maintenance matériel"] },
];
const TERMINAL_LINES = [
  { prompt: "visitor@lr-sec:~$", cmd: "whoami", delay: 0 },
  { output: "Lilian RIGAUD — Administrateur Cybersécurité", delay: 600 },
  { prompt: "visitor@lr-sec:~$", cmd: "cat mission.txt", delay: 1200 },
  { output: "Sécuriser les infrastructures critiques, une vulnérabilité à la fois.", delay: 1800 },
  { prompt: "visitor@lr-sec:~$", cmd: "ls ./formation/", delay: 2400 },
  { output: "Master_Cyber_SupDeVinci  LP_UTEC  BTS_SIO_SISR  BAC_STI2D", delay: 3000 },
  { prompt: "visitor@lr-sec:~$", cmd: "cat stack.txt | head -5", delay: 3600 },
  { output: "Azure · Pentest · SIEM · Active Directory · PowerShell · Docker", delay: 4200 },
  { prompt: "visitor@lr-sec:~$", cmd: "uptime --status", delay: 4800 },
  { output: "Système opérationnel. Toutes les défenses sont actives. ◆", delay: 5400 },
];
const severityStyles = {
  CRITICAL: { bg: "rgba(255,255,255,0.12)", border: "rgba(255,255,255,0.35)", color: "#ffffff" },
  HIGH: { bg: "rgba(200,200,200,0.10)", border: "rgba(200,200,200,0.30)", color: "#d0d0d0" },
};

/* ─── HOOKS ─── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─── COMPONENTS ─── */
function ScanlineOverlay() {
  return <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.008) 2px, rgba(255,255,255,0.008) 4px)" }} />;
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 20); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  const items = ["DASHBOARD", "CASE STUDIES", "LAB REPORTS", "CONTACT"];
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 clamp(16px,4vw,40px)", height: 56, background: scrolled ? "rgba(10,10,12,0.95)" : "rgba(10,10,12,0.8)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.06)", transition: "background 0.3s", fontFamily: "'Share Tech Mono', monospace" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 28, height: 28, border: "1.5px solid rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#999", borderRadius: 2 }}>🔒</div>
        <span style={{ fontSize: 14, color: "#e0e0e0", letterSpacing: 2, fontWeight: 700 }}>LR<span style={{ color: "#666" }}>_</span>SEC<span style={{ color: "#666" }}>.</span></span>
      </div>
      <div className="nav-links" style={{ display: "flex", gap: 32, alignItems: "center" }}>
        {items.map(item => (
          <a key={item} href="#" style={{ fontSize: 11, letterSpacing: 1.5, color: item === "DASHBOARD" ? "#fff" : "#666", textDecoration: "none", borderBottom: item === "DASHBOARD" ? "1px solid rgba(255,255,255,0.4)" : "none", paddingBottom: 2, transition: "color 0.2s", fontFamily: "'Rajdhani', sans-serif", fontWeight: 600 }}
            onMouseEnter={e => e.target.style.color = "#bbb"} onMouseLeave={e => e.target.style.color = item === "DASHBOARD" ? "#fff" : "#666"}>{item}</a>
        ))}
      </div>
      <button style={{ padding: "7px 18px", fontSize: 10, letterSpacing: 1.5, background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "#ccc", cursor: "pointer", fontFamily: "'Share Tech Mono', monospace", transition: "all 0.2s" }}
        onMouseEnter={e => { e.target.style.background = "rgba(255,255,255,0.08)"; e.target.style.borderColor = "rgba(255,255,255,0.4)"; }}
        onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.borderColor = "rgba(255,255,255,0.2)"; }}>DOWNLOAD CV</button>
    </nav>
  );
}

function StatusBar({ text = "SYSTEM OPERATIONAL: ACTIVE MONITORING" }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 16px", fontSize: 10, letterSpacing: 2, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#888", fontFamily: "'Share Tech Mono', monospace" }}>
      <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#888", boxShadow: "0 0 6px rgba(150,150,150,0.5)", animation: "pulse 2s ease-in-out infinite" }} />
      {text}
    </div>
  );
}

function TypingText({ text, delay = 0, speed = 45, style = {} }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setStarted(true), delay); return () => clearTimeout(t); }, [delay]);
  useEffect(() => { if (!started) return; let i = 0; const iv = setInterval(() => { i++; setDisplayed(text.slice(0, i)); if (i >= text.length) clearInterval(iv); }, speed); return () => clearInterval(iv); }, [started, text, speed]);
  return <span style={style}>{displayed}<span style={{ opacity: displayed.length < text.length ? 1 : 0, animation: "blink 0.8s step-end infinite", color: "#888" }}>▌</span></span>;
}

function GlitchText({ children, style = {} }) {
  const [g, setG] = useState(false);
  return (
    <span style={{ position: "relative", display: "inline-block", ...style, ...(g ? { textShadow: "-2px 0 rgba(255,255,255,0.15), 2px 0 rgba(150,150,150,0.1)", transform: "translate(1px,0)" } : {}), transition: "all 0.05s" }}
      onMouseEnter={() => { setG(true); setTimeout(() => setG(false), 150); setTimeout(() => setG(true), 200); setTimeout(() => setG(false), 300); }}>{children}</span>
  );
}

function Terminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [ref, inView] = useInView(0.3);
  useEffect(() => { if (!inView) return; TERMINAL_LINES.forEach((l, i) => { setTimeout(() => setVisibleLines(i + 1), l.delay); }); }, [inView]);
  return (
    <div ref={ref} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden", maxWidth: 720, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 16px", background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        {[0.15, 0.10, 0.07].map((o, i) => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: `rgba(255,255,255,${o})` }} />)}
        <span style={{ marginLeft: 12, fontSize: 10, color: "#555", fontFamily: "'Share Tech Mono', monospace", letterSpacing: 1 }}>lr-sec-terminal — bash</span>
      </div>
      <div style={{ padding: "20px 24px", fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, lineHeight: 1.9 }}>
        {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i} style={{ opacity: 0, animation: "fadeInLine 0.3s ease forwards", animationDelay: `${i * 0.05}s` }}>
            {line.prompt ? <span><span style={{ color: "#777" }}>{line.prompt} </span><span style={{ color: "#ccc" }}>{line.cmd}</span></span>
              : <span style={{ color: "#999", paddingLeft: 4 }}>{line.output}</span>}
          </div>
        ))}
        {visibleLines >= TERMINAL_LINES.length && <div style={{ marginTop: 4 }}><span style={{ color: "#777" }}>visitor@lr-sec:~$ </span><span style={{ animation: "blink 0.8s step-end infinite", color: "#888" }}>▌</span></div>}
      </div>
    </div>
  );
}

function SeverityBadge({ severity }) {
  const s = severityStyles[severity] || severityStyles.HIGH;
  return <span style={{ display: "inline-block", padding: "3px 10px", fontSize: 9, letterSpacing: 1.5, background: s.bg, border: `1px solid ${s.border}`, color: s.color, fontFamily: "'Share Tech Mono', monospace", fontWeight: 600 }}>{severity}</span>;
}

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const [ref, visible] = useInView(0.15);
  const icons = ["⚔", "☁", "🛡"];
  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: hovered ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)", border: `1px solid ${hovered ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)"}`, borderRadius: 2, overflow: "hidden", cursor: "pointer", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: `all 0.6s cubic-bezier(0.23,1,0.32,1) ${index * 0.15}s` }}>
      <div style={{ height: 180, position: "relative", overflow: "hidden", background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`, backgroundSize: "28px 28px" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 110, height: 110, border: "1px solid rgba(255,255,255,0.06)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 65, height: 65, border: "1px solid rgba(255,255,255,0.04)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: 22, color: "rgba(255,255,255,0.07)" }}>{icons[index]}</div>
        {hovered && <div style={{ position: "absolute", left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)", animation: "scanDown 1.5s ease-in-out infinite" }} />}
      </div>
      <div style={{ padding: "20px 24px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <SeverityBadge severity={project.severity} />
          <span style={{ fontSize: 10, color: "#555", letterSpacing: 1.5, fontFamily: "'Share Tech Mono', monospace" }}>{project.date}</span>
        </div>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#ddd", letterSpacing: 1, fontFamily: "'Rajdhani', sans-serif", margin: "0 0 10px", textTransform: "uppercase" }}>{project.title}</h3>
        <p style={{ fontSize: 12, color: "#777", lineHeight: 1.7, margin: "0 0 18px", fontFamily: "'IBM Plex Mono', monospace" }}>{project.description}</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
          {project.tags.map(tag => <span key={tag} style={{ padding: "3px 10px", fontSize: 9, letterSpacing: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#888", fontFamily: "'Share Tech Mono', monospace" }}>{tag}</span>)}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16 }}>
          <span style={{ fontSize: 10, letterSpacing: 2, color: hovered ? "#ccc" : "#666", fontFamily: "'Share Tech Mono', monospace", fontWeight: 600, transition: "color 0.3s" }}>EXPLORE FINDINGS</span>
          <span style={{ color: hovered ? "#ccc" : "#666", fontSize: 16, transform: hovered ? "translateX(4px)" : "translateX(0)", transition: "all 0.3s" }}>→</span>
        </div>
      </div>
    </div>
  );
}

function StatsBar() {
  const [ref, visible] = useInView(0.3);
  return (
    <div ref={ref} className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderTop: "1px solid rgba(255,255,255,0.10)" }}>
      {STATS.map((s, i) => (
        <div key={i} style={{ textAlign: "center", padding: "40px 20px", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: `all 0.6s ease ${i * 0.12}s` }}>
          <div style={{ fontSize: 36, fontWeight: 300, color: "#ddd", fontFamily: "'Rajdhani', sans-serif", letterSpacing: -1, marginBottom: 8 }}>{s.value}</div>
          <div style={{ fontSize: 9, color: "#555", letterSpacing: 2, fontFamily: "'Share Tech Mono', monospace" }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function SkillsSection() {
  const [ref, visible] = useInView(0.2);
  return (
    <div ref={ref} className="skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
      {SKILLS.map((group, gi) => (
        <div key={gi} style={{ padding: 28, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 2, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: `all 0.5s ease ${gi * 0.1}s` }}>
          <h4 style={{ fontSize: 10, letterSpacing: 2, color: "#888", fontFamily: "'Share Tech Mono', monospace", margin: "0 0 18px", textTransform: "uppercase", paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{group.category}</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {group.items.map((item, ii) => <div key={ii} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: "#aaa", fontFamily: "'IBM Plex Mono', monospace" }}><span style={{ color: "#555", fontSize: 8 }}>◆</span>{item}</div>)}
          </div>
        </div>
      ))}
    </div>
  );
}

function ExperienceTimeline() {
  const [ref, visible] = useInView(0.15);
  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {EXPERIENCE.map((exp, i) => (
        <div key={i} className="exp-row" style={{ display: "flex", gap: 32, padding: "28px 0", borderBottom: i < EXPERIENCE.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none", opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-20px)", transition: `all 0.5s ease ${i * 0.12}s` }}>
          <div style={{ minWidth: 200 }}>
            <div style={{ fontSize: 9, letterSpacing: 2, color: "#555", fontFamily: "'Share Tech Mono', monospace", marginBottom: 8 }}>{exp.period}</div>
            <div style={{ fontSize: 11, color: "#777", fontFamily: "'Share Tech Mono', monospace", letterSpacing: 1 }}>{exp.company}</div>
          </div>
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 600, color: "#ddd", fontFamily: "'Rajdhani', sans-serif", margin: "0 0 12px", letterSpacing: 0.5 }}>{exp.role}</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {exp.tasks.map((task, ti) => <div key={ti} style={{ fontSize: 12, color: "#888", fontFamily: "'IBM Plex Mono', monospace", display: "flex", alignItems: "center", gap: 8 }}><span style={{ color: "#555", fontSize: 6 }}>●</span>{task}</div>)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SectionHeader({ label, title, subtitle }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <span style={{ fontSize: 9, letterSpacing: 3, color: "#555", fontFamily: "'Share Tech Mono', monospace", display: "block", marginBottom: 16 }}>{label}</span>
      <h2 style={{ fontSize: 36, fontWeight: 700, color: "#e0e0e0", fontFamily: "'Rajdhani', sans-serif", letterSpacing: 1, margin: 0 }}>{title}</h2>
      {subtitle && <p style={{ fontSize: 12, color: "#555", marginTop: 8, fontFamily: "'IBM Plex Mono', monospace" }}>{subtitle}</p>}
    </div>
  );
}

function Footer() {
  return (
    <footer style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px clamp(16px,4vw,40px)", borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.01)", fontFamily: "'Share Tech Mono', monospace", flexWrap: "wrap", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 12, color: "#555" }}>🔒</span>
        <span style={{ fontSize: 11, color: "#666", letterSpacing: 1.5 }}>SEC_OPS CONSOLE</span>
      </div>
      <span style={{ fontSize: 10, color: "#444", letterSpacing: 1.5 }}>© 2025 LILIAN RIGAUD. ALL RIGHTS RESERVED.</span>
      <div style={{ display: "flex", gap: 16 }}>
        {["GitHub", "LinkedIn", "Email"].map(s => <a key={s} href="#" style={{ fontSize: 10, color: "#555", letterSpacing: 1, textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#aaa"} onMouseLeave={e => e.target.style.color = "#555"}>{s.toUpperCase()}</a>)}
      </div>
    </footer>
  );
}

/* ─── MAIN PAGE ─── */
export default function Dashboard() {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0c", color: "#e0e0e0", position: "relative", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes fadeInLine{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}
        @keyframes scanDown{0%{top:0}100%{top:100%}}
        @keyframes gridShift{0%{background-position:0 0}100%{background-position:60px 60px}}
        @keyframes heroFadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:#0a0a0c}::-webkit-scrollbar-thumb{background:#222;border-radius:3px}
        @media(max-width:900px){.projects-grid{grid-template-columns:1fr!important}.skills-grid{grid-template-columns:1fr!important}.stats-grid{grid-template-columns:repeat(2,1fr)!important}.nav-links{display:none!important}.hero-title{font-size:36px!important}.hero-subtitle{font-size:28px!important}.exp-row{flex-direction:column!important;gap:12px!important}}
      `}</style>
      <ScanlineOverlay />
      <Navbar />
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)", backgroundSize: "60px 60px", animation: "gridShift 20s linear infinite" }} />

      {/* HERO */}
      <section style={{ position: "relative", zIndex: 1, padding: "140px clamp(24px,5vw,60px) 80px", minHeight: "92vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ position: "absolute", top: 80, left: 40, width: 40, height: 40, borderLeft: "1px solid rgba(255,255,255,0.08)", borderTop: "1px solid rgba(255,255,255,0.08)" }} />
        <div style={{ position: "absolute", bottom: 40, right: 40, width: 40, height: 40, borderRight: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }} />
        <div style={{ animation: "heroFadeIn 0.8s ease forwards" }}><StatusBar /></div>
        <div style={{ marginTop: 40, animation: "heroFadeIn 0.8s ease 0.2s both" }}>
          <h1 className="hero-title" style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, fontFamily: "'Rajdhani', sans-serif", letterSpacing: -1, color: "#f0f0f0" }}><TypingText text="LILIAN RIGAUD" delay={400} speed={55} /></h1>
          <h2 className="hero-subtitle" style={{ fontSize: 44, fontWeight: 300, lineHeight: 1.2, fontFamily: "'Rajdhani', sans-serif", color: "#555", marginTop: 4 }}><GlitchText>CYBER ADMINISTRATOR</GlitchText></h2>
        </div>
        <p style={{ fontSize: 14, color: "#666", lineHeight: 1.8, fontFamily: "'IBM Plex Mono', monospace", maxWidth: 560, marginTop: 32, animation: "heroFadeIn 0.8s ease 0.5s both" }}>
          Administrateur Cybersécurité en alternance chez Technema. Étudiant en Master Cybersécurité à Sup de Vinci. Spécialisé en sécurité offensive, infrastructure cloud Azure et supervision SOC.
        </p>
        <div style={{ display: "flex", gap: 16, marginTop: 40, animation: "heroFadeIn 0.8s ease 0.7s both", flexWrap: "wrap" }}>
          <button style={{ padding: "12px 28px", fontSize: 11, letterSpacing: 2, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#ccc", cursor: "pointer", fontFamily: "'Share Tech Mono', monospace", transition: "all 0.3s" }}
            onMouseEnter={e => { e.target.style.background = "rgba(255,255,255,0.12)"; e.target.style.borderColor = "rgba(255,255,255,0.3)"; }}
            onMouseLeave={e => { e.target.style.background = "rgba(255,255,255,0.06)"; e.target.style.borderColor = "rgba(255,255,255,0.15)"; }}>EXPLORE CASE STUDIES →</button>
          <button style={{ padding: "12px 28px", fontSize: 11, letterSpacing: 2, background: "transparent", border: "1px solid rgba(255,255,255,0.08)", color: "#666", cursor: "pointer", fontFamily: "'Share Tech Mono', monospace", transition: "all 0.3s" }}
            onMouseEnter={e => { e.target.style.color = "#aaa"; e.target.style.borderColor = "rgba(255,255,255,0.15)"; }}
            onMouseLeave={e => { e.target.style.color = "#666"; e.target.style.borderColor = "rgba(255,255,255,0.08)"; }}>DOWNLOAD CV</button>
        </div>
        <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "heroFadeIn 1s ease 1.2s both" }}>
          <span style={{ fontSize: 9, color: "#444", letterSpacing: 2, fontFamily: "'Share Tech Mono', monospace" }}>SCROLL</span>
          <div style={{ width: 1, height: 30, background: "linear-gradient(to bottom, rgba(255,255,255,0.15), transparent)" }} />
        </div>
      </section>

      {/* TERMINAL */}
      <section style={{ position: "relative", zIndex: 1, padding: "60px clamp(24px,5vw,60px) 100px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ marginBottom: 40, textAlign: "center" }}><span style={{ fontSize: 9, letterSpacing: 3, color: "#555", fontFamily: "'Share Tech Mono', monospace" }}>// SYSTEM INTERFACE</span></div>
        <Terminal />
      </section>

      {/* PROJECTS */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px clamp(24px,5vw,60px)" }}>
        <SectionHeader label="// FEATURED OPERATIONS" title="CASE STUDIES" subtitle="Projets majeurs en cybersécurité, infrastructure cloud et SOC." />
        <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px clamp(24px,5vw,60px)" }}>
        <SectionHeader label="// PARCOURS PROFESSIONNEL" title="EXPÉRIENCE" subtitle="2+ ans d'alternance en administration système, réseaux et cybersécurité." />
        <ExperienceTimeline />
      </section>

      {/* SKILLS */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px clamp(24px,5vw,60px)" }}>
        <SectionHeader label="// CAPABILITIES" title="TECH STACK & SKILLS" />
        <SkillsSection />
      </section>

      {/* STATS */}
      <section style={{ position: "relative", zIndex: 1, padding: "40px clamp(24px,5vw,60px) 80px" }}>
        <StatsBar />
      </section>

      <Footer />
    </div>
  );
}
