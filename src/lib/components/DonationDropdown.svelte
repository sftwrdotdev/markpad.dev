<script lang="ts">
	import { Heart, Coffee, Github } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	let isOpen = $state(false);
	let dropdownRef = $state<HTMLElement | null>(null);
	let buttonRef = $state<HTMLElement | null>(null);

	function toggleDropdown() {
		isOpen = !isOpen;
	}

	function closeDropdown() {
		isOpen = false;
	}

	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (isOpen && dropdownRef && !dropdownRef.contains(target) && buttonRef && !buttonRef.contains(target)) {
			closeDropdown();
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<div class="relative">
	<button
		bind:this={buttonRef}
		onclick={toggleDropdown}
		class="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-vscode-text transition-colors hover:bg-vscode-header hover:text-white"
		aria-label="Support Markpad"
		aria-expanded={isOpen}
		aria-haspopup="true">
		<Heart size={18} class="transition-colors {isOpen ? 'fill-red-500 text-red-500' : ''}" />
		<span class="hidden sm:inline">Support</span>
	</button>

	{#if isOpen}
		<div
			bind:this={dropdownRef}
			transition:fly={{ y: 5, duration: 200 }}
			class="absolute right-0 top-full z-50 mt-2 w-48 origin-top-right rounded-md bg-vscode-header border border-[#333] shadow-lg focus:outline-none overflow-hidden">
			<div class="py-1">
				<a
					href="https://github.com/sponsors/alecdotdev"
					target="_blank"
					rel="noreferrer"
					class="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-[#333] hover:text-white">
					<Github size={16} />
					<span>GitHub Sponsors</span>
				</a>
				<a href="https://ko-fi.com/alecdotdev" target="_blank" rel="noreferrer" class="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-[#333] hover:text-white">
					<Coffee size={16} />
					<span>Buy me a coffee</span>
				</a>
			</div>
		</div>
	{/if}
</div>
