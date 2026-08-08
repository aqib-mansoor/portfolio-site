export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export interface GitHubStats {
  username: string;
  avatarUrl: string;
  publicRepos: number;
  followers: number;
  totalStars: number;
  languages: { name: string; percentage: number; color: string }[];
  featuredRepos: {
    name: string;
    description: string;
    stars: number;
    language: string;
    url: string;
  }[];
  totalContributions: number;
  streak: number;
  maxDayCount: number;
  contributions: ContributionDay[];
}

const CACHE_KEY = 'github_stats_cache';
const CACHE_DURATION = 2 * 60 * 60 * 1000; // 2 hours

const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  HTML: '#e34c26',
  CSS: '#563d7c',
  PHP: '#4f5d95',
  Blade: '#ff2d20',
  Vue: '#41b883',
  Python: '#3572A5',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
};

const defaultStats: GitHubStats = {
  username: 'aqib-mansoor',
  avatarUrl: 'https://github.com/aqib-mansoor.png',
  publicRepos: 28,
  followers: 42,
  totalStars: 18,
  languages: [
    { name: 'TypeScript', percentage: 45, color: '#3178c6' },
    { name: 'PHP (Laravel)', percentage: 30, color: '#4f5d95' },
    { name: 'JavaScript', percentage: 15, color: '#f1e05a' },
    { name: 'Swift/Kotlin', percentage: 10, color: '#F05138' },
  ],
  featuredRepos: [
    {
      name: 'laravel-api-boilerplate',
      description: 'Clean Laravel API infrastructure with built-in JWT authentication, RBAC authorization, and automated query filters.',
      stars: 6,
      language: 'PHP',
      url: '#',
    },
    {
      name: 'react-native-hub',
      description: 'Cross-platform mobile workspace delivering reusable custom hooks, authentication templates, and fluid layout sheets.',
      stars: 7,
      language: 'TypeScript',
      url: '#',
    },
  ],
  totalContributions: 320,
  streak: 5,
  maxDayCount: 12,
  contributions: [],
};

export const fetchGitHubStats = async (username: string): Promise<GitHubStats> => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { timestamp, data } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data;
      }
    }

    // Try fetching profile data
    const profileRes = await fetch(`https://api.github.com/users/${username}`);
    if (!profileRes.ok) throw new Error('Failed to fetch profile');
    const profile = await profileRes.json();

    // Try fetching repositories (up to 100)
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    if (!reposRes.ok) throw new Error('Failed to fetch repos');
    const repos = await reposRes.json();

    let totalStars = 0;
    const langCounts: Record<string, number> = {};
    let featuredList: any[] = [];

    repos.forEach((repo: any) => {
      totalStars += repo.stargazers_count;
      if (repo.language) {
        langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
      }
      
      // Filter out profile configuration repository, portfolio-site, or empty repos
      const isProfileRepo = repo.name.toLowerCase() === username.toLowerCase();
      const isPortfolioSite = repo.name.toLowerCase() === 'portfolio-site';
      const hasDescription = repo.description && repo.description.trim().length > 0;
      
      if (!isProfileRepo && !isPortfolioSite && hasDescription) {
        featuredList.push({
          name: repo.name,
          description: repo.description,
          stars: repo.stargazers_count,
          language: repo.language || 'Code',
          url: repo.html_url,
          pushedAt: new Date(repo.pushed_at).getTime(),
        });
      }
    });

    // Sort repos by stars first, then recency of updates
    featuredList.sort((a, b) => b.stars - a.stars || b.pushedAt - a.pushedAt);
    featuredList = featuredList.slice(0, 3);

    // Calculate language percentages
    const totalLangs = Object.values(langCounts).reduce((a, b) => a + b, 0);
    const languages = Object.entries(langCounts)
      .map(([name, count]) => {
        const pct = Math.round((count / (totalLangs || 1)) * 100);
        return {
          name,
          percentage: pct,
          color: languageColors[name] || '#8b949e',
        };
      })
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 4);

    // Try fetching contributions data from CORS-friendly scraper API
    let totalContributions = 0;
    let contributionsList: ContributionDay[] = [];
    let currentStreak = 0;
    let maxDayCount = 0;

    try {
      const contribRes = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`);
      if (contribRes.ok) {
        const contribData = await contribRes.json();
        totalContributions = contribData.total?.current || 0;
        
        // Take last 371 days (53 weeks * 7 days)
        const rawDays = contribData.contributions || [];
        const sliceDays = rawDays.slice(-371);
        
        contributionsList = sliceDays.map((day: any) => ({
          date: day.date,
          count: day.count,
          level: day.level,
        }));

        // Calculate maximum day count
        maxDayCount = Math.max(...sliceDays.map((d: any) => d.count), 0);

        // Simple current streak helper
        let streak = 0;
        for (let i = sliceDays.length - 1; i >= 0; i--) {
          if (sliceDays[i].count > 0) {
            streak++;
          } else {
            // allow a 1-day grace if checking today vs yesterday
            if (i < sliceDays.length - 1) {
              break;
            }
          }
        }
        currentStreak = streak;
      }
    } catch (e) {
      console.warn("Could not retrieve real contribution graph data", e);
    }

    const stats: GitHubStats = {
      username: profile.login || username,
      avatarUrl: profile.avatar_url || defaultStats.avatarUrl,
      publicRepos: profile.public_repos || defaultStats.publicRepos,
      followers: profile.followers || defaultStats.followers,
      totalStars: totalStars || defaultStats.totalStars,
      languages: languages.length > 0 ? languages : defaultStats.languages,
      featuredRepos: featuredList.length > 0 ? featuredList : defaultStats.featuredRepos,
      totalContributions: totalContributions || defaultStats.totalContributions,
      streak: currentStreak || defaultStats.streak,
      maxDayCount: maxDayCount || defaultStats.maxDayCount,
      contributions: contributionsList,
    };

    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        timestamp: Date.now(),
        data: stats,
      })
    );

    return stats;
  } catch (err) {
    console.warn('GitHub API fetch failed or rate-limited. Serving cached/default metrics.', err);
    return defaultStats;
  }
};
