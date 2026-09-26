import { describe, expect, test } from 'bun:test';
import {
	activityLabel,
	formatCount,
	formatDelta,
	formatShortDate,
	level,
	mergeSnapshot,
	selectRecentActivity,
	shapeCalendar,
	weekdayIndex,
	type ContributionItem,
	type ContributionWeek,
	type GitHubStats
} from '../src/lib/data/github';

const day = (date: string, count: number) => ({ date, count });

/** Build a week list the way the GitHub API returns it: Sunday-aligned, edges truncated. */
function weeksFrom(dates: { date: string; count: number }[]): ContributionWeek[] {
	const out: ContributionWeek[] = [];
	let current: ContributionWeek | null = null;
	for (const d of dates) {
		if (!current || weekdayIndex(d.date) === 0) {
			current = { firstDay: d.date, days: [] };
			out.push(current);
		}
		current.days.push(day(d.date, d.count));
	}
	return out;
}

describe('weekdayIndex', () => {
	test('is Sunday-indexed', () => {
		expect(weekdayIndex('2026-01-04')).toBe(0); // Sunday
		expect(weekdayIndex('2026-01-05')).toBe(1); // Monday
		expect(weekdayIndex('2026-01-10')).toBe(6); // Saturday
	});

	test('is unaffected by the local timezone', () => {
		// A plain toISOString().slice(0,10) round-trip would be safe; new Date(y, m, d)
		// would be not, which is why this is computed in UTC.
		expect(weekdayIndex('2026-09-26')).toBe(6);
	});
});

describe('shapeCalendar', () => {
	test('pads the first week so days land on their real weekday row', () => {
		// 2026-01-01 is a Thursday, so the first three cells are padding.
		const cal = shapeCalendar(weeksFrom([day('2026-01-01', 2), day('2026-01-02', 0), day('2026-01-03', 5)]));

		expect(cal).toHaveLength(1);
		expect(cal[0].days).toHaveLength(7);
		expect(cal[0].days.slice(0, 4).every((d) => d === null)).toBe(true);
		expect(cal[0].days[4]).toEqual({ date: '2026-01-01', count: 2 });
		expect(cal[0].days[5]).toEqual({ date: '2026-01-02', count: 0 });
		expect(cal[0].days[6]).toEqual({ date: '2026-01-03', count: 5 });
	});

	test('pads the final week to a full 7', () => {
		const cal = shapeCalendar(weeksFrom([day('2026-01-04', 1), day('2026-01-05', 1)]));

		expect(cal[0].days).toHaveLength(7);
		expect(cal[0].days[6]).toBeNull();
	});

	test('keeps every day, in order, across week boundaries', () => {
		const dates = Array.from({ length: 40 }, (_, i) => ({
			date: new Date(Date.UTC(2026, 0, 4 + i)).toISOString().slice(0, 10),
			count: i
		}));
		const cal = shapeCalendar(weeksFrom(dates));
		const flat = cal.flatMap((w) => w.days).filter((d) => d !== null);

		expect(flat).toHaveLength(40);
		expect(flat.map((d) => d!.date)).toEqual(dates.map((d) => d.date));
		expect(cal.every((w) => w.days.length === 7)).toBe(true);
	});

	test('returns nothing for an empty range', () => {
		expect(shapeCalendar([])).toEqual([]);
	});
});

describe('level', () => {
	test('zero days are always level 0', () => {
		expect(level(0, 25)).toBe(0);
		expect(level(0, 0)).toBe(0);
	});

	test('ramps against the calendar peak', () => {
		expect(level(1, 100)).toBe(1);
		expect(level(25, 100)).toBe(1);
		expect(level(26, 100)).toBe(2);
		expect(level(50, 100)).toBe(2);
		expect(level(51, 100)).toBe(3);
		expect(level(75, 100)).toBe(3);
		expect(level(76, 100)).toBe(4);
		expect(level(100, 100)).toBe(4);
	});

	test('does not divide by zero when the year is empty', () => {
		expect(level(3, 0)).toBe(0);
	});
});

describe('formatCount', () => {
	test('groups thousands', () => {
		expect(formatCount(280)).toBe('280');
		expect(formatCount(1284)).toBe('1,284');
		expect(formatCount(1234567)).toBe('1,234,567');
	});
});

describe('activityLabel', () => {
	test('shortens the event types GitHub actually sends', () => {
		expect(activityLabel('PushEvent')).toBe('Push');
		expect(activityLabel('PullRequestEvent')).toBe('Pull request');
		expect(activityLabel('ReleaseEvent')).toBe('Release');
	});

	test('falls through to the raw type for an unknown event', () => {
		// Better than rendering a missing-translation key at the visitor.
		expect(activityLabel('SomeFutureGitHubEvent')).toBe('SomeFutureGitHubEvent');
	});
});

describe('formatShortDate', () => {
	test('renders a short month and day', () => {
		expect(formatShortDate('2026-09-22')).toBe('Sep 22');
		expect(formatShortDate('2026-01-04')).toBe('Jan 4');
	});

	test('passes through anything unparseable rather than printing NaN', () => {
		expect(formatShortDate('nope')).toBe('nope');
		expect(formatShortDate('')).toBe('');
	});
});

