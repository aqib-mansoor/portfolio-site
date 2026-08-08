import React, { useEffect, useState } from 'react';
import { fetchGitHubStats, fetchGitHubEvents } from '../utils/githubApi';
import type { GitHubStats, GitHubActivityEvent } from '../utils/githubApi';

export const Analytics: React.FC = () => {
  const [gitStats, setGitStats] = useState<GitHubStats | null>(null);
  const [gitEvents, setGitEvents] = useState<GitHubActivityEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    Promise.all([
      fetchGitHubStats('aqib-mansoor'),
      fetchGitHubEvents('aqib-mansoor')
    ])
      .then(([statsData, eventsData]) => {
        setGitStats(statsData);
        setGitEvents(eventsData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

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
                style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '15px', justifyContent: 'space-between', minHeight: '260px' }}
              >
                <div style={{ width: '100%' }}>
                  <h4 className="h4 service-item-title" style={{ margin: 0 }}>{repo.name}</h4>
                  <p className="service-item-text" style={{ fontSize: '0.8rem', marginTop: '10px', lineHeight: '1.45', opacity: 0.85 }}>{repo.description}</p>
                </div>
                
                <div style={{ width: '100%' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginTop: '10px', width: '100%', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '15px 5px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.01)', textAlign: 'center' }}>
                      <span className="stats-number" style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--orange-yellow-crayola)', display: 'block', textTransform: 'capitalize' }}>{repo.language}</span>
                      <p style={{ fontSize: '0.65rem', margin: 0, color: 'var(--light-gray)', marginTop: '4px' }}>Language</p>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '15px 5px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.01)', textAlign: 'center' }}>
                      <span className="stats-number" style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--orange-yellow-crayola)', display: 'block' }}>{repo.stars}</span>
                      <p style={{ fontSize: '0.65rem', margin: 0, color: 'var(--light-gray)', marginTop: '4px' }}>Stars</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', width: '100%' }}>
                    {repo.url !== '#' && (
                      <a href={repo.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--orange-yellow-crayola)', fontWeight: '600' }}>
                        <span>Explore Repository</span>
                        <ion-icon name="arrow-forward-outline"></ion-icon>
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Live GitHub Profile Activity Events */}
      <section className="service" style={{ marginTop: '35px' }}>
        <h3 className="h3 service-title">Live Commit & Activity Stream</h3>
        <p className="service-item-text" style={{ marginBottom: '20px', fontSize: '0.85rem', lineHeight: '1.5' }}>
          Real-time activity logs pulled from public hooks.
        </p>

        {gitEvents.length > 0 ? (
          <ul className="service-list" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {gitEvents.map((event) => (
              <li 
                key={event.id}
                className="service-item reveal active"
                style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', gap: '15px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '0.85rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600' }}>
                      <ion-icon name="git-commit-outline" style={{ color: 'var(--orange-yellow-crayola)', fontSize: '1.1rem' }}></ion-icon>
                      {event.type === 'PushEvent' ? 'Pushed Commits to' : 'Activity on'}{' '}
                      <a href={event.repoUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--orange-yellow-crayola)', textDecoration: 'underline' }}>
                        {event.repoName.split('/')[1] || event.repoName}
                      </a>
                    </span>
                    {event.commits && event.commits.length > 0 ? (
                      <p className="service-item-text" style={{ fontSize: '0.8rem', margin: '4px 0 0 22px', color: 'var(--light-gray)', fontStyle: 'italic' }}>
                        "{event.commits[0].message}"
                      </p>
                    ) : (
                      <p className="service-item-text" style={{ fontSize: '0.8rem', margin: '4px 0 0 22px', color: 'var(--light-gray)', fontStyle: 'italic' }}>
                        Repository action performed.
                      </p>
                    )}
                    <span style={{ fontSize: '0.72rem', color: 'var(--light-gray)', opacity: 0.6, marginLeft: '22px', marginTop: '2px' }}>
                      {event.createdAt}
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' }}>
                    <span style={{ 
                      fontSize: '0.65rem', 
                      color: 'var(--orange-yellow-crayola)', 
                      background: 'rgba(255, 219, 112, 0.08)', 
                      padding: '4px 8px', 
                      borderRadius: '6px', 
                      fontWeight: '600',
                      border: '1px solid rgba(255, 219, 112, 0.15)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {event.type.replace('Event', '')}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)', textAlign: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--light-gray)' }}>No recent public activities found.</span>
          </div>
        )}
      </section>

    </article>
  );
};
export default Analytics;
