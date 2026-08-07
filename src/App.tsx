import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { About } from './components/About';
import { Resume } from './components/Resume';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Toast } from './components/Toast';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('about');
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
      <Sidebar />
      <div className="main-content">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div
          id={`${activeTab}-panel`}
          role="tabpanel"
          aria-labelledby={`${activeTab}-tab`}
          tabIndex={0}
          style={{ outline: 'none' }}
        >
          {renderActiveComponent()}
        </div>
      </div>
      <Toast show={showToast} />
    </main>
  );
};

export default App;
