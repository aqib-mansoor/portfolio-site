import React, { useEffect, useState } from 'react';
import { fetchGitHubStats } from '../utils/githubApi';
import type { GitHubStats } from '../utils/githubApi';

interface TechNode {
  id: string;
  label: string;
  category: 'frontend' | 'backend' | 'database' | 'mobile' | 'devops';
  color: string;
  connections: string[];
}

const TECH_NODES: TechNode[] = [
  { id: 'react', label: 'React', category: 'frontend', color: '#61dafb', connections: ['ts', 'redux', 'reactnative', 'tailwind'] },
  { id: 'ts', label: 'TypeScript', category: 'frontend', color: '#3178c6', connections: ['react', 'node', 'reactnative'] },
  { id: 'redux', label: 'Redux', category: 'frontend', color: '#764abc', connections: ['react'] },
  { id: 'tailwind', label: 'Tailwind CSS', category: 'frontend', color: '#38bdf8', connections: ['react'] },
  
  { id: 'laravel', label: 'Laravel', category: 'backend', color: '#ff2d20', connections: ['php', 'mysql', 'redis'] },
  { id: 'php', label: 'PHP', category: 'backend', color: '#777bb4', connections: ['laravel', 'mysql'] },
  { id: 'node', label: 'Node.js', category: 'backend', color: '#339933', connections: ['ts', 'mongodb', 'redis'] },
  
  { id: 'reactnative', label: 'React Native', category: 'mobile', color: '#61dafb', connections: ['react', 'ts'] },
  { id: 'flutter', label: 'Flutter', category: 'mobile', color: '#02569B', connections: ['firebase'] },

  { id: 'mongodb', label: 'MongoDB', category: 'database', color: '#47a248', connections: ['node'] },
  { id: 'mysql', label: 'MySQL', category: 'database', color: '#00758f', connections: ['laravel', 'php'] },
  { id: 'postgres', label: 'PostgreSQL', category: 'database', color: '#4169E1', connections: ['laravel', 'node'] },
  { id: 'redis', label: 'Redis', category: 'database', color: '#DC382D', connections: ['laravel', 'node'] },

  { id: 'aws', label: 'AWS', category: 'devops', color: '#ff9900', connections: ['laravel', 'node', 'github'] },
  { id: 'github', label: 'GitHub', category: 'devops', color: '#ffffff', connections: ['aws', 'react', 'laravel'] },
];

