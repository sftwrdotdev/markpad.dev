<script lang="ts">
	import { onMount } from 'svelte';
	import { ChevronDown } from 'lucide-svelte';
	import { fly } from 'svelte/transition';

	interface ReleaseAssets {
		windows: {
			installer: { x64: string; arm64: string };
			portable: { x64: string; arm64: string };
		};
		linux: {
			appimage: string;
			deb: string;
			rpm: string;
		};
		mac: {
			universal: string;
		};
	}

	interface LatestRelease {
		version: string;
		assets: ReleaseAssets;
	}

	let { release }: { release: LatestRelease | null } = $props();

	let isOpen = $state(false);
	let os = $state('windows');
	let primaryLink = $state('');
	let primaryText = $state('Download');
	let dropdownRef = $state<HTMLElement | null>(null);
	let buttonRef = $state<HTMLElement | null>(null);

	function toggleDropdown() {
		isOpen = !isOpen;
	}

	function closeDropdown() {
		isOpen = false;
	}

	// Handle click outside
	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (isOpen && dropdownRef && !dropdownRef.contains(target) && buttonRef && !buttonRef.contains(target)) {
			closeDropdown();
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);

		const userAgent = navigator.userAgent.toLowerCase();
		if (userAgent.includes('mac')) {
			os = 'mac';
			primaryText = 'Download for macOS';
		} else if (userAgent.includes('linux') || userAgent.includes('fedora') || userAgent.includes('ubuntu')) {
			os = 'linux';
			primaryText = 'Download for Linux';
		} else {
			os = 'windows';
			primaryText = 'Download for Windows'; // Default to Windows
		}

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	// Effect to update primary link when release or os changes
	$effect(() => {
		if (!release) return;

		if (os === 'mac') {
			primaryLink = release.assets.mac.universal;
		} else if (os === 'linux') {
			primaryLink = release.assets.linux.appimage;
		} else {
			primaryLink = release.assets.windows.installer.x64;
		}
	});
</script>

<div class="relative inline-flex rounded-md shadow-sm">
	{#if !release}
		<button disabled class="inline-flex items-center gap-2 rounded-md bg-gray-600 px-6 py-3 font-semibold text-white opacity-50 cursor-not-allowed"> Loading... </button>
	{:else}
		<!-- Primary Button -->
		<a
			href={primaryLink}
			class="inline-flex items-center gap-2 rounded-l-md bg-vscode-accent px-6 py-3 font-semibold text-white transition-all hover:bg-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-vscode-bg">
			{#if os === 'windows'}
				<img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/windows-white-icon.png" alt="Windows" class="h-4 w-4" />
			{:else if os === 'mac'}
				<img src="/apple.svg" alt="macOS" class="h-4 w-4" style="fill: white;" />
			{:else}
				<img src="https://iconape.com/wp-content/png_logo_vector/linux.png" alt="Linux" class="h-4 w-4" style="filter:invert(1);" />
			{/if}
			{primaryText}
		</a>

		<!-- Dropdown Trigger -->
		<button
			bind:this={buttonRef}
			type="button"
			class="inline-flex items-center rounded-r-md bg-vscode-accent px-3 py-3 text-white transition-all hover:bg-blue-600 focus:z-10 focus:outline-none border-l border-blue-600"
			onclick={toggleDropdown}
			aria-expanded={isOpen}
			aria-haspopup="true">
			<span class="sr-only">Open options</span>
			<ChevronDown class="h-5 w-5" />
		</button>
	{/if}

	<!-- Dropdown Menu -->
	{#if isOpen && release}
		<div
			bind:this={dropdownRef}
			transition:fly={{ y: 5, duration: 200 }}
			class="absolute right-0 top-full z-50 mt-2 w-full origin-top-right rounded-md bg-vscode-header shadow-lg focus:outline-none border border-[#333] overflow-hidden">
			<div class="py-1">
				<div class="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-[#1e1e1e]">Windows</div>
				{#if release.assets.windows.installer.x64}
					<a href={release.assets.windows.installer.x64} class="block px-4 py-2 text-sm text-gray-300 hover:bg-[#333] hover:text-white">Installer (x64)</a>
				{/if}
				{#if release.assets.windows.installer.arm64}
					<a href={release.assets.windows.installer.arm64} class="block px-4 py-2 text-sm text-gray-300 hover:bg-[#333] hover:text-white">Installer (ARM64)</a>
				{/if}
				{#if release.assets.windows.portable.x64}
					<a href={release.assets.windows.portable.x64} class="block px-4 py-2 text-sm text-gray-300 hover:bg-[#333] hover:text-white">Portable (x64)</a>
				{/if}
				{#if release.assets.windows.portable.arm64}
					<a href={release.assets.windows.portable.arm64} class="block px-4 py-2 text-sm text-gray-300 hover:bg-[#333] hover:text-white">Portable (ARM64)</a>
				{/if}

				<div class="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-[#1e1e1e] border-t border-[#333]">Linux</div>
				{#if release.assets.linux.appimage}
					<a href={release.assets.linux.appimage} class="block px-4 py-2 text-sm text-gray-300 hover:bg-[#333] hover:text-white">AppImage</a>
				{/if}
				{#if release.assets.linux.deb}
					<a href={release.assets.linux.deb} class="block px-4 py-2 text-sm text-gray-300 hover:bg-[#333] hover:text-white">Debian (.deb)</a>
				{/if}
				{#if release.assets.linux.rpm}
					<a href={release.assets.linux.rpm} class="block px-4 py-2 text-sm text-gray-300 hover:bg-[#333] hover:text-white">Fedora (.rpm)</a>
				{/if}

				<div class="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-[#1e1e1e] border-t border-[#333]">macOS</div>
				{#if release.assets.mac.universal}
					<a href={release.assets.mac.universal} class="block px-4 py-2 text-sm text-gray-300 hover:bg-[#333] hover:text-white">Universal (.dmg)</a>
				{/if}
			</div>
		</div>
	{/if}
</div>
