import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { About } from './components/About';
import { Resume } from './components/Resume';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Toast } from './components/Toast';
import { Chatbot } from './components/Chatbot';
import { CanvasParticles } from './components/CanvasParticles';
import { BackgroundOrbs } from './components/BackgroundOrbs';
import { CursorFluid } from './components/CursorFluid';
import { usePortfolioStore } from './store/usePortfolioStore';

export const App: React.FC = () => {
  const activeTab = usePortfolioStore((state) => state.activeTab);
  const activeProject = usePortfolioStore((state) => state.activeProject);
  const setActiveProject = usePortfolioStore((state) => state.setActiveProject);
  const [showToast, setShowToast] = useState<boolean>(false);

  const handleSuccess = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");
    if (revealElements.length === 0) return;

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        element.classList.add("active");
      } else {
        revealObserver.observe(element);
      }
    });

    return () => {
      revealObserver.disconnect();
    };
  }, [activeTab]);

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'about':
        return <About />;
      case 'resume':
        return <Resume />;
      case 'experience':
        return <Experience />;
      case 'projects':
        return <Projects />;
      case 'contact':
        return <Contact onSuccess={handleSuccess} />;
      default:
        return <About />;
    }
  };

  return (
    <main>
      <CanvasParticles />
      <BackgroundOrbs />
      <CursorFluid />
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div
          key={activeTab}
          id={`${activeTab}-panel`}
          role="tabpanel"
          aria-labelledby={`${activeTab}-tab`}
          tabIndex={0}
          style={{ outline: 'none' }}
          className="tab-panel-animate"
        >
          {renderActiveComponent()}
        </div>
      </div>
      <Toast show={showToast} />
      <Chatbot />

      {/* Project Detail Modal rendered at root viewport level */}
      {activeProject && (
        <div 
          className="modal-container active project-modal-overlay" 
          onClick={() => setActiveProject(null)}
        >
          <div 
            className="project-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image */}
            <figure className="modal-project-img">
              <img src={activeProject.image} alt={activeProject.title} />
            </figure>

            {/* Modal Content */}
            <span className="modal-category">
              {activeProject.category}
            </span>
            <h3 className="modal-title">{activeProject.title}</h3>

            <p className="modal-desc">
              {activeProject.desc}
            </p>

            <div className="modal-tech-section">
              <h4>Technologies Used:</h4>
              <div className="modal-tech-list">
                {activeProject.tech.map((t, idx) => (
                  <span key={idx} className={`tech-badge ${t.className}`}>
                    {t.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="modal-links">
              {activeProject.link !== '#' && (
                <a 
                  href={activeProject.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="form-btn modal-btn-primary"
                >
                  <ion-icon name="globe-outline"></ion-icon>
                  <span>Live Preview</span>
                </a>
              )}
              <button 
                className="form-btn modal-btn-secondary"
                onClick={() => setActiveProject(null)}
              >
                <span>Close Details</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default App;
