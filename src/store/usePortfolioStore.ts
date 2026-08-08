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
  
  setActiveTab: (tab: string) => void;
  setSearchQuery: (query: string) => void;
  setActiveCategory: (category: string) => void;
  setActiveTech: (tech: string) => void;
  setActiveProject: (project: Project | null) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  activeTab: 'about',
  searchQuery: '',
  activeCategory: 'all',
  activeTech: '',
  activeProject: null,

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setActiveCategory: (category) => set({ activeCategory: category }),
  setActiveTech: (tech) => set({ activeTech: tech }),
  setActiveProject: (project) => set({ activeProject: project }),
}));
