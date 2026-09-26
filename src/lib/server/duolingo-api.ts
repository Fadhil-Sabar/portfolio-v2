/**
 * Duolingo public-profile access.
 *
 * Unlike GitHub this needs no token: the public profile document is readable
 * anonymously. It is also **undocumented and unversioned** — Duolingo has already
 * changed it once (username lookups on the ID endpoint are now integer-only), so
 * the committed snapshot exists for the same reason as the GitHub one.
 *
 * Imports the data module relatively because `scripts/refresh-duolingo-stats.ts`
 * loads this file under plain `bun`, which does not know SvelteKit's path aliases.
 */

import {
	DUOLINGO_USERNAME,
	formatJoinDate,
	type DuolingoCourse,
	type DuolingoStats
} from '../data/duolingo';

const ENDPOINT = 'https://www.duolingo.com/2017-06-30/users';

/**
 * Only the fields we display. The live response carries account flags
 * (`hasPhoneNumber`, `emailVerified`, `hasGoogleId`), a location, and classroom
 * IDs; none of that should reach the committed snapshot.
 */
interface ProfileResponse {
	users: {
		username: string;
		streak: number;
		totalXp: number;
		creationDate: number;
		courses: { title: string; learningLanguage: string; xp: number }[];
	}[];
}

export async function fetchDuolingoStats(
	username: string = DUOLINGO_USERNAME
): Promise<DuolingoStats> {
	const res = await fetch(`${ENDPOINT}?username=${encodeURIComponent(username)}`, {
		headers: {
			Accept: 'application/json',
			// The endpoint rejects requests without a browser-ish User-Agent.
			'User-Agent':
				'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
		}
	});

	if (!res.ok) throw new Error(`GET ${ENDPOINT} responded ${res.status}`);

	const body = (await res.json()) as ProfileResponse;
	const user = body.users?.[0];
	if (!user) throw new Error(`No Duolingo user named "${username}"`);

	const joined = formatJoinDate(user.creationDate);
	if (!joined) throw new Error('creationDate missing or unusable');

	// `crowns` is deliberately ignored: every course reports the capped 9999, so it
	// carries no information.
	const courses: DuolingoCourse[] = (user.courses ?? [])
		.map((c) => ({ title: c.title, language: c.learningLanguage, xp: c.xp }))
		.sort((a, b) => b.xp - a.xp);

	return {
		// Trust the canonical spelling the API returns over what we asked for —
		// the site treats usernames case-insensitively.
		username: user.username,
		streak: user.streak,
		totalXp: user.totalXp,
		joined,
		courses,
		fetchedAt: new Date().toISOString()
	};
}
