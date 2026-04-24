import { useState, useEffect, useRef } from "react";
import profileImg from "./assets/RituPic.jpg";

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Professional Projects", id: "projects" },
  { label: "Personal Work", id: "blog" },
  { label: "Contact", id: "contact" }
];



const SKILLS = [
  { name: "Java", level: 92, color: "#00D8FF" },
  { name: "Springboot", level: 85, color: "#84CE24" },
  { name: "MySql", level: 80, color: "#3178C6" },
  { name: "React.JS", level: 75, color: "#FF6B6B" },
  { name: "Problem Solving", level: 70, color: "#E535AB" },
  { name: "AWS / Cloud", level: 65, color: "#FF9900" },
];


  const PROJECTS = [
  {
    id: 1,
    title: "AML Monitoring",
    desc: "Worked on Anti-Money Laundering system handling transaction monitoring, alerts, and compliance workflows.",
    tech: ["Java", "Spring Boot", "Oracle", "REST APIs"],
    color: "#FF6B6B",
    year: "2025",
  },
  {
    id: 2,
    title: "ERM [Enterprise Risk Management]",
    desc: "Developed modules for Enterprise Risk Management platform ensuring secure financial processing.",
    tech: ["Java", "Spring Boot", "MySQL"],
    color: "#00D8FF",
    year: "2024",
  },
  {
    id: 3,
    title: "AadhaarBank",
    desc: "Implemented Aadhaar-based authentication workflows with secure API integrations.",
    tech: ["Java", "REST APIs", "Encryption"],
    color: "#A78BFA",
    year: "2024",
  },
  
{
  id: 4,
  title: "DEAF",
  desc: "Developed and maintained DEAF (Depositor Education and Awareness Fund) module for banking applications, handling account transfers, validations, and regulatory compliance workflows.",
  tech: ["Java", "Spring Boot", "MySQL", "REST APIs"],
  color: "#34D399",
  year: "2026",
}
];

