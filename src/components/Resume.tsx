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
        if (entries[0].isIntersecting) setWidth(level);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div className="skill-progress-item" ref={ref}>
      <div className="skill-progress-meta">
        <span className="skill-progress-name" style={{ '--bar-color': color } as React.CSSProperties}>{name}</span>
        <span className="skill-progress-pct">{level}%</span>
      </div>
      <div className="skill-bar-bg">
        <div
          className="skill-bar-fill"
          style={{
            width: `${width}%`,
            background: `linear-gradient(90deg, ${color}99, ${color})`,
            boxShadow: `0 0 8px ${color}60`
          }}
        />
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
      glowColor: "rgba(97, 218, 251, 0.15)",
      themeColor: "#61dafb",
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
      glowColor: "rgba(61, 220, 132, 0.15)",
      themeColor: "#3ddc84",
      icon: "phone-portrait-outline",
      items: [
        { name: "React Native", color: "#61dafb", level: 90 },
        { name: "Flutter", color: "#02569B", level: 85 },
        { name: "Expo", color: "#ffffff", level: 85 },
        { name: "Android (Java/Kotlin)", color: "#3ddc84", level: 80 },
        { name: "Swift / SwiftUI", color: "#F05138", level: 75 },
        { name: "iOS (Xcode)", color: "#a2aaad", level: 75 }
      ]
    },
    {
      title: "Backend Development",
      subtitle: "APIs & Server Architecture",
      glowColor: "rgba(255, 45, 32, 0.15)",
      themeColor: "#ff2d20",
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
      glowColor: "rgba(0, 117, 143, 0.15)",
      themeColor: "#00758f",
      icon: "cube-outline",
      items: [
        { name: "MongoDB", color: "#47a248", level: 88 },
        { name: "PostgreSQL", color: "#4169E1", level: 88 },
        { name: "Firestore", color: "#ffca2b", level: 85 },
        { name: "MySQL", color: "#00758f", level: 90 },
        { name: "Redis", color: "#DC382D", level: 80 },
        { name: "SQL Server", color: "#cc292b", level: 80 }
      ]
    },
    {
      title: "Tools & Platforms",
      subtitle: "DevOps & Cloud Workflows",
      glowColor: "rgba(255, 153, 0, 0.15)",
      themeColor: "#ff9900",
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

      <section className="skills">
        <div className="title-wrapper" style={{ marginBottom: '20px' }}>
          <div className="icon-box">
            <ion-icon name="terminal-outline"></ion-icon>
          </div>
          <h3 className="h3">Skills &amp; Expertise</h3>
        </div>

        {/* Filter Pills Header */}
        <div className="skills-hero" style={{ marginBottom: '25px', display: 'flex', justifyContent: 'center' }}>
          <ul className="skills-filter-bar">
            {['All', 'Frontend', 'Backend', 'Mobile', 'Tools & Platforms'].map((category) => (
              <li key={category}>
                <button
                  className={`filter-btn ${activeSkillCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveSkillCategory(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Skill Cards Grid */}
        <div className="skills-grid">
          {filteredSkills.map((skill, index) => {
            const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
              const card = e.currentTarget;
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;

              // Spotlight cursor coordinates
              const percentX = (x / rect.width) * 100;
              const percentY = (y / rect.height) * 100;
              card.style.setProperty('--mouse-x', `${percentX}%`);
              card.style.setProperty('--mouse-y', `${percentY}%`);

              // 3D Perspective Rotation
              const rotateX = -(y - centerY) / 8;
              const rotateY = (x - centerX) / 8;
              card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            };

            const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
              const card = e.currentTarget;
              card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
              card.style.transition = 'transform 0.5s ease-out';
            };

            return (
              <div key={index} className="skill-card-wrapper">
                <div
                  className="skill-card reveal"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    '--card-accent': skill.themeColor,
                    '--card-glow': skill.glowColor
                  } as React.CSSProperties}
                >
                  <div className="skill-card-header">
                    <div className="skill-card-icon">
                      <ion-icon name={skill.icon}></ion-icon>
                    </div>
                    <span className="skill-card-title">{skill.title}</span>
                  </div>
                  <p className="skill-card-subtitle">{skill.subtitle}</p>
                  <div className="skill-progress-row">
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
              </div>
            );
          })}
        </div>
      </section>
    </article>
  );
};
