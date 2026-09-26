/**
 * Build-time GitHub stats with a committed-snapshot fallback.
 *
 * Runs only while prerendering (every route in this app is prerendered), so the
 * numbers are baked into the HTML at build time and the browser never talks to
 * GitHub. If anything fails — no token, rate limit, network blip — we fall back
 * to the committed snapshot in `$lib/data/github-stats.json` so a deploy is never
 * blocked by a third-party API.
 *
 * `GITHUB_TOKEN` is required only for the contribution calendar and the activity
 * feed: both come from GraphQL `contributionsCollection`, which is not readable
 * anonymously. The REST numbers (stars, repos, latest event) work without it.
 */

import { env } from '$env/dynamic/private';
import snapshot from '$lib/data/github-stats.json';
import { mergeSnapshot, type GitHubStats } from '$lib/data/github';
import { fetchGitHubStats } from './github-api';

const CACHED = snapshot as unknown as GitHubStats;

/**
 * Fresh stats if the API cooperates, otherwise the last committed snapshot.
 * Never throws — a portfolio page should not fail to build because GitHub is down.
 */
export async function getGitHubStats(): Promise<GitHubStats> {
	let fresh: GitHubStats;
	try {
		fresh = await fetchGitHubStats(env.GITHUB_TOKEN);
	} catch (err) {
		const reason = err instanceof Error ? err.message : String(err);
		console.warn(`[github-stats] live fetch failed (${reason}) — falling back to snapshot`);
		return CACHED;
	}

	const { stats, borrowed } = mergeSnapshot(fresh, CACHED);
	if (borrowed.length > 0) {
		console.warn(`[github-stats] reusing snapshot for: ${borrowed.join(', ')}`);
	}

	console.log(
		`[github-stats] live: ${stats.contributions ?? '—'} contributions, ${stats.stars} stars, ${stats.publicRepos} repos, ${stats.recentContributions.length} recent items`
	);
	return stats;
}