export const Analytics: React.FC = () => {
  const [gitStats, setGitStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchGitHubStats('aqib-mansoor')
      .then((data) => {
        setGitStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleNodeClick = (id: string) => {
    setActiveNode(activeNode === id ? null : id);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / 12;
    const rotateY = (x - centerX) / 12;
    
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${percentX}%`);
    card.style.setProperty('--mouse-y', `${percentY}%`);
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    card.style.transition = 'transform 0.1s ease';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.transition = 'transform 0.5s ease-out';
  };

  const filteredNodes = selectedCategory === 'all'
    ? TECH_NODES
    : TECH_NODES.filter(n => n.category === selectedCategory);

  const getHighlightStyle = (node: TechNode): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      padding: '14px 10px',
      borderRadius: '12px',
      color: '#fff',
      cursor: 'pointer',
      fontSize: '0.85rem',
      fontWeight: '600',
      textAlign: 'center',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      outline: 'none',
      border: '1px solid var(--border-color, rgba(255,255,255,0.06))',
      background: 'var(--card-bg, rgba(255,255,255,0.02))',
    };

    if (!activeNode) return baseStyle;

    if (activeNode === node.id) {
      return {
        ...baseStyle,
        border: `1px solid ${node.color}`,
        background: `${node.color}15`,
        boxShadow: `0 0 15px ${node.color}30`,
        transform: 'scale(1.05)',
      };
    }

    const activeDetails = TECH_NODES.find(n => n.id === activeNode);
    const isConnected = activeDetails && (activeDetails.connections.includes(node.id) || node.connections.includes(activeNode));

    if (isConnected) {
      return {
        ...baseStyle,
        border: `1px solid ${node.color}80`,
        background: `${node.color}08`,
        boxShadow: `0 0 8px ${node.color}15`,
      };
    }

    return {
      ...baseStyle,
      opacity: 0.35,
    };
  };

  return (
    <article className="analytics active" data-page="analytics">
      <header>
        <h2 className="h2 article-title" aria-label="Page Title: Analytics">Analytics</h2>
      </header>

      {/* GitHub Section */}
      <section className="service" style={{ marginBottom: '35px' }}>
        <h3 className="h3 service-title">Live GitHub Metrics</h3>
        
        {loading ? (
          <div className="loading-container" style={{ textAlign: 'center', padding: '30px', color: 'var(--light-gray)' }}>
            <span>Retrieving live repository data...</span>
          </div>
        ) : (
          gitStats && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              
              {/* Profile Card & Language Summary */}
              <ul className="service-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '20px' }}>
                
                {/* Stats Profile Grid */}
                <li 
                  className="service-item reveal active" 
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '30px', justifyContent: 'center' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', width: '100%' }}>
                    <img 
                      src={gitStats.avatarUrl} 
                      alt={gitStats.username} 
                      style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid var(--orange-yellow-crayola)' }} 
                    />
                    <div>
                      <h4 className="h4 service-item-title" style={{ margin: 0 }}>@{gitStats.username}</h4>
                      <p className="service-item-text" style={{ fontSize: '0.8rem', margin: 0, opacity: 0.7 }}>GitHub Developer Profile</p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginTop: '5px', textAlign: 'center', width: '100%' }}>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px 5px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.02)' }}>
                      <span className="stats-number" style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--orange-yellow-crayola)', display: 'block' }}>{gitStats.publicRepos}</span>
                      <p style={{ fontSize: '0.7rem', margin: 0, color: 'var(--light-gray)', marginTop: '4px' }}>Repos</p>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px 5px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.02)' }}>
                      <span className="stats-number" style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--orange-yellow-crayola)', display: 'block' }}>{gitStats.totalStars}</span>
                      <p style={{ fontSize: '0.7rem', margin: 0, color: 'var(--light-gray)', marginTop: '4px' }}>Stars</p>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px 5px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.02)' }}>
                      <span className="stats-number" style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--orange-yellow-crayola)', display: 'block' }}>{gitStats.followers}</span>
                      <p style={{ fontSize: '0.7rem', margin: 0, color: 'var(--light-gray)', marginTop: '4px' }}>Followers</p>
                    </div>
                  </div>
                </li>

                {/* Top Languages */}
                <li 
                  className="service-item reveal active" 
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{ padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                >
                  <div style={{ width: '100%' }}>
                    <h4 className="h4 service-item-title" style={{ marginBottom: '20px' }}>Language Distribution</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
                      {gitStats.languages.map((lang, idx) => (
                        <div key={idx} style={{ width: '100%' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '6px' }}>
                            <span style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
                              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: lang.color }} />
                              {lang.name}
                            </span>
                            <span style={{ color: 'var(--light-gray)', fontWeight: '600' }}>{lang.percentage}%</span>
                          </div>
                          <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden', width: '100%' }}>
                            <div style={{ height: '100%', width: `${lang.percentage}%`, backgroundColor: lang.color, borderRadius: '3px' }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </li>

              </ul>
            </div>
          )
        )}
      </section>

      {/* Live Repo Metrics Section */}
      <section className="service" style={{ marginTop: '35px' }}>
        <h3 className="h3 service-title">Live Repository Metrics</h3>
        <p className="service-item-text" style={{ marginBottom: '20px', fontSize: '0.85rem', lineHeight: '1.5' }}>
          Detailed performance indicators, code distributions, and size metrics from your active repositories.
        </p>

        {gitStats && (
          <ul className="service-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '20px' }}>
            {gitStats.featuredRepos.map((repo, idx) => (
              <li 
                key={idx} 
                className="service-item reveal active" 
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ padding: '25px', display: 'flex', flexDirection: 'column', gap: '12px' }}
              >
                <div>
                  <h4 className="h4 service-item-title" style={{ margin: 0, fontSize: '1rem', color: 'var(--orange-yellow-crayola)' }}>{repo.name}</h4>
                  <p className="service-item-text" style={{ fontSize: '0.8rem', marginTop: '8px', lineHeight: '1.45' }}>{repo.description}</p>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginTop: '10px', width: '100%', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '15px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '10px', textAlign: 'center' }}>
                    <span style={{ fontSize: '1rem', fontWeight: 'bold', color: '#fff', display: 'block' }}>{repo.language}</span>
                    <p style={{ fontSize: '0.65rem', margin: 0, color: 'var(--light-gray)', marginTop: '2px' }}>Language</p>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '10px', textAlign: 'center' }}>
                    <span style={{ fontSize: '1rem', fontWeight: 'bold', color: '#fff', display: 'block' }}>{repo.stars}</span>
                    <p style={{ fontSize: '0.65rem', margin: 0, color: 'var(--light-gray)', marginTop: '2px' }}>Stars</p>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', width: '100%' }}>
                  {repo.url !== '#' && (
                    <a href={repo.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--orange-yellow-crayola)', fontWeight: '600' }}>
                      <span>Explore Repository</span>
                      <ion-icon name="arrow-forward-outline"></ion-icon>
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </article>
  );
};
export default Analytics;
