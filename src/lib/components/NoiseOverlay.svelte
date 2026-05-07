<div id="noise-overlay" aria-hidden="true"></div>
<div id="scanlines" aria-hidden="true"></div>

<style>
	#noise-overlay {
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: 9998;
		opacity: 0.04;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
	}
	#scanlines {
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: 9997;
		background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.006) 3px, rgba(255,255,255,0.006) 4px);
	}
</style>
