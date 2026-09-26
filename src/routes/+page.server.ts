import { getGitHubStats } from '$lib/server/github-stats';
import { getDuolingoStats } from '$lib/server/duolingo-stats';
import type { PageServerLoad } from './$types';

/**
 * Runs at prerender time, so the browser receives finished numbers and never
 * calls GitHub or Duolingo. Both helpers fall back to their committed snapshots
 * instead of throwing, so a third-party outage cannot break the build.
 */
export const load: PageServerLoad = async () => {
	const [github, duolingo] = await Promise.all([getGitHubStats(), getDuolingoStats()]);
	return { github, duolingo };
};