const BLOGS = [
  {
    id: 1,
    title: "Microservices Architecture",
    Desc: "Distributed Banking System with Service Registry",
    tech: "Spring Boot • Eureka • Kafka • Redis • API Gateway",
    color: "#00D8FF",
   
  },
  {
    id: 2,
    title: "Instagram Clone",
    Desc: "Social Media Application with Authentication",
    tech: "Spring Boot • React • JWT • MySQL",
    color: "#A78BFA",
  },
  {
    id: 3,
    title: "Product management System",
    Desc: "This project manages product data using a SQL Server database.The goal is streamlined product management",
    tech: ".Net • React  • MySQL",
    color: "#A78BFA",
  },
  {
    id: 4,
    title: "PizzaStory",
    Desc: "Full Stack Food Ordering Platform",
    tech: "Spring Boot • React • REST APIs • JWT",
    color: "#FF6B6B",
  },
];
const TIMELINE = [
  {
    year: "2024 - Present",
    role: "Software Engineer (Java Backend Developer)",
    company: "IDBI Intech, Mumbai",
    desc: "Working on enterprise-grade banking applications like AML, ERM, DEAF, and Aadhaar systems. Contributing to backend development, production support, multithreading, and performance optimization using Java 8, Spring Boot, REST APIs, and SQL."
  },
    {
    year: "2023",
    role: "Full Stack Developer Intern",
    company: "INFOTRIXS",
    desc: "Worked on Java-based full-stack projects involving REST APIs, Spring Boot backend, and React frontend integration with real-world deployment exposure."
  },
  {
    year: "2023",
    role: "Post Graduate Diploma in Advanced Computing (PG-DAC)",
    company: "CDAC",
    desc: "Completed full-stack development training with strong focus on Java, Spring Boot, SQL, Data Structures, and enterprise application development practices."
  },

  {
    year: "2017 - 2021",
    role: "B.Tech Mechanical Engineering",
    company: "Dr. Ram Manohar Lohia Awadh University",
    desc: "Graduated with strong analytical and problem-solving foundation. Built core engineering mindset that supports software development and system design thinking."
  }
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function AnimatedText({ text, visible, delay = 0 }) {
  return (
    <span style={{ display: "inline-block", overflow: "hidden" }}>
      <span style={{
        display: "inline-block",
        transform: visible ? "translateY(0)" : "translateY(110%)",
        transition: `transform 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}>{text}</span>
    </span>
  );
}

function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hov, setHov] = useState(false);
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e) => setHov(e.target.closest("a,button,[data-hover]") !== null);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
  }, []);
  return (
    <>
      <div style={{
        position: "fixed", left: pos.x, top: pos.y, width: hov ? 40 : 12, height: hov ? 40 : 12,
        borderRadius: "50%", background: "rgba(255,107,107,0.85)", pointerEvents: "none",
        transform: "translate(-50%,-50%)", transition: "width 0.2s, height 0.2s, background 0.2s",
        zIndex: 9999, mixBlendMode: "difference",
      }} />
      <div style={{
        position: "fixed", left: pos.x, top: pos.y, width: 32, height: 32, borderRadius: "50%",
        border: "1.5px solid rgba(255,107,107,0.5)", pointerEvents: "none",
        transform: "translate(-50%,-50%)", transition: "left 0.12s ease-out, top 0.12s ease-out",
        zIndex: 9998,
      }} />
    </>
  );
}

function Navbar({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? "14px 48px" : "22px 48px",
      background: scrolled ? "rgba(8,8,12,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
    }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-0.5px" }}>
        <span style={{ color: "#FF6B6B" }}>Ritu</span>Mishra
      </div>
      <div style={{ display: "flex", gap: 36 }}>
        {NAV_LINKS.map((l) => (
          <a  key={l.id}
    href={`#${l.id}`} data-hover onClick={() => setActive(l.label)}
            style={{
              fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif",
              color: active === l ? "#FF6B6B" : "rgba(255,255,255,0.6)",
              textDecoration: "none", transition: "color 0.2s",
              borderBottom: active === l ? "1px solid #FF6B6B" : "1px solid transparent",
              paddingBottom: 2,
            }}>
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);
  return (
    <section id="home" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "0 48px", position: "relative", overflow: "hidden",
      background: "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(255,107,107,0.12) 0%, transparent 70%), #08080C",
    }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div style={{ position: "absolute", top: "20%", right: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,250,0.12), transparent 70%)", pointerEvents: "none" }} />
<div
  style={{
    position: "relative",
    zIndex: 1,
    maxWidth: 900,
    display: "flex",
    flexDirection: "column",
    gap: 22
  }}
>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase",
          color: "#FF6B6B", marginBottom: 24,
          opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(16px)",
          transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
        }}>
       
        </p>
        <h1 style={{ margin: "0 0 8px", lineHeight: 1.05, fontFamily: "'Playfair Display', serif" }}>
          <div style={{ fontSize: "clamp(52px, 7vw, 96px)", fontWeight: 700, color: "#fff", overflow: "hidden" }}>
            <AnimatedText text="Ritu Mishra." visible={mounted} delay={0.2} />
          </div>
        </h1>
       <div style={{ marginTop: 8, marginBottom: 32 }}>
  <h2 style={{ overflow: "visible" }}>
    <div style={{ fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 700, fontFamily: "'Playfair Display', serif", overflow: "visible" }}>
      <span style={{ display: "inline-block", transform: mounted ? "translateY(0)" : "translateY(40px)", transition: "transform 0.75s cubic-bezier(0.22,1,0.36,1) 0.35s" }}>
        <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.35)", color: "transparent" }}>Full-Stack</span>{" "}
        <span style={{ color: "#FF6B6B" }}>Developer</span>
      </span>
    </div>
  </h2>
</div>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: "rgba(255,255,255,0.55)", maxWidth: 520, lineHeight: 1.7, marginBottom: 56,
          opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(40px)",
          transition: "opacity 0.6s ease 0.55s, transform 0.6s ease 0.55s",
        }}>
