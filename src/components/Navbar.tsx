import React, { useRef, useState, useEffect } from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'about', label: 'About' },
    { id: 'resume', label: 'Resume' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      newIndex = (index + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      newIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      newIndex = 0;
    } else if (e.key === 'End') {
      newIndex = tabs.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    const nextTabId = tabs[newIndex].id;
    setActiveTab(nextTabId);
    window.scrollTo(0, 0);
    setTimeout(() => {
      tabRefs.current[nextTabId]?.focus();
    }, 0);
  };

  // Close menu on ESC key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  const activeTabLabel = tabs.find(tab => tab.id === activeTab)?.label || 'Menu';

  return (
    <nav className="navbar" aria-label="Main Navigation">
      {/* Mobile Backdrop */}
      {isMenuOpen && (
        <div 
          className="navbar-backdrop" 
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Menu Toggle Trigger (Visible on Mobile/Tablet) */}
      <button
        className="navbar-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-expanded={isMenuOpen}
        aria-controls="navbar-menu-list"
        aria-label="Toggle Navigation Menu"
      >
        <span className="navbar-toggle-text">{activeTabLabel}</span>
        <ion-icon name={isMenuOpen ? "close-outline" : "menu-outline"} aria-hidden="true"></ion-icon>
      </button>

      <ul 
        id="navbar-menu-list"
        className={`navbar-list ${isMenuOpen ? 'open' : ''}`} 
        role="tablist"
      >
        {tabs.map((tab, index) => (
          <li key={tab.id} className="navbar-item" role="presentation">
            <button
              ref={(el) => { tabRefs.current[tab.id] = el; }}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`${tab.id}-panel`}
              id={`${tab.id}-tab`}
              tabIndex={activeTab === tab.id ? 0 : (isMenuOpen ? 0 : -1)}
              className={`navbar-link ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab.id);
                setIsMenuOpen(false);
                window.scrollTo(0, 0);
              }}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
