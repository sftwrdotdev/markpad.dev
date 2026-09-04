<script lang="ts">
	import { Github, Star } from 'lucide-svelte';
	import DonationDropdown from './DonationDropdown.svelte';
	import { onMount } from 'svelte';

	let stars = $state<number | null>(null);

	onMount(async () => {
		try {
			const res = await fetch('https://api.github.com/repos/sftwrdotdev/Markpad');
			if (res.ok) {
				const data = await res.json();
				stars = data.stargazers_count;
			}
		} catch (e) {
			console.error('Failed to fetch GitHub stars:', e);
		}
	});
</script>

<nav class="sticky top-0 z-50 w-full border-b border-vscode-header bg-vscode-bg/80 backdrop-blur-md">
	<div class="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
		<a href="/" class="flex items-center gap-2 transition-opacity hover:opacity-90">
			<img src="/icon.png" alt="Markpad Logo" class="h-6 w-6" style="filter:invert(0.9)" />
			<span class="text-xl font-bold tracking-tight text-white">Markpad</span>
		</a>

		<div class="flex items-center gap-3 sm:gap-4">
			<DonationDropdown />
			<a
				href="https://github.com/sftwrdotdev/Markpad"
				target="_blank"
				rel="noreferrer"
				class="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-vscode-text transition-colors hover:bg-vscode-header hover:text-white">
				<Github size={18} />
				<span class="hidden sm:inline">Star on GitHub</span>
				{#if stars !== null}
					<div class="flex items-center gap-1 pl-2 border-l border-vscode-text/20 ml-1">
						<Star size={14} class="fill-current" />
						<span>{stars.toLocaleString()}</span>
					</div>
				{/if}
			</a>
		</div>
	</div>
</nav>
