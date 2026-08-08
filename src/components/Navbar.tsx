import React, { useRef } from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';

export const Navbar: React.FC = () => {
  const activeTab = usePortfolioStore((state) => state.activeTab);
  const setActiveTab = usePortfolioStore((state) => state.setActiveTab);
  const soundActive = usePortfolioStore((state) => state.soundActive);

  const playTabSound = () => {
    if (!soundActive) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.15);
      
      gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {
      console.warn("Audio Context error", e);
    }
  };

  const tabs = [
    { id: 'about', label: 'About', icon: 'person-outline' },
    { id: 'resume', label: 'Resume', icon: 'document-text-outline' },
    { id: 'experience', label: 'Experience', icon: 'briefcase-outline' },
    { id: 'projects', label: 'Projects', icon: 'grid-outline' },
    { id: 'contact', label: 'Contact', icon: 'mail-outline' }
  ];

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
    playTabSound();
    window.scrollTo(0, 0);
    setTimeout(() => {
      tabRefs.current[nextTabId]?.focus();
    }, 0);
  };

  return (
    <nav className="navbar" aria-label="Main Navigation">
      <ul 
        id="navbar-menu-list"
        className="navbar-list" 
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
              tabIndex={activeTab === tab.id ? 0 : -1}
              className={`navbar-link ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab.id);
                playTabSound();
                window.scrollTo(0, 0);
              }}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              <ion-icon name={tab.icon} class="nav-icon" aria-hidden="true"></ion-icon>
              <span className="nav-label">{tab.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
