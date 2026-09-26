<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import {
		GITHUB_PROFILE_URL,
		activityLabel,
		formatCount,
		formatDelta,
		formatShortDate,
		level,
		type GitHubStats
	} from '$lib/data/github';
	import {
		DUOLINGO_PROFILE_URL,
		barPercent,
		joinYear,
		type DuolingoStats
	} from '$lib/data/duolingo';
	import { t } from '$lib/stores/t';

	/**
	 * Unlike the other sections this one takes props: the numbers are fetched at
	 * prerender time in `+page.server.ts`, so they cannot come from `$lib/data/`
	 * the way `projects.ts` / `skills.ts` do.
	 */
	let { stats, duolingo }: { stats: GitHubStats; duolingo: DuolingoStats } = $props();

	const metrics = $derived([
		{ value: stats.stars, label: $t('stats.stars') },
		{ value: stats.publicRepos, label: $t('stats.repos') }
	]);

	// Prefer the calendar's own timestamp: a build without a token can carry a
	// live REST number next to a snapshot calendar, and showing the build date
	// would disguise the calendar as fresh.
	const updated = $derived(stats.calendarFetchedAt ?? stats.fetchedAt);

	// GitHub honours from/to on the profile overview to scope the contribution graph.
	const year = $derived(updated.slice(0, 4));
	const graphUrl = $derived(
		`${GITHUB_PROFILE_URL}?tab=overview&from=${year}-01-01&to=${updated.slice(0, 10)}`
	);
	const calendarLabel = $derived(
		`${$t('stats.contributions')}: ${formatCount(stats.contributions ?? 0)}`
	);
	const latestActivityUrl = $derived(
		stats.activity?.repo ? `${GITHUB_PROFILE_URL}/${stats.activity.repo}` : GITHUB_PROFILE_URL
	);
	const repoUrl = (repo: string) => `${GITHUB_PROFILE_URL}/${repo}`;

	/**
	 * English needs a singular form ("1 comment"); Indonesian does not inflect, so both
	 * of its keys read the same. The dictionaries still need both, or English would
	 * render "1 comments".
	 */
	const commentCount = (n: number) =>
		n === 1 ? $t('stats.comment', { n }) : $t('stats.comments', { n });

	const coursePeak = $derived(duolingo.courses.reduce((max, c) => Math.max(max, c.xp), 0));
</script>

