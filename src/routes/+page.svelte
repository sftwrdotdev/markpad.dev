<script lang="ts">
	import 'github-markdown-css/github-markdown.css';
	import { FileText, Sigma, Terminal, AppWindow, Keyboard, Columns, Files, Network, Cpu } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { marked } from 'marked';

	import Navbar from '$lib/components/Navbar.svelte';
	import FeatureCard from '$lib/components/FeatureCard.svelte';
	import VersionItem from '$lib/components/VersionItem.svelte';
	import DownloadDropdown from '$lib/components/DownloadDropdown.svelte';
	import Carousel from '$lib/components/Carousel.svelte';
	import ImageComparison from '$lib/components/ImageComparison.svelte';

	interface ReleaseAsset {
		name: string;
		browser_download_url: string;
	}

	interface GHRelease {
		tag_name: string;
		published_at: string;
		body: string;
		assets: ReleaseAsset[];
	}

	interface ChangelogItem {
		version: string;
		date: string;
		bodyHTML: string;
	}

	interface LatestRelease {
		version: string;
		assets: {
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
		};
	}

	let changelog = $state<ChangelogItem[]>([]);
	let latestRelease = $state<LatestRelease | null>(null);

	onMount(async () => {
		try {
			const res = await fetch('https://api.github.com/repos/alecdotdev/Markpad/releases');

			if (!res.ok) {
				console.error(`GitHub API Error: ${res.statusText}`);
				return;
			}

			const releases: GHRelease[] = await res.json();
			const latest = releases[0];

			// Parse changelog from releases
			changelog = await Promise.all(
				releases.map(async (release) => {
					return {
						version: release.tag_name,
						date: new Date(release.published_at).toLocaleDateString(),
						bodyHTML: await marked.parse(release.body),
					};
				}),
			);

			// Parse assets for the latest release
			const assets = {
				windows: {
					installer: {
						x64: '',
						arm64: '',
					},
					portable: {
						x64: '',
						arm64: '',
					},
				},
				linux: {
					appimage: '',
					deb: '',
					rpm: '',
				},
				mac: {
					universal: '',
				},
			};

			if (latest) {
				for (const asset of latest.assets) {
					const name = asset.name.toLowerCase();
					const url = asset.browser_download_url;

					if (name.endsWith('.exe')) {
						if (name.includes('installer')) {
							if (name.includes('arm64')) assets.windows.installer.arm64 = url;
							else if (name.includes('x64')) assets.windows.installer.x64 = url;
						} else {
							// Portable
							if (name.includes('arm64')) assets.windows.portable.arm64 = url;
							else if (name.includes('x64')) assets.windows.portable.x64 = url;
						}
					} else if (name.endsWith('.appimage')) {
						assets.linux.appimage = url;
					} else if (name.endsWith('.deb')) {
						assets.linux.deb = url;
					} else if (name.endsWith('.rpm')) {
						assets.linux.rpm = url;
					} else if (name.endsWith('.dmg')) {
						assets.mac.universal = url;
					}
				}

				latestRelease = {
					version: latest?.tag_name || 'unknown',
					assets,
				};
			}
		} catch (e) {
			console.error('Failed to fetch releases:', e);
		}
	});

	const features = [
		{
			title: 'GitHub Flavored Markdown',
			description: 'A robust markdown previewer with standard GitHub styled markdown.',
			icon: FileText,
		},
		{
			title: 'LaTeX Support',
			description: 'Beautifully rendered mathematical formulas and equations.',
			icon: Sigma,
		},
		{
			title: 'Familiar Interface',
			description: 'Full-featured embedded text editing powered by the same engine as VS Code.',
			icon: Terminal,
		},
		{
			title: 'Vim Mode',
			description: 'Vim keybindings for power users.',
			icon: Keyboard,
		},
		{
			title: 'Split View',
			description: 'Real-time split view editing and preview.',
			icon: Columns,
		},
		{
			title: 'Tabs',
			description: 'A tabbed notepad alternative experience for multitasking.',
			icon: Files,
		},
		{
			title: 'Mermaid Diagrams',
			description: 'Native support for Mermaid diagrams and charts.',
			icon: Network,
		},
		{
			title: 'RAM Efficient',
			description: 'Optimized for minimal resource consumption. (Under 10MB!)',
			icon: Cpu,
		},
	];
</script>

<svelte:head>
	<title>Markpad - Simple Markdown Editor & Notepad Alternative</title>
	<meta name="description" content="A simple, lightweight markdown viewer, editor, and tabbed notepad alternative for Windows, macOS, and Linux. The perfect simple text editor." />
</svelte:head>

