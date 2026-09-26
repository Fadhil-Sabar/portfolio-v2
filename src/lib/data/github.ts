/**
 * GitHub stats — shared types, constants, and pure helpers.
 *
 * This module is intentionally free of any server-only import so that both the
 * build-time fetcher (`$lib/server/github-api`) and the Svelte component can use
 * it. Anything that touches `fetch`, `$env`, or the network belongs in the server
 * module instead.
 */

export const GITHUB_USERNAME = 'Fadhil-Sabar';
export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

export interface ContributionDay {
	date: string;
	count: number;
}

export interface ContributionWeek {
	/** Sunday-indexed first day of the week, e.g. '2026-01-04'. */
	firstDay: string;
	days: ContributionDay[];
}

export interface CalendarDay {
	date: string;
	count: number;
}

export interface CalendarWeek {
	/** Always 7 entries. `null` is padding outside the tracked range. */
	days: (CalendarDay | null)[];
}

/** Intensity bucket 0-4, used to pick a shade from the neutral palette. */
export type Level = 0 | 1 | 2 | 3 | 4;

export interface GitHubStats {
	username: string;
	/** Contributions since Jan 1 of the current year. `null` when unavailable. */
	contributions: number | null;
	/** Total stars across owned, non-fork repositories. */
	stars: number;
	publicRepos: number;
	weeks: ContributionWeek[];
	/** Sunday-aligned grid derived from `weeks`; empty when the calendar is unavailable. */
	calendar: CalendarWeek[];
	/** Peak single-day count, used to scale the intensity buckets. */
	peak: number;
	/**
	 * Most recent public event on one of your own repos, reduced to what the page
	 * shows. `null` when nothing qualifies.
	 */
	activity: Activity | null;
	/** Recent pull requests and issues, newest first. Empty without a token. */
	recentContributions: ContributionItem[];
	/** ISO timestamp of the fetch that produced this snapshot. */
	fetchedAt: string;
	/**
	 * When the calendar and activity log were last refreshed, which can be older than
	 * `fetchedAt`: a build without `GITHUB_TOKEN` still gets live REST numbers but
	 * borrows the last known GraphQL results. `null` when there are none.
	 */
	calendarFetchedAt: string | null;
}

/** One recent public event, trimmed to the fields worth displaying. */
export interface Activity {
	/** Raw GitHub event type, e.g. 'PushEvent'. */
	type: string;
	/** Repo short name without the owner prefix, e.g. 'mimin-webui'. */
	repo: string | null;
	/** ISO date (YYYY-MM-DD) of the event. */
	date: string;
}

/** A pull request or issue worth listing beside the calendar. */
export interface ContributionItem {
	kind: 'pull-request' | 'issue';
	title: string;
	/** Repo short name without the owner prefix. */
	repo: string;
	/** ISO date (YYYY-MM-DD) of creation. */
	date: string;
	/** `null` for issues, which have no diff. */
	additions: number | null;
	deletions: number | null;
	comments: number;
}

/**
 * Short display names for GitHub event types. The raw names ('PushEvent') are
 * accurate but clunky; unmapped types fall through to the raw name rather than
 * rendering as a missing translation key.
 */
const ACTIVITY_LABELS: Record<string, string> = {
	PushEvent: 'Push',
	PullRequestEvent: 'Pull request',
	PullRequestReviewEvent: 'Review',
	PullRequestReviewCommentEvent: 'Review comment',
	IssueCommentEvent: 'Issue comment',
	IssuesEvent: 'Issue',
	CreateEvent: 'Create',
	DeleteEvent: 'Delete',
	ForkEvent: 'Fork',
	ReleaseEvent: 'Release',
	WatchEvent: 'Star',
	PublicEvent: 'Make public'
};

export function activityLabel(type: string): string {
	return ACTIVITY_LABELS[type] ?? type;
}