<section id="stats">
	<div class="section-container">
		<div class="section-label" use:reveal>// 05 — GitHub</div>
		<h2 class="section-title" use:reveal>{$t('stats.title')}</h2>

		<div class="panel" use:reveal={100}>
			<div class="panel-head">
				<a href={GITHUB_PROFILE_URL} target="_blank" rel="noopener" class="handle">
					github.com/{stats.username}
				</a>
				<span class="fetched">{$t('stats.updated')} {updated.slice(0, 10)}</span>
			</div>

			<div class="figures">
				{#if stats.contributions !== null}
					<a href={graphUrl} target="_blank" rel="noopener" class="figure figure-lead">
						<span class="figure-value">{formatCount(stats.contributions)}</span>
						<span class="figure-label">{$t('stats.contributions')}</span>
					</a>
				{/if}

				{#each metrics as m}
					<a href={GITHUB_PROFILE_URL} target="_blank" rel="noopener" class="figure">
						<span class="figure-value">{formatCount(m.value)}</span>
						<span class="figure-label">{m.label}</span>
					</a>
				{/each}
			</div>

			{#if stats.calendar.length > 0}
				<div class="split" use:reveal={150}>
					<div class="calendar-wrap">
						<div class="calendar" role="img" aria-label={calendarLabel}>
							{#each stats.calendar as week}
								<div class="week">
									{#each week.days as day}
										{#if day}
											<span
												class="day"
												data-level={level(day.count, stats.peak)}
												title="{day.date} · {day.count}"
											></span>
										{:else}
											<span class="day day-void"></span>
										{/if}
									{/each}
								</div>
							{/each}
						</div>

						<div class="calendar-foot">
							<div class="legend">
								<span>{$t('stats.less')}</span>
								{#each [0, 1, 2, 3, 4] as l (l)}
									<span class="day" data-level={l}></span>
								{/each}
								<span>{$t('stats.more')}</span>
							</div>
						</div>
					</div>

					<aside class="activity">
						<div class="activity-head">{$t('stats.recentActivity')}</div>

						{#if stats.recentContributions.length === 0}
							<p class="activity-empty">{$t('stats.noActivity')}</p>
						{:else}
							<ul class="activity-list">
								{#each stats.recentContributions as item (item.repo + item.title + item.date)}
									<li>
										<a href={repoUrl(item.repo)} target="_blank" rel="noopener" class="item">
											<div class="item-top">
												<span class="item-kind">
													{item.kind === 'pull-request'
														? $t('stats.pullRequest')
														: $t('stats.issue')}
												</span>
												<span class="item-date">{formatShortDate(item.date)}</span>
											</div>
											<p class="item-title">{item.title}</p>
											<div class="item-meta">
												<span class="item-repo">{item.repo}</span>
												{#if item.additions !== null}
													<span class="add">+{formatDelta(item.additions).slice(1)}</span>
													<span class="del">−{formatDelta(item.deletions ?? 0).slice(1)}</span>
												{/if}
												{#if item.comments > 0}
													<span class="comments">{commentCount(item.comments)}</span>
												{/if}
											</div>
										</a>
									</li>
								{/each}
							</ul>
						{/if}

						{#if stats.activity}
							<a href={latestActivityUrl} target="_blank" rel="noopener" class="last-activity">
								{$t('stats.lastActivity')}
								<span class="act-kind">{activityLabel(stats.activity.type)}</span>
								{#if stats.activity.repo}<span class="act-repo">{stats.activity.repo}</span>{/if}
								<span class="act-date">{formatShortDate(stats.activity.date)}</span>
							</a>
						{/if}
					</aside>
				</div>
			{/if}
		</div>

		<div class="panel" use:reveal={100}>
			<div class="panel-head">
				<a href={DUOLINGO_PROFILE_URL} target="_blank" rel="noopener" class="handle">
					duolingo.com/{duolingo.username}
				</a>
				<span class="fetched">
					{$t('stats.updated')} {duolingo.fetchedAt.slice(0, 10)}
				</span>
			</div>

			<div class="figures">
				<a href={DUOLINGO_PROFILE_URL} target="_blank" rel="noopener" class="figure figure-lead">
					<span class="figure-value">{formatCount(duolingo.streak)}</span>
					<span class="figure-label">{$t('stats.streak')}</span>
				</a>
				<a href={DUOLINGO_PROFILE_URL} target="_blank" rel="noopener" class="figure">
					<span class="figure-value">{formatCount(duolingo.totalXp)}</span>
					<span class="figure-label">{$t('stats.xp')}</span>
				</a>
				<div class="figure">
					<span class="figure-value">{joinYear(duolingo.joined) ?? '—'}</span>
					<span class="figure-label">{$t('stats.joined')}</span>
				</div>
			</div>

			{#if duolingo.courses.length > 0}
				<div class="courses">
					{#each duolingo.courses as course (course.title)}
						<div class="course">
							<span class="course-title">{course.title}</span>
							<span class="course-bar">
								<span class="course-fill" style="width: {barPercent(course.xp, coursePeak)}%"></span>
							</span>
							<span class="course-xp">{formatCount(course.xp)}</span>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</section>

<style>
	section {
		background: var(--bg-base);
		/* GitHub's green ramp, revealed on hover. Declared at the section so the
		   "last active" pip can borrow one; the legend swatches still stay neutral
		   because the colour rules below are scoped to `.week`. */
		--gh-0: #0e4429;
		--gh-1: #006d32;
		--gh-2: #26a641;
		--gh-3: #39d353;
		--gh-4: #7ee787;
	}
	.section-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 100px 48px;
	}
	.section-label {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.15em;
		color: var(--text-muted);
		text-transform: uppercase;
		margin-bottom: 14px;
		display: flex;
		align-items: center;
		gap: 14px;
	}
	.section-title {
		font-family: var(--font-display);
		font-size: clamp(1.8rem, 3.5vw, 3rem);
		font-weight: 700;
		letter-spacing: -0.03em;
		color: var(--text-bright);
		line-height: 1.05;
		margin-bottom: 56px;
	}

	.panel {
		border: 1px solid var(--border-faint);
		background: var(--bg-elevated);
	}
	/* Two stacked sources; the gap between them is the shared 1px border, not a rule. */
	.panel + .panel { margin-top: 24px; }
	.panel-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		flex-wrap: wrap;
		padding: 16px 24px;
		border-bottom: 1px solid var(--border-faint);
	}
	.handle {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.06em;
		color: var(--text-soft);
		text-decoration: none;
		transition: color 0.2s;
	}
	.handle:hover { color: var(--text-bright); }
	.fetched {
		font-family: var(--font-mono);
		font-size: 9px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--text-muted);
	}

	/* Figures — a 1px gap over the border colour reads as a hairline grid,
	   matching the Skills section instead of floating cards. */
	.figures {
		display: grid;
		grid-template-columns: 1.6fr 1fr 1fr;
		gap: 1px;
		background: var(--border-faint);
		border-bottom: 1px solid var(--border-faint);
	}
	.figure {
		background: var(--bg-elevated);
		padding: 28px 24px;
		text-decoration: none;
		display: flex;
		flex-direction: column;
		gap: 8px;
		transition: background 0.2s;
	}
	.figure:hover { background: var(--bg-overlay); }
	.figure-value {
		font-family: var(--font-display);
		font-size: 2rem;
		font-weight: 700;
		letter-spacing: -0.03em;
		color: var(--text-bright);
		line-height: 1;
		font-variant-numeric: tabular-nums;
	}
	.figure-lead .figure-value { font-size: 3.2rem; }
	.figure-label {
		font-family: var(--font-mono);
		font-size: 9px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--text-muted);
	}

	.courses {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 24px;
	}
	.course {
		display: grid;
		grid-template-columns: 90px 1fr 56px;
		align-items: center;
		gap: 14px;
	}
	.course-title {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--text-soft);
	}
	.course-bar {
		height: 4px;
		background: var(--border-faint);
		display: block;
	}
	.course-fill {
		height: 100%;
		display: block;
		background: var(--text-muted);
		transition: width 0.4s ease-out;
	}
	.course-xp {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.06em;
		color: var(--text-muted);
		text-align: right;
		font-variant-numeric: tabular-nums;
	}

	/* Calendar left, activity list right. */
	.split {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		gap: 1px;
		background: var(--border-faint);
		border-top: 1px solid var(--border-faint);
	}
	.calendar-wrap { padding: 28px 24px 24px; background: var(--bg-elevated); }
	.calendar {
		display: flex;
		gap: 3px;
		overflow-x: auto;
		padding-bottom: 4px;
		scrollbar-width: thin;
		scrollbar-color: var(--border-soft) transparent;
	}
	.week {
		display: grid;
		grid-template-rows: repeat(7, 10px);
		gap: 3px;
		flex-shrink: 0;
	}
	.day {
		width: 10px;
		height: 10px;
		border-radius: 1px;
		background: var(--border-faint);
	}
	.day[data-level='1'] { background: var(--border-soft); }
	.day[data-level='2'] { background: var(--border-hard); }
	.day[data-level='3'] { background: var(--text-muted); }
	.day[data-level='4'] { background: var(--text-soft); }
	/* Days past the end of the range — outlined, not filled. */
	.day-void { background: transparent; box-shadow: inset 0 0 0 1px var(--border-faint); }

	/* Hovering a cell reveals its intensity: before, a 25-commitment day and an
	   empty one looked identical until the tooltip appeared. The ring keeps the
	   scaled-up cell from bleeding into its neighbours at the 13px cell pitch. */
	.week .day {
		transition: transform 0.15s ease-out, box-shadow 0.15s ease-out, background 0.15s ease-out;
	}
	.week .day:hover {
		position: relative;
		z-index: 1;
		transform: scale(1.4);
		box-shadow: 0 0 0 1px var(--bg-elevated), 0 0 0 2px var(--text-bright);
	}
	/* Hover colour, one green per level, so a busy day reads more vivid than a
	   quiet one. Matches GitHub's own dark-theme ramp. */
	.week .day[data-level='0']:hover { background: var(--gh-0); }
	.week .day[data-level='1']:hover { background: var(--gh-1); }
	.week .day[data-level='2']:hover { background: var(--gh-2); }
	.week .day[data-level='3']:hover { background: var(--gh-3); }
	.week .day[data-level='4']:hover { background: var(--gh-4); }

	.calendar-foot {
		display: flex;
		align-items: center;
		gap: 16px;
		flex-wrap: wrap;
		margin-top: 14px;
	}
	.legend {
		display: flex;
		align-items: center;
		gap: 4px;
		font-family: var(--font-mono);
		font-size: 9px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--text-muted);
	}
	.legend span:first-child { margin-right: 4px; }
	.legend span:last-child { margin-left: 4px; }
	/* Activity list: the right-hand column. */
	.activity {
		background: var(--bg-elevated);
		padding: 28px 24px 24px;
		display: flex;
		flex-direction: column;
	}
	.activity-head {
		font-family: var(--font-mono);
		font-size: 9px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--text-muted);
		padding-bottom: 12px;
		margin-bottom: 4px;
		border-bottom: 1px solid var(--border-soft);
	}
	.activity-empty {
		font-family: var(--font-mono);
		font-size: 10px;
		color: var(--text-muted);
		padding: 16px 0;
	}
	.activity-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		/* Capped and scrollable so five items cannot stretch the panel: the header stays
		   pinned and the calendar column keeps the row short. */
		max-height: 13rem;
		overflow-y: auto;
		overscroll-behavior: contain;
		scrollbar-width: thin;
		scrollbar-color: var(--border-soft) transparent;
	}
	/* The list is the scroll container, so the last row needs its own gutter
	   rather than relying on the wrapper's padding. */
	.activity-list li:last-child .item { padding-bottom: 4px; }
	.activity-list li + li { border-top: 1px solid var(--border-faint); }
	.item {
		display: block;
		padding: 14px 0;
		text-decoration: none;
		transition: background 0.2s;
	}
	.item:hover .item-title { color: var(--text-bright); }
	.item-top {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 10px;
		margin-bottom: 6px;
	}
	.item-kind {
		font-family: var(--font-mono);
		font-size: 8px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--text-muted);
		border: 1px solid var(--border-soft);
		padding: 1px 6px;
	}
	.item-date {
		font-family: var(--font-mono);
		font-size: 9px;
		letter-spacing: 0.08em;
		color: var(--text-muted);
		white-space: nowrap;
	}
	.item-title {
		font-size: 0.82rem;
		color: var(--text-soft);
		line-height: 1.4;
		margin-bottom: 7px;
		transition: color 0.2s;
		display: -webkit-box;
		line-clamp: 2;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.item-meta {
		display: flex;
		align-items: center;
		gap: 12px;
		font-family: var(--font-mono);
		font-size: 9px;
		letter-spacing: 0.06em;
	}
	.item-repo { color: var(--text-muted); }
	.add { color: var(--text-soft); }
	.del, .comments { color: var(--text-muted); }

	.last-activity {
		font-family: var(--font-mono);
		font-size: 9px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--text-muted);
		white-space: nowrap;
		text-decoration: none;
		transition: color 0.2s;
	}
	.last-activity:hover { color: var(--text-soft); }
	/* A small pip ties the caption to the calendar without adding an icon. */
	.last-activity::before {
		content: '';
		display: inline-block;
		width: 5px;
		height: 5px;
		border-radius: 1px;
		background: var(--gh-3);
		margin-right: 7px;
		vertical-align: 1px;
	}
	/* The event kind is the point of the line, so it gets the brighter shade. */
	.act-kind { color: var(--text-soft); }
	.act-repo { color: var(--text-muted); }
	.act-date { margin-left: 4px; }

	@media (max-width: 900px) {
		.figures { grid-template-columns: 1fr 1fr; }
		.figure-lead { grid-column: 1 / -1; }
	}
	@media (max-width: 1100px) {
		.split { grid-template-columns: 1fr; }
	}
	@media (max-width: 768px) {
		.section-container { padding: 72px 20px; }
		.calendar-wrap, .activity { padding: 20px 16px 18px; }
		.courses { padding: 20px 16px; }
		.course { grid-template-columns: 72px 1fr 48px; gap: 10px; }
	}
	@media (max-width: 480px) {
		.section-container { padding: 56px 16px; }
		.figures { grid-template-columns: 1fr 1fr; }
		.figure { padding: 20px 16px; }
		.figure-lead .figure-value { font-size: 2.4rem; }
	}
</style>