Java Backend Developer with 2+ years of experience building secure banking applications. Skilled in Spring Boot, REST APIs, SQL, and multithreading, delivering reliable and high-performance systems.        </p>
<div style={{ display: "flex", gap: 16, marginTop: 10, opacity: mounted ? 1 : 0, transition: "opacity 0.6s ease 0.7s" }}>          <a href="#projects" data-hover style={{
            padding: "14px 32px", background: "#FF6B6B", color: "#fff",
            fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: "0.04em",
            textDecoration: "none", borderRadius: 4, transition: "transform 0.2s, box-shadow 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(255,107,107,0.35)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
            View Projects ↗
          </a>
          <a href="#contact" data-hover style={{
            padding: "14px 32px", background: "transparent", color: "#fff",
            fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: "0.04em",
            textDecoration: "none", borderRadius: 4, border: "1px solid rgba(255,255,255,0.18)",
            transition: "border-color 0.2s, color 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,107,107,0.6)"; e.currentTarget.style.color = "#FF6B6B"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.color = "#fff"; }}>
            Let's Talk
          </a>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.4 }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#fff" }}>Scroll</span>
        <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)", animation: "scrollLine 2s ease-in-out infinite" }} />
      </div>
      <style>{`@keyframes scrollLine { 0%,100%{opacity:0.3;transform:scaleY(0.6) translateY(0)} 50%{opacity:1;transform:scaleY(1) translateY(4px)} }`}</style>
    </section>
  );
}

