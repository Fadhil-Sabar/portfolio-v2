/**
 * Build-time Duolingo stats with a committed-snapshot fallback.
 *
 * Prerender-time only, same as the GitHub stats: the browser never calls Duolingo.
 * No token is involved, so the only failure modes are the undocumented endpoint
 * changing shape and ordinary network blips — both covered by the snapshot.
 */

import snapshot from '$lib/data/duolingo-stats.json';
import type { DuolingoStats } from '$lib/data/duolingo';
import { fetchDuolingoStats } from './duolingo-api';

const CACHED = snapshot as unknown as DuolingoStats;

export async function getDuolingoStats(): Promise<DuolingoStats> {
	try {
		const fresh = await fetchDuolingoStats();
		console.log(
			`[duolingo-stats] live: ${fresh.streak} day streak, ${fresh.totalXp} xp, ${fresh.courses.length} courses`
		);
		return fresh;
	} catch (err) {
		const reason = err instanceof Error ? err.message : String(err);
		console.warn(`[duolingo-stats] live fetch failed (${reason}) — falling back to snapshot`);
		return CACHED;
	}
}
