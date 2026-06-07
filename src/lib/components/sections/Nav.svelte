<script lang="ts">
	import LangToggle from '$lib/components/LangToggle.svelte';
	import { t } from '$lib/stores/t';

	let menuOpen = $state(false);

	function toggleMenu() { menuOpen = !menuOpen; }
	function closeMenu() { menuOpen = false; }
</script>

<nav>
	<a href="/#hero" class="nav-logo">Fadhil.dev</a>
	<ul class="nav-center">
		<li><a href="/#about"      onclick={closeMenu}>{$t('nav.about')}</a></li>
		<li><a href="/#projects"   onclick={closeMenu}>{$t('nav.projects')}</a></li>
		<li><a href="/#skills"     onclick={closeMenu}>{$t('nav.skills')}</a></li>
		<li><a href="/#experience" onclick={closeMenu}>{$t('nav.experience')}</a></li>
		<li><a href="/#contact"    onclick={closeMenu}>{$t('nav.contact')}</a></li>
	</ul>
	<div class="nav-right">
		<a href="/CV_Fadhil_Andriawan.pdf" download="Fadhil_Andriawan_CV.pdf" class="cv-btn">
			{$t('nav.cv')}
		</a>
		<LangToggle />
	</div>
	<button class="nav-burger" aria-label="Menu" onclick={toggleMenu}>
		<span></span><span></span><span></span>
	</button>
</nav>

<div class="mobile-menu" class:open={menuOpen}>
	<a href="/#about"      onclick={closeMenu}>{$t('nav.about')}</a>
	<a href="/#projects"   onclick={closeMenu}>{$t('nav.projects')}</a>
	<a href="/#skills"     onclick={closeMenu}>{$t('nav.skills')}</a>
	<a href="/#experience" onclick={closeMenu}>{$t('nav.experience')}</a>
	<a href="/#contact"    onclick={closeMenu}>{$t('nav.contact')}</a>
	<a href="/CV_Fadhil_Andriawan.pdf" download="Fadhil_Andriawan_CV.pdf">{$t('nav.cv')}</a>
	<LangToggle />
</div>

<style>
	nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 18px 48px;
		border-bottom: 1px solid var(--border-faint);
		background: rgba(10,10,11,0.88);
		backdrop-filter: blur(14px);
		gap: 20px;
	}
	.nav-logo {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.1em;
		color: var(--text-bright);
		text-decoration: none;
		text-transform: uppercase;
		white-space: nowrap;
	}
	.nav-center {
		display: flex;
		gap: 28px;
		list-style: none;
		align-items: center;
	}
	.nav-center a {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--text-muted);
		text-decoration: none;
		transition: color 0.2s;
		position: relative;
	}
	.nav-center a::after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 0;
		width: 0;
		height: 1px;
		background: var(--text-base);
		transition: width 0.2s ease-out;
	}
	.nav-center a:hover { color: var(--text-base); }
	.nav-center a:hover::after { width: 100%; }
	.nav-right {
		display: flex;
		align-items: center;
		gap: 16px;
	}
	.cv-btn {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--text-muted);
		text-decoration: none;
		border: 1px solid var(--border-soft);
		padding: 7px 14px;
		background: transparent;
		clip-path: polygon(0 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%);
		transition: color 0.2s, border-color 0.2s, background 0.2s;
		white-space: nowrap;
	}
	.cv-btn:hover {
		color: var(--text-base);
		border-color: var(--border-hard);
		background: var(--bg-elevated);
	}
	.nav-burger {
		display: none;
		flex-direction: column;
		gap: 5px;
		background: none;
		border: none;
		cursor: none;
		padding: 4px;
	}
	.nav-burger span {
		display: block;
		width: 20px;
		height: 1px;
		background: var(--text-soft);
		transition: all 0.3s;
	}
	.mobile-menu {
		display: none;
		position: fixed;
		top: 57px;
		left: 0;
		right: 0;
		background: rgba(10,10,11,0.97);
		border-bottom: 1px solid var(--border-faint);
		padding: 24px 24px 28px;
		z-index: 99;
		flex-direction: column;
		gap: 20px;
	}
	.mobile-menu.open { display: flex; }
	.mobile-menu a {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--text-soft);
		text-decoration: none;
	}
	.mobile-menu a:hover { color: var(--text-bright); }

	@media (max-width: 768px) {
		nav { padding: 16px 20px; }
		.nav-center, .nav-right { display: none; }
		.nav-burger { display: flex; }
	}
	@media (pointer: coarse) {
		.nav-burger { cursor: pointer; }
	}
</style>