describe('formatDelta', () => {
	test('signs additions and deletions with a real minus', () => {
		expect(formatDelta(410)).toBe('+410');
		expect(formatDelta(-17)).toBe('−17');
		expect(formatDelta(0)).toBe('0');
		expect(formatDelta(5211)).toBe('+5,211');
	});
});

describe('selectRecentActivity', () => {
	const now = new Date('2026-09-26T12:00:00Z');
	function item(date: string, over: Partial<ContributionItem> = {}): ContributionItem {
		return {
			kind: 'pull-request',
			title: 'something',
			repo: 'mimin-webui',
			date,
			additions: 1,
			deletions: 0,
			comments: 0,
			...over
		};
	}

	test('sorts newest first', () => {
		const out = selectRecentActivity([item('2026-09-01'), item('2026-09-20'), item('2026-09-10')], now);
		expect(out.map((i) => i.date)).toEqual(['2026-09-20', '2026-09-10', '2026-09-01']);
	});

	test('drops anything outside the recency window', () => {
		const out = selectRecentActivity(
			[item('2026-09-20'), item('2025-12-16'), item('2026-01-31')],
			now
		);
		expect(out.map((i) => i.date)).toEqual(['2026-09-20']);
	});

	test('caps the list so the column stays short', () => {
		const many = Array.from({ length: 12 }, (_, i) => item(`2026-09-${String(20 - i).padStart(2, '0')}`));
		expect(selectRecentActivity(many, now, 90, 5)).toHaveLength(5);
	});

	test('keeps the boundary day and drops the one just outside it', () => {
		// now - 90 days is 2026-06-28; an off-by-one here would silently lose a row.
		const out = selectRecentActivity([item('2026-06-28'), item('2026-06-27')], now, 90);
		expect(out.map((i) => i.date)).toEqual(['2026-06-28']);
	});
});

describe('mergeSnapshot', () => {
	function stats(over: Partial<GitHubStats> = {}): GitHubStats {
		return {
			username: 'Fadhil-Sabar',
			contributions: null,
			stars: 1,
			publicRepos: 61,
			weeks: [],
			calendar: [],
			peak: 0,
			activity: null,
			recentContributions: [],
			fetchedAt: '2026-09-26T16:00:00.000Z',
			calendarFetchedAt: null,
			...over
		};
	}

	const item: ContributionItem = {
		kind: 'pull-request',
		title: 't',
		repo: 'r',
		date: '2026-08-01',
		additions: 1,
		deletions: 0,
		comments: 0
	};

	test('keeps everything live when the live fetch was complete', () => {
		const live = stats({
			contributions: 280,
			calendarFetchedAt: '2026-09-26T16:00:00.000Z',
			recentContributions: [item],
			stars: 2
		});
		const { stats: out, borrowed } = mergeSnapshot(
			live,
			stats({ contributions: 99, recentContributions: [item], stars: 7 })
		);

		expect(borrowed).toEqual([]);
		expect(out.stars).toBe(2);
		expect(out.contributions).toBe(280);
	});

	test('borrows the calendar and activity when the build had no token', () => {
		// The live REST numbers stay live; only the GraphQL groups come from the snapshot.
		const cached = stats({
			contributions: 280,
			calendar: [{ days: [null, { date: '2026-01-04', count: 3 }] }],
			peak: 3,
			recentContributions: [item],
			fetchedAt: '2026-08-01T00:00:00.000Z',
			calendarFetchedAt: '2026-08-01T00:00:00.000Z'
		});
		const { stats: out, borrowed } = mergeSnapshot(stats({ stars: 1, publicRepos: 62 }), cached);

		expect(borrowed).toEqual(['calendar', 'activity']);
		expect(out.contributions).toBe(280);
		expect(out.peak).toBe(3);
		expect(out.recentContributions).toEqual([item]);
		// The stale group keeps the snapshot's own date so the page cannot present it
		// as fresh.
		expect(out.calendarFetchedAt).toBe('2026-08-01T00:00:00.000Z');
		// …while the live REST numbers keep the build timestamp.
		expect(out.fetchedAt).toBe('2026-09-26T16:00:00.000Z');
		expect(out.publicRepos).toBe(62);
	});

	test('does not borrow when the snapshot is empty too', () => {
		const { stats: out, borrowed } = mergeSnapshot(stats(), stats());
		expect(borrowed).toEqual([]);
		expect(out.contributions).toBeNull();
		expect(out.recentContributions).toEqual([]);
	});

	test('treats an empty live calendar as missing, not as a real result', () => {
		// A user with no contributions in range yields a real (empty) calendar; that
		// must not be silently replaced by a stale snapshot.
		const cached = stats({ contributions: 280, recentContributions: [item] });
		const { stats: out, borrowed } = mergeSnapshot(stats({ contributions: 0 }), cached);

		expect(borrowed).toEqual(['activity']);
		expect(out.contributions).toBe(0);
	});
});
