/**
 * GitHub API access. Takes the token as an argument rather than reading `$env`
 * itself, so both the prerender path (`$lib/server/github-stats`) and the
 * standalone snapshot script (`bun run stats:refresh`) can drive it.
 *
 * Imports the data module relatively rather than via `$lib` because this file is
 * also loaded by plain `bun`, which does not know SvelteKit's path aliases.
 */

import {
	GITHUB_USERNAME,
	selectRecentActivity,
	shapeCalendar,
	type Activity,
	type ContributionItem,
	type ContributionWeek,
	type GitHubStats
} from '../data/github';

const REST = 'https://api.github.com';
const GRAPHQL = 'https://api.github.com/graphql';
const USER_AGENT = 'portfolio-claude';
const MAX_REPO_PAGES = 5;

/**
 * Calendar and activity list in one round trip.
 *
 * The calendar totals are exact, but the per-node `occurredAt` list under
 * `contributions` is not — GitHub returns a sparse subset — which is why the page
 * shows a heatmap rather than one dated row per commit.
 */
const GRAPHQL_QUERY = `
	query ($login: String!, $from: DateTime!, $to: DateTime!) {
		user(login: $login) {
			contributionsCollection(from: $from, to: $to) {
				contributionCalendar {
					totalContributions
					weeks {
						firstDay
						contributionDays {
							date
							contributionCount
						}
					}
				}
			}
			pullRequests(first: 20, orderBy: { field: UPDATED_AT, direction: DESC }) {
				nodes {
					title
					createdAt
					additions
					deletions
					comments { totalCount }
					repository { nameWithOwner }
				}
			}
			issues(first: 20, orderBy: { field: UPDATED_AT, direction: DESC }) {
				nodes {
					title
					createdAt
					comments { totalCount }
					repository { nameWithOwner }
				}
			}
		}
	}
`;

function headers(token?: string): HeadersInit {
	return {
		Accept: 'application/vnd.github+json',
		'User-Agent': USER_AGENT,
		...(token ? { Authorization: `Bearer ${token}` } : {})
	};
}

async function rest<T>(path: string, token?: string): Promise<T> {
	const res = await fetch(`${REST}${path}`, { headers: headers(token) });
	if (!res.ok) throw new Error(`GET ${path} responded ${res.status}`);
	return (await res.json()) as T;
}

interface RawItem {
	title: string;
	createdAt: string;
	comments: { totalCount: number };
	repository: { nameWithOwner: string };
	additions?: number;
	deletions?: number;
}

interface GraphQLBody {
	data?: {
		user: {
			contributionsCollection: {
				contributionCalendar: { totalContributions: number; weeks: RawWeek[] };
			};
			pullRequests: { nodes: RawItem[] };
			issues: { nodes: RawItem[] };
		} | null;
	};
	errors?: { message: string }[];
}

interface RawWeek {
	firstDay: string;
	contributionDays: { date: string; contributionCount: number }[];
}

/** This year's contributions plus the recent PRs and issues. Requires a token. */
async function fetchGraphQL(
	token: string
): Promise<{ total: number; weeks: ContributionWeek[]; items: ContributionItem[] }> {
	const now = new Date();

	const res = await fetch(GRAPHQL, {
		method: 'POST',
		headers: { ...headers(token), 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: GRAPHQL_QUERY,
			variables: {
				login: GITHUB_USERNAME,
				from: `${now.getUTCFullYear()}-01-01T00:00:00Z`,
				to: now.toISOString()
			}
		})
	});

	if (!res.ok) throw new Error(`POST /graphql responded ${res.status}`);
	const body = (await res.json()) as GraphQLBody;

	if (body.errors?.length) throw new Error(`GraphQL: ${body.errors[0].message}`);
	const user = body.data?.user;
	if (!user) throw new Error('GraphQL: user unavailable');

	const strip = (nameWithOwner: string) => nameWithOwner.split('/')[1] ?? nameWithOwner;

	// Rename `contributionDays` → `days` and unwrap the count so the rest of the
	// codebase deals in one shape.
	const weeks: ContributionWeek[] = user.contributionsCollection.contributionCalendar.weeks.map(
		(w) => ({
			firstDay: w.firstDay,
			days: w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount }))
		})
	);

	const items: ContributionItem[] = [
		...user.pullRequests.nodes.map((p) => ({
			kind: 'pull-request' as const,
			title: p.title,
			repo: strip(p.repository.nameWithOwner),
			date: p.createdAt.slice(0, 10),
			additions: p.additions ?? 0,
			deletions: p.deletions ?? 0,
			comments: p.comments.totalCount
		})),
		...user.issues.nodes.map((i) => ({
			kind: 'issue' as const,
			title: i.title,
			repo: strip(i.repository.nameWithOwner),
			date: i.createdAt.slice(0, 10),
			additions: null,
			deletions: null,
			comments: i.comments.totalCount
		}))
	];

	return {
		total: user.contributionsCollection.contributionCalendar.totalContributions,
		weeks,
		items: selectRecentActivity(items, now)
	};
}