function About() {
  const [ref, visible] = useInView();
  return (
    <section id="about" ref={ref} style={{ padding: "120px 48px", background: "#0D0D14", position: "relative" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", color: "#FF6B6B", marginBottom: 20, opacity: visible ? 1 : 0, transition: "opacity 0.5s 0.1s" }}>
            About Me
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: 28,
            transform: visible ? "none" : "translateY(30px)", opacity: visible ? 1 : 0, transition: "all 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s",
          }}>
            Code is my<br /><span style={{ color: "#FF6B6B" }}>foundation </span>backend<br />is my Strength.
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: 16, opacity: visible ? 1 : 0, transition: "opacity 0.6s 0.35s" }}>
  Java Full stack Developer with 2+ years of experience building secure, scalable banking applications at IDBI Intech (AML, ERM, DEAF, Aadhaar systems).
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: 36, opacity: visible ? 1 : 0, transition: "opacity 0.6s 0.45s" }}>
  I specialize in Java 8, Spring Boot, REST APIs, SQL, and multithreading, with a strong focus on writing clean, reliable, and maintainable code. I enjoy solving complex backend problems and continuously improving system performance and stability.
          </p>
          <div style={{ display: "flex", gap: 40, opacity: visible ? 1 : 0, transition: "opacity 0.6s 0.55s" }}>
            {[["2+", "Years Experience"], ["4+", "Banking Projects"], ["500+", "DSA Problems"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, color: "#FF6B6B", lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "relative", opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(40px)", transition: "all 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s" }}>
          <div style={{ width: "100%", aspectRatio: "4/5", borderRadius: 8, background: "linear-gradient(135deg, #1a1a2e, #16213e)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: `url(${profileImg}) center/cover no-repeat` }} />
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 120, fontWeight: 700, color: "rgba(255,255,255,0.04)", userSelect: "none" }}>AN</div>
            <div style={{ position: "absolute", bottom: 24, left: 24, right: 24, padding: "20px 24px", background: "rgba(255,255,255,0.04)", borderRadius: 6, border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(8px)" }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, color: "#fff" }}>Ritu Mishra</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#FF6B6B", marginTop: 2 }}>Full-Stack Developer</div>
              <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
                {["JAVA", "MySql" ,"React.js"].map(t => (
                  <span key={t} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.06)", padding: "3px 10px", borderRadius: 20 }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div style={{ position: "absolute", top: -16, right: -16, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,107,107,0.15)", border: "1px solid rgba(255,107,107,0.3)" }} />
          <div style={{ position: "absolute", bottom: -24, left: -24, width: 120, height: 120, borderRadius: "50%", background: "rgba(167,139,250,0.08)", border: "1px solid rgba(167,139,250,0.2)" }} />
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const [ref, visible] = useInView();
  return (
    <section id="skills" ref={ref} style={{ padding: "120px 48px", background: "#08080C" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", color: "#FF6B6B", marginBottom: 16, opacity: visible ? 1 : 0, transition: "opacity 0.5s" }}>
          Expertise
        </p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 72 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, transform: visible ? "none" : "translateY(24px)", opacity: visible ? 1 : 0, transition: "all 0.7s 0.2s" }}>
            My Skill Stack
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px 80px" }}>
          {SKILLS.map((s, i) => (
            <div key={s.name} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)", transition: `all 0.6s cubic-bezier(0.22,1,0.36,1) ${0.1 + i * 0.1}s` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#fff", fontWeight: 500 }}>{s.name}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.4)" }}>{s.level}%</span>
              </div>
              <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: visible ? `${s.level}%` : "0%", background: `linear-gradient(90deg, ${s.color}, ${s.color}aa)`, borderRadius: 2, transition: `width 1.2s cubic-bezier(0.22,1,0.36,1) ${0.3 + i * 0.1}s` }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 72, display: "flex", flexWrap: "wrap", gap: 12, opacity: visible ? 1 : 0, transition: "opacity 0.6s 0.8s" }}>
          {["Git", "Java", "SprigBoot", "MySql", "REST APIs","CI/CD","Docker",  "React", "Redux" , "Tailwind CSS"].map(t => (
            <span key={t} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.55)", padding: "8px 18px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, transition: "all 0.2s", cursor: "default" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,107,107,0.5)"; e.currentTarget.style.color = "#FF6B6B"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [ref, visible] = useInView();
  const [hovered, setHovered] = useState(null);
  return (
    <section id="projects" ref={ref} style={{ padding: "120px 48px", background: "#0D0D14" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", color: "#FF6B6B", marginBottom: 16, opacity: visible ? 1 : 0, transition: "opacity 0.5s" }}>
          Professional Work
        </p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: 64, transform: visible ? "none" : "translateY(24px)", opacity: visible ? 1 : 0, transition: "all 0.7s 0.2s" }}>
          Working Projects
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {PROJECTS.map((p, i) => (
            <div key={p.id} data-hover
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                padding: "36px", borderRadius: 8, position: "relative", overflow: "hidden", cursor: "pointer",
                border: `1px solid ${hovered === p.id ? p.color + "40" : "rgba(255,255,255,0.06)"}`,
                background: hovered === p.id ? `${p.color}08` : "rgba(255,255,255,0.02)",
                transform: visible ? (hovered === p.id ? "translateY(-4px)" : "none") : "translateY(32px)",
                opacity: visible ? 1 : 0,
                transition: `all 0.6s cubic-bezier(0.22,1,0.36,1) ${0.15 * i}s`,
              }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: p.color, transform: hovered === p.id ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: p.color, background: `${p.color}18`, padding: "4px 12px", borderRadius: 20 }}>{p.tag}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.25)" }}>{p.year}</span>
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: "#fff", marginBottom: 12, lineHeight: 1.2 }}>{p.title}</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, marginBottom: 24 }}>{p.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {p.tech.map(t => (
                  <span key={t} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.35)", background: "rgba(255,255,255,0.04)", padding: "3px 10px", borderRadius: 3 }}>{t}</span>
                ))}
              </div>
              <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 8, color: p.color, fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, opacity: hovered === p.id ? 1 : 0, transform: hovered === p.id ? "translateX(0)" : "translateX(-8px)", transition: "all 0.3s" }}>
                View Case Study <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Blog() {
  const [ref, visible] = useInView();
  return (
    <section id="blog" ref={ref} style={{ padding: "120px 48px", background: "#08080C" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", color: "#FF6B6B", marginBottom: 16, opacity: visible ? 1 : 0, transition: "opacity 0.5s" }}>Personal Work</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, transform: visible ? "none" : "translateY(24px)", opacity: visible ? 1 : 0, transition: "all 0.7s 0.2s" }}>
            Personal Projects
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          <div>
            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 32 }}>Latest work</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {BLOGS.map((b, i) => (
                <div key={b.id} data-hover style={{
                  padding: "24px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", cursor: "pointer",
                  opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)",
                  transition: `all 0.6s cubic-bezier(0.22,1,0.36,1) ${0.2 + i * 0.1}s`,
                }}
                  onMouseEnter={e => { e.currentTarget.style.paddingLeft = "12px"; }}
                  onMouseLeave={e => { e.currentTarget.style.paddingLeft = "0px"; }}>
                  <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: b.color, background: `${b.color}18`, padding: "2px 10px", borderRadius: 20 }}>{b.category}</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.25)" }}>{b.read}</span>
                  </div>
                  <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, color: "rgba(255,255,255,0.85)", lineHeight: 1.5, margin: "0 0 4px" }}>{b.title}</h4>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.25)" }}>{b.date}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 32 }}>Career Highlights</h3>
            <div style={{ position: "relative", paddingLeft: 24 }}>
              <div style={{ position: "absolute", left: 0, top: 6, bottom: 0, width: 1, background: "linear-gradient(to bottom, #FF6B6B, transparent)" }} />
              {TIMELINE.map((t, i) => (
                <div key={i} style={{ position: "relative", paddingBottom: 36, opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(16px)", transition: `all 0.6s cubic-bezier(0.22,1,0.36,1) ${0.3 + i * 0.12}s` }}>
                  <div style={{ position: "absolute", left: -28, top: 6, width: 9, height: 9, borderRadius: "50%", background: i === 0 ? "#FF6B6B" : "rgba(255,255,255,0.2)", border: i === 0 ? "none" : "1px solid rgba(255,255,255,0.15)" }} />
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#FF6B6B", marginBottom: 4, letterSpacing: "0.05em" }}>{t.year}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 2 }}>{t.role}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>{t.company}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.65 }}>{t.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [ref, visible] = useInView();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const handle = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const submit = () => { if (form.name && form.email) setSent(true); };
  return (
    <section id="contact" ref={ref} style={{ padding: "120px 48px 80px", background: "#0D0D14" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
        <div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", color: "#FF6B6B", marginBottom: 20, opacity: visible ? 1 : 0, transition: "opacity 0.5s" }}>Contact</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: 24, transform: visible ? "none" : "translateY(24px)", opacity: visible ? 1 : 0, transition: "all 0.7s 0.2s" }}>
            Looking forward<br />to contributing<br /><span style={{ color: "#FF6B6B" }}>to something meaningful..</span>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, marginBottom: 40, opacity: visible ? 1 : 0, transition: "opacity 0.6s 0.35s" }}>
            Open to Work, full-time opportunities. Let's connect.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, opacity: visible ? 1 : 0, transition: "opacity 0.6s 0.45s" }}>
            {[["Email", "ritumishra8924@gmail.com"], ["Location", "Remote / Worldwide"], ["Availability", "Open to new Opportunities"]].map(([l, v]) => (
              <div key={l} style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", width: 90 }}>{l}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.7)" }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(32px)", transition: "all 0.8s 0.3s" }}>
          {sent ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✦</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: "#fff", marginBottom: 8 }}>Message Sent!</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.5)" }}>I'll be in touch within 24 hours.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[["name", "Your Name"], ["email", "Email Address"]].map(([k, ph]) => (
                <div key={k}>
                  <input value={form[k]} onChange={handle(k)} placeholder={ph}
                    style={{
                      width: "100%", padding: "14px 18px", background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, color: "#fff",
                      fontFamily: "'DM Sans', sans-serif", fontSize: 15, outline: "none", boxSizing: "border-box",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={e => e.target.style.borderColor = "rgba(255,107,107,0.5)"}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                  />
                </div>
              ))}
              <div>
                <textarea value={form.message} onChange={handle("message")} placeholder="Your message" rows={5}
                  style={{
                    width: "100%", padding: "14px 18px", background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, color: "#fff",
                    fontFamily: "'DM Sans', sans-serif", fontSize: 15, outline: "none", resize: "vertical", boxSizing: "border-box",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={e => e.target.style.borderColor = "rgba(255,107,107,0.5)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                />
              </div>
              <button onClick={submit} data-hover style={{
                padding: "16px 32px", background: "#FF6B6B", border: "none", borderRadius: 4,
                color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600,
                cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s", letterSpacing: "0.03em",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 36px rgba(255,107,107,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                Send Message →
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ padding: "32px 48px", background: "#08080C", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#fff" }}><span style={{ color: "#FF6B6B" }}>Ritu</span>Mishra</div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.25)" }}>© 2026 Ritu Mishra · Built with React</div>
  <div style={{ display: "flex", gap: 20 }}>
        <a
          href="https://github.com/RituMisra"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.color = "#FF6B6B"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}
        >
          GitHub
        </a>

        <a
          href="https://www.linkedin.com/in/ritu-mishra-5843731a4/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.color = "#FF6B6B"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}
        >
          LinkedIn
        </a>

        <a
          href="https://leetcode.com/u/ritumishra8924/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.color = "#FF6B6B"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}
        >
          LeetCode
        </a>
      </div>
    </footer>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("Home");
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      <style>{`* { margin:0; padding:0; box-sizing:border-box; } body { background:#08080C; cursor:none; } ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:#08080C} ::-webkit-scrollbar-thumb{background:#FF6B6B44;border-radius:2px}`}</style>
      <Cursor />
      <Navbar active={active} setActive={setActive} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Blog />
      <Contact />
      <Footer />
    </>
  );
}
