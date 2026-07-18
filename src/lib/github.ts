export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stargazers_count: number;
  topics: string[];
  fork: boolean;
  created_at: string;
  updated_at: string;
}

const GITHUB_API = 'https://api.github.com';

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  try {
    // Fetch user repos sorted by stars and updated date
    const response = await fetch(
      `${GITHUB_API}/users/${username}/repos?sort=updated&per_page=100&type=owner`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          // Add GitHub token if available for higher rate limits
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          }),
        },
        // Cache for 1 hour
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos: GitHubRepo[] = await response.json();

    // Filter out forks and sort by stars (descending)
    return repos
      .filter(repo => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 12); // Show top 12 repos
  } catch (error) {
    console.error('Failed to fetch GitHub repos:', error);
    return [];
  }
}

export function getLanguageColor(language: string | null): 'gold' | 'violet' | 'teal' | 'slate' {
  const colorMap: Record<string, 'gold' | 'violet' | 'teal' | 'slate'> = {
    TypeScript: 'gold',
    Python: 'violet',
    JavaScript: 'teal',
    React: 'gold',
    'Next.js': 'gold',
    Go: 'teal',
    Rust: 'violet',
    Java: 'slate',
    C: 'slate',
    'C++': 'slate',
  };

  return (language && colorMap[language]) || 'slate';
}
