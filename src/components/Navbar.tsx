import React from 'react';

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

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {tabs.map((tab) => (
          <li key={tab.id} className="navbar-item">
            <button
              className={`navbar-link ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab.id);
                window.scrollTo(0, 0);
              }}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
