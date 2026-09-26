/**
 * Refresh the committed Duolingo stats snapshot that the build falls back to.
 *
 *   bun run scripts/refresh-duolingo-stats.ts
 *
 * No token needed — the public profile document is readable anonymously.
 */

import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { fetchDuolingoStats } from '../src/lib/server/duolingo-api';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'src/lib/data/duolingo-stats.json');

const stats = await fetchDuolingoStats();

await writeFile(OUT, JSON.stringify(stats, null, '\t') + '\n', 'utf8');

console.log(
	`Wrote ${OUT}\n  username: ${stats.username}\n  streak: ${stats.streak} days\n  total xp: ${stats.totalXp}\n  joined: ${stats.joined}\n  courses: ${stats.courses.map((c) => `${c.title} ${c.xp}`).join(', ')}`
);
