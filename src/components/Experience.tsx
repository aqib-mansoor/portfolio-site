import React from 'react';

interface ExperienceItem {
  role: string;
  company: string;
  type: 'Full-Time' | 'Internship';
  duration: string;
  points: string[];
  tech: string[];
}

export const Experience: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      role: "Full Stack Web & App Developer",
      company: "Enscyd Technologies Pvt. Ltd.",
      type: "Full-Time",
      duration: "Jul 2025 — Current",
      points: [
        "Developing and maintaining modern, responsive, high-performance web and mobile applications.",
        "Building user interfaces with React, Next.js, and Tailwind CSS.",
        "Designing and integrating backend APIs using Laravel.",
        "Enforcing clean, scalable, and optimized code architecture across projects.",
        "Collaborating in team environments to deliver user-centric solutions."
      ],
      tech: ["React", "Next.js", "React Native", "Expo", "Laravel", "Tailwind CSS"]
    },
    {
      role: "Web Development Intern",
      company: "Devrolin",
      type: "Internship",
      duration: "Feb 2025 — Jun 2025",
      points: [
        "Built full-stack web applications using PHP, Laravel, and React JS.",
        "Developed RESTful APIs with Laravel and consumed them on the frontend using React.",
        "Designed and managed relational databases, writing optimized SQL queries.",
        "Created responsive, dynamic UI components and integrated them with backend services.",
        "Collaborated with the team using Git workflows and participated in agile sprints."
      ],
      tech: ["PHP", "Laravel", "React JS", "MySQL", "REST API", "Git"]
    },
    {
      role: "React Intern",
      company: "YoungDev",
      type: "Internship",
      duration: "Jul 2024 — Oct 2024",
      points: [
        "Built responsive frontend screens using React Hooks and modular architectures.",
        "Refactored legacy React systems to enforce global state using Redux.",
        "Optimized component rendering speed and improved UI flows."
      ],
      tech: ["React", "Redux", "TypeScript", "CSS3"]
    },
    {
      role: "Frontend Intern",
      company: "CodSoft",
      type: "Internship",
      duration: "Aug 2023 — Oct 2023",
      points: [
        "Developed responsive layouts using HTML5, CSS3, Bootstrap, and JavaScript.",
        "Translated design mockups into interactive, pixel-perfect web pages.",
        "Acquired practical workflows in Git version control and team collaborations."
      ],
      tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Git"]
    }
  ];

  return (
    <article className="experience active" data-page="experience">
      <header>
        <h2 className="h2 article-title" aria-label="Page Title: Experience">Experience</h2>
      </header>

      <section className="timeline experience-timeline">
        <div className="title-wrapper" style={{ marginBottom: '30px' }}>
          <div className="icon-box">
            <ion-icon name="briefcase-outline"></ion-icon>
          </div>
          <h3 className="h3">Work History</h3>
        </div>
        <ol className="timeline-list">
          {experiences.map((exp, index) => (
            <li
              key={index}
              className={`timeline-item reveal ${exp.type.toLowerCase().replace(' ', '-')}`}
            >
              <div className="timeline-item-header">
                <h4 className="h4 timeline-item-title">
                  {exp.role} — {exp.company}
                </h4>
                <div className="timeline-item-meta">
                  <span className={`exp-badge ${exp.type.toLowerCase().replace(' ', '-')}`}>
                    {exp.type}
                  </span>
                  <span className="timeline-item-date">{exp.duration}</span>
                </div>
              </div>
              <div className="timeline-text">
                <ul>
                  {exp.points.map((pt, idx) => (
                    <li key={idx}>{pt}</li>
                  ))}
                </ul>
                <div className="exp-tech-list">
                  {exp.tech.map((t, idx) => (
                    <span key={idx} className="exp-tech-tag">{t}</span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
};
