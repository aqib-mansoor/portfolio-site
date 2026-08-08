import React from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import type { Project } from '../store/usePortfolioStore';

export const Projects: React.FC = () => {
  
  const activeCategory = usePortfolioStore((state) => state.activeCategory);
  const setActiveCategory = usePortfolioStore((state) => state.setActiveCategory);
  
  const activeProject = usePortfolioStore((state) => state.activeProject);
  const setActiveProject = usePortfolioStore((state) => state.setActiveProject);

  const projectList: Project[] = [
    {
      title: "Nexus Crypto Hub",
      category: "Web Development",
      desc: "Real-time cryptocurrency tracking platform with interactive charts, historical market data, and instant search.",
      image: "/assets/images/project19.png",
      link: "https://nexus-crypto-hub.vercel.app/",
      tech: [
        { name: "React", className: "react" },
        { name: "Tailwind CSS", className: "tailwind" },
        { name: "GSAP", className: "firebase" },
        { name: "CoinGecko", className: "api" }
      ]
    },
    {
      title: "FoodieExpress - MultiVendor",
      category: "Web Development",
      desc: "Full-stack multi-vendor food ordering and delivery system with real-time tracking, vendor panel, and rider portal.",
      image: "/assets/images/project14.png",
      link: "https://foodie-express-chi.vercel.app",
      tech: [
        { name: "React", className: "react" },
        { name: "Tailwind CSS", className: "tailwind" },
        { name: "Firebase", className: "firebase" },
        { name: "TypeScript", className: "typescript" }
      ]
    },
    {
      title: "Vendor Portal",
      category: "Web Development",
      desc: "Management portal for restaurant partners to process orders, manage menus, track revenues, and view sales analytics.",
      image: "/assets/images/project15.png",
      link: "https://vendor-portal-ashen.vercel.app",
      tech: [
        { name: "React", className: "react" },
        { name: "Tailwind CSS", className: "tailwind" },
        { name: "Firebase", className: "firebase" },
        { name: "TypeScript", className: "api" }
      ]
    },
    {
      title: "Rider Portal",
      category: "Web Development",
      desc: "Dedicated web portal for delivery agents to receive, accept, navigate, and manage delivery orders in real-time.",
      image: "/assets/images/project16.png",
      link: "https://foodie-express-rider-portal.vercel.app",
      tech: [
        { name: "React", className: "react" },
        { name: "Tailwind CSS", className: "tailwind" },
        { name: "Firebase", className: "firebase" },
        { name: "TypeScript", className: "typescript" }
      ]
    },
    {
      title: "Apply Daddy",
      category: "Web Development",
      desc: "Job application auto-filler extension and progress tracker that automates form completions on major career portals.",
      image: "/assets/images/project18.png",
      link: "https://apply-daddy-eight.vercel.app/",
      tech: [
        { name: "React", className: "react" },
        { name: "Tailwind CSS", className: "tailwind" },
        { name: "Node.js", className: "node" },
        { name: "Express", className: "api" }
      ]
    },
    {
      title: "MedConnect",
      category: "Web Development",
      desc: "Comprehensive healthcare booking and management system connecting doctors, patients, and clinics with online scheduling.",
      image: "/assets/images/project13.png",
      link: "https://med-connect-ten.vercel.app/login",
      tech: [
        { name: "React", className: "react" },
        { name: "Tailwind CSS", className: "tailwind" },
        { name: "TypeScript", className: "typescript" },
        { name: "REST API", className: "api" }
      ]
    },
    {
      title: "Quick Cart",
      category: "Web Design",
      desc: "Lightning-fast modern e-commerce storefront layout utilizing Next.js, static site generation, and Tailwind CSS design styling.",
      image: "/assets/images/project7.png",
      link: "https://quick-cart-nextjs-eight.vercel.app/",
      tech: [
        { name: "Next.js", className: "react" },
        { name: "Tailwind CSS", className: "tailwind" },
        { name: "TypeScript", className: "typescript" }
      ]
    },
    {
      title: "BIIT (PMAS)",
      category: "Web Design",
      desc: "Redesigned educational institute portal showcasing courses, schedules, academic departments, and news updates.",
      image: "/assets/images/project2.png",
      link: "https://pmas-biit.netlify.app",
      tech: [
        { name: "HTML", className: "html" },
        { name: "CSS", className: "css" },
        { name: "Bootstrap", className: "bootstrap" },
        { name: "JavaScript", className: "js" }
      ]
    },
    {
      title: "Big Bite",
      category: "Web Development",
      desc: "Vibrant modern fast-food landing page featuring interactive menus, client reviews, and custom booking options.",
      image: "/assets/images/project1.png",
      link: "https://big-bite.netlify.app",
      tech: [
        { name: "HTML", className: "html" },
        { name: "CSS", className: "css" },
        { name: "Bootstrap", className: "bootstrap" },
        { name: "JavaScript", className: "js" }
      ]
    },
    {
      title: "Rider Portal (Laravel/MySQL)",
      category: "Web Development",
      desc: "High-performance secure portal for delivery fleets built on Laravel backend architecture and MySQL relational databases.",
      image: "/assets/images/project8.png",
      link: "#",
      tech: [
        { name: "React", className: "react" },
        { name: "Tailwind CSS", className: "tailwind" },
        { name: "Laravel", className: "laravel" },
        { name: "MySQL", className: "mysql" }
      ]
    },
    {
      title: "Admin Panel (Laravel/MySQL)",
      category: "Web Development",
      desc: "Enterprise-grade admin panel featuring roles/permissions, auditing, and deep reporting dashboard metrics.",
      image: "/assets/images/project10.png",
      link: "#",
      tech: [
        { name: "React", className: "react" },
        { name: "Tailwind CSS", className: "tailwind" },
        { name: "Laravel", className: "laravel" },
        { name: "MySQL", className: "mysql" }
      ]
    },
    {
      title: "Vendor Panel (React/MySQL)",
      category: "Web Development",
      desc: "Secure vendor store-front management system featuring inventories tracking, billing tables, and client profiles.",
      image: "/assets/images/project11.png",
      link: "#",
      tech: [
        { name: "React", className: "react" },
        { name: "Tailwind CSS", className: "tailwind" },
        { name: "MySQL", className: "mysql" }
      ]
    },
    {
      title: "FOOD LAB",
      category: "Web Design",
      desc: "Exquisite responsive sushi restaurant showcase website with seamless CSS hover animations and high-res culinary images.",
      image: "/assets/images/project6.png",
      link: "https://sushilab.netlify.app",
      tech: [
        { name: "HTML", className: "html" },
        { name: "CSS", className: "css" },
        { name: "JavaScript", className: "js" }
      ]
    },
    {
      title: "SWAG KICK",
      category: "Web Development",
      desc: "Trendy e-commerce shoe store platform layout styled with Bootstrap components and dynamic catalog listings.",
      image: "/assets/images/project5.png",
      link: "https://swagykick.netlify.app",
      tech: [
        { name: "HTML", className: "html" },
        { name: "CSS", className: "css" },
        { name: "Bootstrap", className: "bootstrap" },
        { name: "JavaScript", className: "js" }
      ]
    },
    {
      title: "NEW LOOK",
      category: "Web Design",
      desc: "Chic beauty and hair salon platform showcasing stylized services list, bookings schedule, and stylist lookbooks.",
      image: "/assets/images/project4.png",
      link: "https://look-new.netlify.app",
      tech: [
        { name: "React", className: "react" },
        { name: "Tailwind CSS", className: "tailwind" }
      ]
    }
  ];

  const categories = ['all', 'Web Development', 'Web Design'];

  const filteredProjects = projectList.filter((project) => {
    return activeCategory === 'all' || project.category === activeCategory;
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / 15; // divisor adjusts tilt sensitivity
    const rotateY = (x - centerX) / 15;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.transition = 'transform 0.1s ease';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.transition = 'transform 0.5s ease-out';
  };

  return (
    <article className="portfolio active" data-page="projects">
      <header>
        <h2 className="h2 article-title" aria-label="Page Title: Projects">Projects</h2>
      </header>

      <section className="projects">
        {/* Category Filter Controls */}
        <div className="portfolio-controls">
          {/* Category Filter Pills */}
          <ul className="filter-list">
            {categories.map((category) => (
              <li key={category} className="filter-item">
                <button
                  className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category === 'all' ? 'All' : category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Projects Grid */}
        <ul className="project-list">
          {filteredProjects.map((project, index) => (
            <li 
              key={index} 
              className="project-item active reveal" 
              data-filter-item 
              data-category={project.category.toLowerCase()}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <button 
                onClick={() => setActiveProject(project)} 
                className="project-card-btn"
              >
                <figure className="project-img">
                  <img src={project.image} alt={project.title} />
                </figure>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-category">{project.category}</p>
                  <p className="project-desc">{project.desc}</p>
                  <div className="project-tech">
                    {project.tech.map((t, idx) => (
                      <span key={idx} className={`tech-badge ${t.className}`}>
                        {t.name}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};
