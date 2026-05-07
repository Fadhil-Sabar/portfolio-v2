<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		const dot = document.getElementById('cursor-dot')!;
		const ring = document.getElementById('cursor-ring')!;
		let rx = 0, ry = 0, mx = 0, my = 0;

		function onMove(e: MouseEvent) {
			mx = e.clientX;
			my = e.clientY;
			dot.style.left = mx + 'px';
			dot.style.top = my + 'px';
		}

		function tick() {
			rx += (mx - rx) * 0.12;
			ry += (my - ry) * 0.12;
			ring.style.left = rx + 'px';
			ring.style.top = ry + 'px';
			requestAnimationFrame(tick);
		}

		function onHover(e: MouseEvent) {
			const target = e.target as Element;
			if (target.closest('a,button,[role="button"]')) {
				document.body.classList.add('cur-hover');
			} else {
				document.body.classList.remove('cur-hover');
			}
		}

		document.addEventListener('mousemove', onMove);
		document.addEventListener('mouseover', onHover);
		tick();

		return () => {
			document.removeEventListener('mousemove', onMove);
			document.removeEventListener('mouseover', onHover);
		};
	});
</script>

<div id="cursor-dot" aria-hidden="true"></div>
<div id="cursor-ring" aria-hidden="true"></div>

<style>
	#cursor-dot {
		position: fixed;
		width: 8px;
		height: 8px;
		background: var(--text-bright);
		border-radius: 50%;
		pointer-events: none;
		z-index: 9999;
		transform: translate(-50%, -50%);
		transition: width 0.2s, height 0.2s, background 0.2s;
	}
	#cursor-ring {
		position: fixed;
		width: 30px;
		height: 30px;
		border: 1px solid var(--border-hard);
		border-radius: 50%;
		pointer-events: none;
		z-index: 9999;
		transform: translate(-50%, -50%);
		transition: width 0.25s cubic-bezier(0.2, 1, 0.2, 1), height 0.25s cubic-bezier(0.2, 1, 0.2, 1);
	}
	:global(body.cur-hover) #cursor-dot { width: 6px; height: 6px; }
	:global(body.cur-hover) #cursor-ring { width: 48px; height: 48px; }

	@media (pointer: coarse) {
		#cursor-dot, #cursor-ring { display: none; }
	}
</style>
