<script lang="ts">
	import { lang, setLang } from '$lib/stores/lang';
</script>

<div class="lang-toggle">
	<button
		class="lang-btn"
		class:active={$lang === 'id'}
		onclick={() => setLang('id')}
	>ID</button>
	<span class="lang-div">/</span>
	<button
		class="lang-btn"
		class:active={$lang === 'en'}
		onclick={() => setLang('en')}
	>EN</button>
</div>

<style>
	.lang-toggle {
		display: flex;
		align-items: center;
		gap: 6px;
	}
	.lang-btn {
		background: none;
		border: none;
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--text-muted);
		cursor: none;
		transition: color 0.2s;
		padding: 0;
	}
	.lang-btn.active { color: var(--text-bright); }
	.lang-div {
		color: var(--border-hard);
		font-family: var(--font-mono);
		font-size: 10px;
	}
	@media (pointer: coarse) {
		.lang-btn { cursor: pointer; }
	}
</style>