/** Sunday = 0 … Saturday = 6, computed in UTC so no local timezone shifts a day. */
export function weekdayIndex(isoDate: string): number {
	const [y, m, d] = isoDate.split('-').map(Number);
	return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

/**
 * Turn GitHub's partial-edge week list into full 7-day weeks, padded with `null`
 * so the grid lines up with real weekdays. GitHub returns the first and last weeks
 * truncated to the requested date range, which would otherwise shift every
 * subsequent day up by a few rows.
 */
export function shapeCalendar(weeks: ContributionWeek[]): CalendarWeek[] {
	const flat = weeks.flatMap((w) => w.days);
	if (flat.length === 0) return [];

	const cells: (CalendarDay | null)[] = new Array(weekdayIndex(flat[0].date)).fill(null);
	for (const day of flat) cells.push({ date: day.date, count: day.count });

	while (cells.length % 7 !== 0) cells.push(null);

	const out: CalendarWeek[] = [];
	for (let i = 0; i < cells.length; i += 7) out.push({ days: cells.slice(i, i + 7) });
	return out;
}

/**
 * Bucket a day count against the calendar's peak day. Relative thresholds keep
 * the ramp readable for both a quiet year and a heavy one, where fixed cutoffs
 * would flatten everything to a single shade.
 */
export function level(count: number, peak: number): Level {
	if (count <= 0 || peak <= 0) return 0;
	const ratio = count / peak;
	if (ratio <= 0.25) return 1;
	if (ratio <= 0.5) return 2;
	if (ratio <= 0.75) return 3;
	return 4;
}

/** 1234 → '1,234'. Keeps large numbers from melting the layout. */
export function formatCount(n: number): string {
	return n.toLocaleString('en-US');
}

/** +410 / −17, using a real minus sign. */
export function formatDelta(n: number): string {
	return `${n > 0 ? '+' : n < 0 ? '−' : ''}${Math.abs(n).toLocaleString('en-US')}`;
}

/**
 * '2026-09-22' → 'Sep 22'. Month abbreviations are the same in id and en.
 *
 * Dates are always absolute rather than relative ("4 days ago") because the page is
 * prerendered: relative wording silently goes stale between deploys and starts lying.
 */
export function formatShortDate(iso: string): string {
	const [y, m, d] = iso.split('-').map(Number);
	if (!y || !m || !d) return iso;
	return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		timeZone: 'UTC'
	});
}

/**
 * The handful of pull requests and issues shown beside the calendar.
 *
 * `maxAgeDays` is what keeps years-old issues on unrelated repos ("Page beranda",
 * a university assignment) out of a portfolio — GitHub returns them by *last
 * updated*, so an old issue touched recently would otherwise float to the top.
 */
export function selectRecentActivity(
	items: ContributionItem[],
	now: Date,
	maxAgeDays = 90,
	limit = 5
): ContributionItem[] {
	const cutoff = new Date(now.getTime() - maxAgeDays * 86_400_000);
	const cutoffKey = cutoff.toISOString().slice(0, 10);

	return items
		.filter((i) => i.date >= cutoffKey)
		.sort((a, b) => b.date.localeCompare(a.date))
		.slice(0, limit);
}

/**
 * Whether a group holds a real result. `null` and `[]` both mean "nothing here";
 * a numeric `0` does not, because zero contributions is a genuine answer.
 */
function hasContent<T>(value: T | null | undefined): boolean {
	if (value === null || value === undefined) return false;
	return Array.isArray(value) ? value.length > 0 : true;
}

export interface MergeResult {
	stats: GitHubStats;
	/** Which groups were taken from the snapshot, for the build log. */
	borrowed: string[];
}

/**
 * Fill in the token-only groups from the committed snapshot.
 *
 * Without `GITHUB_TOKEN` the REST numbers are still live but the contribution
 * calendar and the activity list are not fetchable. Rather than dropping them from
 * the page, keep the last known copies — and carry the snapshot's own timestamp, so
 * the UI shows how stale they are instead of dressing them up with the build date.
 *
 * Pure and exported so it can be tested without a network call.
 */
export function mergeSnapshot(fresh: GitHubStats, cached: GitHubStats): MergeResult {
	const stats = { ...fresh };
	const borrowed: string[] = [];

	if (!hasContent(fresh.contributions) && hasContent(cached.contributions)) {
		stats.contributions = cached.contributions;
		stats.weeks = cached.weeks;
		stats.calendar = cached.calendar;
		stats.peak = cached.peak;
		stats.calendarFetchedAt = cached.calendarFetchedAt ?? cached.fetchedAt;
		borrowed.push('calendar');
	}

	if (!hasContent(fresh.recentContributions) && hasContent(cached.recentContributions)) {
		stats.recentContributions = cached.recentContributions;
		borrowed.push('activity');
	}

	return { stats, borrowed };
}
