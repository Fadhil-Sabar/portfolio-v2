/**
 * Duolingo public-profile stats — shared types and pure helpers.
 *
 * Client-safe: no `$env`, no `fetch`. The network access lives in
 * `$lib/server/duolingo-api`.
 *
 * The endpoint returns a large profile document that also carries `emailVerified`,
 * `hasPhoneNumber`, `hasGoogleId`, `location`, and `joinedClassroomIds`. Only the
 * handful of fields below are extracted, so none of that ends up in the committed
 * snapshot in git.
 */

export const DUOLINGO_USERNAME = 'FadhilAndr1';
export const DUOLINGO_PROFILE_URL = `https://www.duolingo.com/profile/${DUOLINGO_USERNAME}`;

export interface DuolingoCourse {
	/** e.g. 'Japanese' */
	title: string;
	/** e.g. 'ja' */
	language: string;
	xp: number;
}

export interface DuolingoStats {
	username: string;
	/** Unbroken-day streak. The headline number. */
	streak: number;
	totalXp: number;
	/** ISO date (YYYY-MM-DD) derived from the unix `creationDate`. */
	joined: string;
	/** Courses with XP, largest first. */
	courses: DuolingoCourse[];
	/** ISO timestamp of the fetch that produced this snapshot. */
	fetchedAt: string;
}

/** Unix seconds → YYYY-MM-DD, or `null` when the input is missing or absurd. */
export function formatJoinDate(unixSeconds: number | undefined | null): string | null {
	if (typeof unixSeconds !== 'number' || !Number.isFinite(unixSeconds) || unixSeconds <= 0) {
		return null;
	}
	const d = new Date(unixSeconds * 1000);
	return Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
}

/** The joined year on its own, for a compact figure cell. */
export function joinYear(joined: string | null): string | null {
	return joined ? joined.slice(0, 4) : null;
}

/**
 * A course's bar width as a percentage of the biggest course. English sits at ~1% of
 * Japanese here, so scaling against the max keeps the small course visible instead of
 * rounding it to nothing.
 */
export function barPercent(xp: number, peak: number): number {
	if (peak <= 0) return 0;
	return Math.max(2, Math.round((xp / peak) * 100));
}