<div class="min-h-screen bg-vscode-bg font-sans text-vscode-text selection:bg-vscode-accent selection:text-white">
	<Navbar />

	<main class="mx-auto max-w-5xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
		<!-- Hero Section -->
		<section class="flex flex-col items-center text-center">
			<img src="/icon.png" alt="Markpad Logo" class="mb-8 w-32 h-32" style="filter:invert(0.9)" />
			<h1 class="mb-4 text-5xl font-extrabold tracking-tight text-white sm:text-7xl">Markpad</h1>
			<p class="mb-16 max-w-2xl text-xl text-gray-400 sm:text-2xl">The Notepad equivalent for Markdown.</p>

			<div class="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
				<DownloadDropdown release={latestRelease} />
				<a
					href="https://github.com/alecdotdev/Markpad"
					target="_blank"
					rel="noreferrer"
					class="inline-flex items-center justify-center rounded-md border border-[#333] px-6 py-3 font-semibold text-vscode-text transition-all hover:border-vscode-text hover:bg-[#252526] hover:text-white">
					View on GitHub
				</a>
			</div>
			<p class="mt-4 text-sm text-gray-500">Linux and macOS currently in public beta.</p>

			<div class="relative mt-16 flex w-full max-w-6xl justify-center px-4">
				<!-- Left Image (Home) -->
				<div in:fly={{ x: 100, duration: 1500, delay: 100 }} class="absolute -left-4 top-12 z-0 hidden w-2/3 transition-all duration-1000 sm:block md:-left-64 md:w-7/12">
					<div class="absolute inset-0 z-20 rounded-xl pointer-events-none bg-gradient-to-b from-transparent via-transparent to-[#1E1E1E]"></div>
					<img src="/mac.png" alt="Home view" class="w-full h-auto rounded-xl shadow-2xl border border-white/10" />
				</div>

				<!-- Right Image (Editor) -->
				<div in:fly={{ x: -100, duration: 1500, delay: 100 }} class="absolute -right-4 top-12 z-0 hidden w-2/3 transition-all duration-1000 sm:block md:-right-64 md:w-7/12">
					<div class="absolute inset-0 z-20 rounded-xl pointer-events-none bg-gradient-to-b from-transparent via-transparent to-[#1E1E1E]"></div>
					<img src="/editor.png" alt="Editor view" class="w-full h-auto rounded-xl shadow-2xl border border-white/10" />
				</div>

				<!-- Center Image (Viewer) -->
				<div in:fly={{ y: 50, duration: 1000 }} class="relative z-10 w-full max-w-4xl shadow-2xl md:w-3/4">
					<div class="absolute inset-0 z-20 rounded-xl pointer-events-none bg-gradient-to-b from-transparent via-transparent to-[#1E1E1E]"></div>
					<ImageComparison leftImage="/splitleft.png" rightImage="/splitright.png" alt="Markpad Editor Interface" />
				</div>
			</div>
		</section>

		<!-- Features -->
		<section class="mt-24">
			<h2 class="mb-12 text-center text-3xl font-bold text-white">Lightweight + Powerful</h2>
			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{#each features as feature}
					<FeatureCard {...feature} />
				{/each}
			</div>

			<!-- Demo Section -->
			<section class="mt-24 flex flex-col items-center">
				<h2 class="mb-12 text-3xl font-bold text-white">See it in Action</h2>
				<div class="relative overflow-hidden rounded-xl border border-white/10 shadow-2xl">
					<div class="absolute inset-0 z-10 bg-linear-to-t from-[#1e1e1e] via-transparent to-transparent opacity-20"></div>
					<img src="/demo.gif" alt="Markpad Demo" class="w-full max-w-5xl" />
				</div>
				<button
					onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
					class="mt-12 inline-flex items-center justify-center rounded-md bg-vscode-accent px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-101 hover:bg-vscode-accent/90 active:scale-95">
					Try Markpad Now
				</button>
			</section>
			<!-- Tech Stack -->
			<section class="mt-24">
				<h2 class="mb-0 text-center text-3xl font-bold text-white">Built with</h2>
				<div class="mt-0 flex flex-wrap justify-center gap-4 border-0 border-[#252526] py-10 opacity-80 transition-all">
					<div class="flex items-center gap-2 rounded-full border border-[#333] bg-[#252526] px-4 py-1.5 text-sm font-medium text-gray-300">
						<img src="https://icons.veryicon.com/png/o/business/vscode-program-item-icon/rust-1.png" alt="Tauri" class="h-5 w-5" />
						Rust
					</div>
					<div class="flex items-center gap-2 rounded-full border border-[#333] bg-[#252526] px-4 py-1.5 text-sm font-medium text-gray-300">
						<img src="https://user-images.githubusercontent.com/37125/191574240-d2196844-81b3-4173-8397-5a43077d38d0.png" alt="Tauri" class="h-5 w-5" />
						Tauri
					</div>
					<div class="flex items-center gap-2 rounded-full border border-[#333] bg-[#252526] px-4 py-1.5 text-sm font-medium text-gray-300">
						<img src="https://svelte.dev/svelte-logo.svg" alt="SvelteKit" class="h-5 w-5" /> SvelteKit
					</div>
					<div class="flex items-center gap-2 rounded-full border border-[#333] bg-[#252526] px-4 py-1.5 text-sm font-medium text-gray-300">
						<span class="font-bold text-[#3178C6]">TS</span> TypeScript
					</div>
				</div>
			</section>
		</section>

		<!-- Changelog -->
		<section class="mt-24 max-w-2xl mx-auto">
			<h2 class="mb-12 text-center text-3xl font-bold text-white">Latest Updates</h2>
			<div class="ml-4 space-y-0">
				{#each changelog as release}
					<VersionItem {...release} />
				{/each}
			</div>
		</section>
	</main>

	<footer class="mt-20 border-t border-[#252526] bg-[#252526] py-12 text-center text-gray-500">
		<p><a href="https://github.com/alecdotdev">&copy; alecdotdev</a></p>
	</footer>
</div>