/**
 * The most recent public event on one of your own repos.
 *
 * GitHub's public events feed only covers the last 90 days, and one page is 30
 * events — so this is "recent activity", not an archive. Events on other people's
 * repos (starring, forking) are dropped: they are public, but they are other
 * people's work and read as noise on a personal portfolio.
 */
async function fetchActivity(token?: string): Promise<Activity | null> {
	const events = await rest<{ type: string; created_at: string; repo: { name: string } }[]>(
		`/users/${GITHUB_USERNAME}/events/public?per_page=30`,
		token
	);

	const own = events
		.filter((e) => e.repo?.name?.startsWith(`${GITHUB_USERNAME}/`))
		.sort((a, b) => b.created_at.localeCompare(a.created_at));

	const latest = own[0];
	if (!latest) return null;

	const date = latest.created_at.slice(0, 10);
	if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;

	return {
		type: latest.type,
		repo: latest.repo.name.slice(GITHUB_USERNAME.length + 1),
		date
	};
}

/** Follow `rel="next"` for at most MAX_REPO_PAGES, so the star total stays honest. */
async function fetchStars(token?: string): Promise<number> {
	let stars = 0;
	let page = 1;
	let next: string | null = `${REST}/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner`;

	while (next && page <= MAX_REPO_PAGES) {
		// Annotations break a circular inference: `next` is fed from `res`, whose
		// type would otherwise be inferred from the loop it appears in.
		const res: Response = await fetch(next, { headers: headers(token) });
		if (!res.ok) throw new Error(`GET repos page ${page} responded ${res.status}`);

		const repos = (await res.json()) as { fork: boolean; stargazers_count: number }[];

		for (const repo of repos) {
			if (!repo.fork) stars += repo.stargazers_count;
		}

		const link: string | null = res.headers.get('link');
		const match: RegExpMatchArray | null = link?.match(/<([^>]+)>;\s*rel="next"/) ?? null;
		next = match ? match[1] : null;
		page += 1;
	}

	return stars;
}

/**
 * Public profile numbers plus this year's contribution calendar.
 * `contributions`, the activity list, and the calendar stay empty when no token is
 * supplied, since GraphQL contributions are not readable anonymously.
 */
export async function fetchGitHubStats(token?: string): Promise<GitHubStats> {
	const profile = await rest<{ public_repos: number }>(`/users/${GITHUB_USERNAME}`, token);
	const stars = await fetchStars(token);
	const activity = await fetchActivity(token);
	const now = new Date().toISOString();

	let contributions: number | null = null;
	let weeks: ContributionWeek[] = [];
	let recentContributions: ContributionItem[] = [];
	if (token) {
		const gql = await fetchGraphQL(token);
		contributions = gql.total;
		weeks = gql.weeks;
		recentContributions = gql.items;
	} else {
		console.warn('[github-stats] no token given — skipping contribution calendar and activity list');
	}

	const calendar = shapeCalendar(weeks);
	const peak = calendar.reduce(
		(max, week) => week.days.reduce((m, d) => (d && d.count > m ? d.count : m), max),
		0
	);

	return {
		username: GITHUB_USERNAME,
		contributions,
		stars,
		publicRepos: profile.public_repos,
		weeks,
		calendar,
		peak,
		activity,
		recentContributions,
		fetchedAt: now,
		calendarFetchedAt: weeks.length > 0 ? now : null
	};
}
