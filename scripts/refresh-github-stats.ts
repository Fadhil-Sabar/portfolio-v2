/**
 * Refresh the committed GitHub stats snapshot that the build falls back to.
 *
 *   bun run stats:refresh
 *
 * Token resolution order: $GITHUB_TOKEN, then the local `gh` CLI session.
 * A token is only needed for the contribution calendar; without one the snapshot
 * is written with `contributions: null` and an empty calendar.
 */

import { writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { fetchGitHubStats } from '../src/lib/server/github-api';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'src/lib/data/github-stats.json');

function tokenFromGhCli(): string | undefined {
	try {
		const token = execFileSync('gh', ['auth', 'token'], { encoding: 'utf8' }).trim();
		return token || undefined;
	} catch {
		return undefined;
	}
}

const token = process.env.GITHUB_TOKEN || tokenFromGhCli();
if (!token) {
	console.warn('No GITHUB_TOKEN and no `gh` session — calendar will be empty in the snapshot.');
}

const stats = await fetchGitHubStats(token);

await writeFile(OUT, JSON.stringify(stats, null, '\t') + '\n', 'utf8');

console.log(
	`Wrote ${OUT}\n  contributions: ${stats.contributions ?? '—'}\n  stars: ${stats.stars}\n  public repos: ${stats.publicRepos}\n  calendar weeks: ${stats.calendar.length} (peak day: ${stats.peak})`
);
