import React from 'react';

interface Skill {
  title: string;
  subtitle: string;
  glowColor: string;
  themeColor: string;
  icon: string;
  items: { name: string; color: string }[];
}

export const Resume: React.FC = () => {
  const skills: Skill[] = [
    {
      title: "Frontend Development",
      subtitle: "Interactive UI & SPAs",
      glowColor: "rgba(204, 255, 0, 0.15)",
      themeColor: "#CCFF00",
      icon: "desktop-outline",
      items: [
        { name: "React", color: "#61dafb" },
        { name: "TypeScript", color: "#3178c6" },
        { name: "Redux", color: "#764abc" },
        { name: "Tailwind CSS", color: "#38bdf8" },
        { name: "Framer Motion", color: "#ff007f" },
        { name: "Shadcn UI", color: "#ffffff" },
        { name: "GSAP", color: "#88ce02" }
      ]
    },
    {
      title: "Mobile Development",
      subtitle: "Cross-Platform & Native Apps",
      glowColor: "rgba(204, 255, 0, 0.15)",
      themeColor: "#CCFF00",
      icon: "phone-portrait-outline",
      items: [
        { name: "React Native", color: "#61dafb" },
        { name: "Expo", color: "#ffffff" },
        { name: "Android (Java/Kotlin)", color: "#3ddc84" },
        { name: "Android Studio", color: "#4285f4" },
        { name: "iOS", color: "#a2aaad" }
      ]
    },
    {
      title: "Backend Development",
      subtitle: "APIs & Server Architecture",
      glowColor: "rgba(204, 255, 0, 0.15)",
      themeColor: "#CCFF00",
      icon: "server-outline",
      items: [
        { name: "Laravel", color: "#ff2d20" },
        { name: "PHP", color: "#777bb4" },
        { name: "Node.js", color: "#339933" },
        { name: "REST API", color: "#00bcd4" },
        { name: "Prisma", color: "#2d3748" },
        { name: "Mongoose", color: "#880000" }
      ]
    },
    {
      title: "Databases",
      subtitle: "Data Architecture & Management",
      glowColor: "rgba(204, 255, 0, 0.15)",
      themeColor: "#CCFF00",
      icon: "cube-outline",
      items: [
        { name: "MongoDB", color: "#47a248" },
        { name: "MySQL", color: "#00758f" },
        { name: "SQL Server", color: "#cc292b" }
      ]
    },
    {
      title: "Tools & Platforms",
      subtitle: "DevOps & Cloud Workflows",
      glowColor: "rgba(204, 255, 0, 0.15)",
      themeColor: "#CCFF00",
      icon: "settings-outline",
      items: [
        { name: "AWS", color: "#ff9900" },
        { name: "Git", color: "#f05032" },
        { name: "GitHub", color: "#ffffff" },
        { name: "VS Code", color: "#007acc" },
        { name: "Vercel", color: "#ffffff" },
        { name: "Render", color: "#46e3b7" },
        { name: "Postman", color: "#ff6c37" }
      ]
    }
  ];

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

        <div className="skills-wrapper">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-box floating reveal"
              style={{
                '--glow-color': skill.glowColor,
                '--theme-color': skill.themeColor
              } as React.CSSProperties}
            >
              <div className="skill-header">
                <ion-icon name={skill.icon} className="gradient-icon"></ion-icon>
                <h4>{skill.title}</h4>
              </div>
              <span className="skill-subtitle">{skill.subtitle}</span>
              <div className="skill-items">
                {skill.items.map((item, idx) => (
                  <span key={idx} className="skill-tag">
                    <span className="tag-dot" style={{ background: item.color }}></span>
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};
