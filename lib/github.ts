// Fetches GitHub repo metadata at build time so the static site ships
// with real star / fork counts baked into the HTML — no runtime calls
// to api.github.com, no rate-limit issues on the client.

export type RepoStats = {
  repo: string;
  stars: number;
  forks: number;
  language: string | null;
};

export async function fetchRepoStats(repos: string[]): Promise<RepoStats[]> {
  if (!repos.length) return [];

  const results = await Promise.all(
    repos.map(async (repo): Promise<RepoStats | null> => {
      try {
        const res = await fetch(`https://api.github.com/repos/${repo}`, {
          headers: {
            Accept: 'application/vnd.github+json',
            'User-Agent': 'gokulap-portfolio',
            // Optional token for higher rate limit in CI; falls back to
            // unauthenticated (60/hr) if the env var is missing.
            ...(process.env.GITHUB_TOKEN
              ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
              : {}),
          },
          // Next.js caches this for 1 hour in dev; static export uses it once.
          next: { revalidate: 3600 },
        });
        if (!res.ok) return null;
        const d = await res.json();
        return {
          repo,
          stars: d.stargazers_count ?? 0,
          forks: d.forks_count ?? 0,
          language: d.language ?? null,
        };
      } catch {
        return null;
      }
    })
  );
  return results.filter((r): r is RepoStats => r !== null);
}

export function statsToMap(stats: RepoStats[]): Record<string, RepoStats> {
  const m: Record<string, RepoStats> = {};
  for (const s of stats) m[s.repo] = s;
  return m;
}
