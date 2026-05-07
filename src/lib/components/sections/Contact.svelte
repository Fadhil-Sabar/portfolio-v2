<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { t } from '$lib/stores/t';
</script>

<section id="contact">
	<div class="section-container">
		<div class="contact-grid">
			<div>
				<div class="section-label" use:reveal>// 04 — Contact</div>
				<h2 class="contact-heading" use:reveal>{$t('contact.title')}</h2>
				<p class="contact-sub" use:reveal>{$t('contact.sub')}</p>
			</div>
			<div class="contact-links" use:reveal={100}>
				<a href="mailto:sabarfadhil@gmail.com" class="contact-link">
					<div>
						<div class="cl-label">Email</div>
						<div class="cl-value">sabarfadhil@gmail.com</div>
					</div>
					<span class="cl-arrow">→</span>
				</a>
				<a href="https://github.com/Fadhil-Sabar" target="_blank" rel="noopener" class="contact-link">
					<div>
						<div class="cl-label">GitHub</div>
						<div class="cl-value">github.com/Fadhil-Sabar</div>
					</div>
					<span class="cl-arrow">→</span>
				</a>
				<a href="https://linkedin.com/in/fadhil-andriawan-71b875212/" target="_blank" rel="noopener" class="contact-link">
					<div>
						<div class="cl-label">LinkedIn</div>
						<div class="cl-value">fadhil-andriawan</div>
					</div>
					<span class="cl-arrow">→</span>
				</a>
				<a href="https://fadhil-andriawan.dev" target="_blank" rel="noopener" class="contact-link">
					<div>
						<div class="cl-label">Portfolio Live</div>
						<div class="cl-value">fadhil-andriawan.dev</div>
					</div>
					<span class="cl-arrow">→</span>
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	section { background: var(--bg-elevated); }
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
	.contact-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 64px;
		align-items: start;
	}
	.contact-heading {
		font-family: var(--font-display);
		font-size: clamp(1.8rem, 3vw, 2.8rem);
		font-weight: 700;
		letter-spacing: -0.03em;
		color: var(--text-bright);
		line-height: 1.1;
		margin-bottom: 16px;
	}
	.contact-sub {
		font-size: 0.9rem;
		color: var(--text-muted);
		max-width: 44ch;
		line-height: 1.75;
	}
	.contact-links { display: flex; flex-direction: column; gap: 2px; }
	.contact-link {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 18px 22px;
		border: 1px solid var(--border-soft);
		background: var(--bg-base);
		text-decoration: none;
		transition: background 0.2s, border-color 0.2s;
		clip-path: polygon(0 0,100% 0,100% calc(100% - 9px),calc(100% - 9px) 100%,0 100%);
	}
	.contact-link:hover { background: var(--bg-overlay); border-color: var(--border-hard); }
	.cl-label {
		font-family: var(--font-mono);
		font-size: 9px;
		letter-spacing: 0.14em;
		color: var(--text-muted);
		text-transform: uppercase;
		margin-bottom: 3px;
	}
	.cl-value {
		font-family: var(--font-display);
		font-size: 0.9rem;
		color: var(--text-base);
	}
	.cl-arrow {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--text-muted);
		transition: color 0.2s, transform 0.2s;
		flex-shrink: 0;
	}
	.contact-link:hover .cl-arrow { color: var(--text-base); transform: translateX(4px); }

	@media (max-width: 768px) {
		.contact-grid { grid-template-columns: 1fr; gap: 40px; }
		.section-container { padding: 72px 20px; }
	}
	@media (max-width: 480px) { .section-container { padding: 56px 16px; } }
</style>
