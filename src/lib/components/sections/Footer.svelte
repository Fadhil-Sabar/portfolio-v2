<footer>
	<div class="footer-copy">© 2026 Fadhil Andriawan · Jakarta, Indonesia</div>
	<div class="footer-easter">// SYSTEM NOMINAL</div>
</footer>

<style>
	footer {
		padding: 28px 48px;
		border-top: 1px solid var(--border-faint);
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 12px;
	}
	.footer-copy {
		font-family: var(--font-mono);
		font-size: 9px;
		letter-spacing: 0.1em;
		color: var(--text-muted);
		text-transform: uppercase;
	}
	.footer-easter {
		font-family: var(--font-mono);
		font-size: 9px;
		letter-spacing: 0.08em;
		color: var(--border-hard);
		transition: color 0.3s;
	}
	.footer-easter:hover { color: var(--text-muted); }
	@media (max-width: 480px) { footer { padding: 24px 20px; } }
</style>
