<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		text: string;
		tag?: 'h1' | 'div' | 'span';
		class?: string;
		id?: string;
		autoGlitch?: boolean;
		autoGlitchDelay?: number;
	}

	let {
		text,
		tag = 'div',
		class: cls = '',
		id = '',
		autoGlitch = false,
		autoGlitchDelay = 0
	}: Props = $props();

	const GC = '!<>-_\\/[]{}—=+*^?#$@%&';
	let el: HTMLElement;
	let _glitching = false;

	export function glitch(dur = 400) {
		if (_glitching) return;
		_glitching = true;
		const frames = Math.floor(dur / 40);
		let f = 0;
		el.classList.add('glitching');
		const iv = setInterval(() => {
			if (f >= frames) {
				el.textContent = text;
				el.classList.remove('glitching');
				clearInterval(iv);
				_glitching = false;
				return;
			}
			const prog = f / frames;
			let r = '';
			for (let i = 0; i < text.length; i++) {
				if (text[i] === ' ') { r += ' '; continue; }
				r += i / text.length < prog ? text[i] : GC[Math.floor(Math.random() * GC.length)];
			}
			el.textContent = r;
			f++;
		}, 40);
	}

	onMount(() => {
		if (autoGlitch) {
			setTimeout(() => glitch(400), autoGlitchDelay);
		}
	});
</script>

<svelte:element
	this={tag}
	bind:this={el}
	{id}
	class="glitch-wrap {cls}"
	data-text={text}
>{text}</svelte:element>
