import { create } from 'zustand';

export interface Project {
  title: string;
  category: string;
  desc: string;
  image: string;
  link: string;
  tech: { name: string; className: string }[];
}

interface PortfolioState {
  activeTab: string;
  searchQuery: string;
  activeCategory: string;
  activeTech: string;
  activeProject: Project | null;
  
  // Custom dashboard settings
  theme: 'abyss' | 'cyberpunk' | 'slate';
  particlesInteractive: boolean;
  particlesDensity: 'low' | 'medium' | 'high';
  fluidCursorActive: boolean;
  soundActive: boolean;
  
  setActiveTab: (tab: string) => void;
  setSearchQuery: (query: string) => void;
  setActiveCategory: (category: string) => void;
  setActiveTech: (tech: string) => void;
  setActiveProject: (project: Project | null) => void;
  
  // Custom dashboard actions
  setTheme: (theme: 'abyss' | 'cyberpunk' | 'slate') => void;
  setParticlesInteractive: (interactive: boolean) => void;
  setParticlesDensity: (density: 'low' | 'medium' | 'high') => void;
  setFluidCursorActive: (active: boolean) => void;
  setSoundActive: (active: boolean) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  activeTab: 'about',
  searchQuery: '',
  activeCategory: 'all',
  activeTech: '',
  activeProject: null,
  
  theme: 'abyss',
  particlesInteractive: true,
  particlesDensity: 'medium',
  fluidCursorActive: true,
  soundActive: true,

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setActiveCategory: (category) => set({ activeCategory: category }),
  setActiveTech: (tech) => set({ activeTech: tech }),
  setActiveProject: (project) => set({ activeProject: project }),
  
  setTheme: () => {},
  setParticlesInteractive: (particlesInteractive) => set({ particlesInteractive }),
  setParticlesDensity: (particlesDensity) => set({ particlesDensity }),
  setFluidCursorActive: (fluidCursorActive) => set({ fluidCursorActive }),
  setSoundActive: (soundActive) => set({ soundActive }),
}));
