import React, { useState, useEffect, useRef } from 'react';

interface SkillItem {
  name: string;
  color: string;
  level: number; // skill percentage level (0-100)
}

interface SkillCategory {
  title: string;
  subtitle: string;
  glowColor: string;
  themeColor: string;
  icon: string;
  items: SkillItem[];
}

const ProgressBar: React.FC<{ name: string; color: string; level: number }> = ({ name, color, level }) => {
  const [width, setWidth] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setWidth(level);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [level]);

  return (
    <div className="skills-item" ref={ref} style={{ marginBottom: '18px', width: '100%' }}>
      <div className="skill" style={{ width: '100%' }}>
        <div className="title-wrapper" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="tag-dot" style={{ background: color, display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%' }}></span>
            <span style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 500 }}>{name}</span>
          </div>
          <data style={{ color: 'var(--light-gray-70)', fontSize: '0.9rem' }}>{level}%</data>
        </div>
        <div className="skill-progress-bg" style={{ background: 'var(--jet)', height: '6px', borderRadius: '10px', overflow: 'hidden' }}>
          <div
            className="skill-progress-fill"
            style={{
              width: `${width}%`,
              height: '100%',
              background: 'var(--text-gradient-yellow)',
              borderRadius: 'inherit',
              transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export const Resume: React.FC = () => {
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>('All');

  const skills: SkillCategory[] = [
    {
      title: "Frontend Development",
      subtitle: "Interactive UI & SPAs",
      glowColor: "rgba(204, 255, 0, 0.15)",
      themeColor: "#CCFF00",
      icon: "desktop-outline",
      items: [
        { name: "React", color: "#61dafb", level: 95 },
        { name: "TypeScript", color: "#3178c6", level: 90 },
        { name: "Redux", color: "#764abc", level: 85 },
        { name: "Tailwind CSS", color: "#38bdf8", level: 95 },
        { name: "Framer Motion", color: "#ff007f", level: 80 },
        { name: "Shadcn UI", color: "#ffffff", level: 90 },
        { name: "GSAP", color: "#88ce02", level: 75 }
      ]
    },
    {
      title: "Mobile Development",
      subtitle: "Cross-Platform & Native Apps",
      glowColor: "rgba(204, 255, 0, 0.15)",
      themeColor: "#CCFF00",
      icon: "phone-portrait-outline",
      items: [
        { name: "React Native", color: "#61dafb", level: 90 },
        { name: "Expo", color: "#ffffff", level: 85 },
        { name: "Android (Java/Kotlin)", color: "#3ddc84", level: 80 },
        { name: "Android Studio", color: "#4285f4", level: 85 },
        { name: "iOS", color: "#a2aaad", level: 75 }
      ]
    },
    {
      title: "Backend Development",
      subtitle: "APIs & Server Architecture",
      glowColor: "rgba(204, 255, 0, 0.15)",
      themeColor: "#CCFF00",
      icon: "server-outline",
      items: [
        { name: "Laravel", color: "#ff2d20", level: 92 },
        { name: "PHP", color: "#777bb4", level: 88 },
        { name: "Node.js", color: "#339933", level: 85 },
        { name: "Firebase", color: "#ffcb2b", level: 85 },
        { name: "Supabase", color: "#3ecf8e", level: 82 },
        { name: "REST API", color: "#00bcd4", level: 95 },
        { name: "Prisma", color: "#2d3748", level: 80 },
        { name: "Mongoose", color: "#880000", level: 82 }
      ]
    },
    {
      title: "Databases",
      subtitle: "Data Architecture & Management",
      glowColor: "rgba(204, 255, 0, 0.15)",
      themeColor: "#CCFF00",
      icon: "cube-outline",
      items: [
        { name: "MongoDB", color: "#47a248", level: 88 },
        { name: "Firestore", color: "#ffca2b", level: 85 },
        { name: "MySQL", color: "#00758f", level: 90 },
        { name: "SQL Server", color: "#cc292b", level: 80 }
      ]
    },
    {
      title: "Tools & Platforms",
      subtitle: "DevOps & Cloud Workflows",
      glowColor: "rgba(204, 255, 0, 0.15)",
      themeColor: "#CCFF00",
      icon: "settings-outline",
      items: [
        { name: "AWS", color: "#ff9900", level: 75 },
        { name: "Git", color: "#f05032", level: 90 },
        { name: "GitHub", color: "#ffffff", level: 92 },
        { name: "VS Code", color: "#007acc", level: 95 },
        { name: "Vercel", color: "#ffffff", level: 90 },
        { name: "Render", color: "#46e3b7", level: 85 },
        { name: "Postman", color: "#ff6c37", level: 90 }
      ]
    }
  ];

  const filteredSkills = skills.filter((skill) => {
    if (activeSkillCategory === 'All') return true;
    if (activeSkillCategory === 'Frontend') return skill.title === 'Frontend Development';
    if (activeSkillCategory === 'Backend') return skill.title === 'Backend Development';
    if (activeSkillCategory === 'Mobile') return skill.title === 'Mobile Development';
    if (activeSkillCategory === 'Tools & Platforms') return skill.title === 'Databases' || skill.title === 'Tools & Platforms';
    return true;
  });

  return (
    <article className="resume active" data-page="resume">
      <header>
        <h2 className="h2 article-title" aria-label="Page Title: Resume">Resume</h2>
      </header>

      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <ion-icon name="book-outline"></ion-icon>
          </div>
          <h3 className="h3">Education</h3>
        </div>

        <ol className="timeline-list">
          <li className="timeline-item reveal">
            <h4 className="h4 timeline-item-title">Bachelor of Science in Computer Science (BSCS)</h4>
            <p style={{ color: 'var(--light-gray-70)', fontSize: '0.9rem', marginBottom: '5px' }}>
              PMAS Arid Agriculture University (BIIT), Rawalpindi
            </p>
            <span className="timeline-item-date">2021 — 2025</span>
            <p className="timeline-text">
              Specialized in Software Engineering, Database Systems, and Application Development. Built multiple high-impact web and mobile projects, gaining deep practical expertise in full-stack architecture. Focus areas included data structures, system design, and responsive design patterns.
            </p>
          </li>

          <li className="timeline-item reveal">
            <h4 className="h4 timeline-item-title">Intermediate in Computer Science (ICS)</h4>
            <p style={{ color: 'var(--light-gray-70)', fontSize: '0.9rem', marginBottom: '5px' }}>
              Royal College of Sciences, Chakwal
            </p>
            <span className="timeline-item-date">2019 — 2021</span>
            <p className="timeline-text">
              Built a solid foundation in software logic, problem-solving, and computer science basics. Studied core programming fundamentals, databases, and mathematics.
            </p>
          </li>
        </ol>
      </section>

      <section className="skills" style={{ marginTop: '45px' }}>
        <div className="title-wrapper" style={{ marginBottom: '30px' }}>
          <div className="icon-box">
            <ion-icon name="terminal-outline"></ion-icon>
          </div>
          <h3 className="h3">Skills & Expertise</h3>
        </div>

        {/* Skill Category Filter Pills */}
        <ul className="filter-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', listStyleType: 'none', padding: '0', marginBottom: '25px' }}>
          {['All', 'Frontend', 'Backend', 'Mobile', 'Tools & Platforms'].map((category) => (
            <li key={category} className="filter-item">
              <button
                className={`filter-btn ${activeSkillCategory === category ? 'active' : ''}`}
                onClick={() => setActiveSkillCategory(category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>

        <div className="skills-wrapper">
          {filteredSkills.map((skill, index) => (
            <div
              key={index}
              className="skill-box floating reveal"
              style={{
                '--glow-color': skill.glowColor,
                '--theme-color': skill.themeColor
              } as React.CSSProperties}
            >
              <div className="skill-header" style={{ marginBottom: '20px' }}>
                <ion-icon name={skill.icon} className="gradient-icon"></ion-icon>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#fff' }}>{skill.title}</h4>
              </div>
              <span className="skill-subtitle" style={{ display: 'block', fontSize: '0.85rem', color: 'var(--light-gray-70)', marginBottom: '20px' }}>{skill.subtitle}</span>
              <div className="skill-progress-list" style={{ width: '100%' }}>
                {skill.items.map((item, idx) => (
                  <ProgressBar
                    key={idx}
                    name={item.name}
                    color={item.color}
                    level={item.level}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};
