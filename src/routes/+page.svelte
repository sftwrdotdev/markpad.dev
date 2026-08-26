<script lang="ts">
	import "github-markdown-css/github-markdown-dark.css";
	import {
		FileText,
		Sigma,
		BookOpen,
		Palette,
		Keyboard,
		Columns,
		Link2,
		Image,
		AppWindow,
		RefreshCw,
		FileOutput,
		Globe,
		Monitor,
		Cpu,
		ShieldCheck,
		Languages,
	} from "lucide-svelte";
	import { fly } from "svelte/transition";
	import { onMount } from "svelte";
	import { marked } from "marked";

	import Navbar from "$lib/components/Navbar.svelte";
	import FeatureCard from "$lib/components/FeatureCard.svelte";
	import VersionItem from "$lib/components/VersionItem.svelte";
	import {
		parseAssets,
		type ReleaseAsset,
		type ReleaseAssets,
	} from "$lib/releases";
	import DownloadDropdown from "$lib/components/DownloadDropdown.svelte";
	import Carousel from "$lib/components/Carousel.svelte";
	import ImageComparison from "$lib/components/ImageComparison.svelte";

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
		assets: ReleaseAssets;
	}

	let changelog = $state<ChangelogItem[]>([]);
	let latestRelease = $state<LatestRelease | null>(null);

	onMount(async () => {
		try {
			const res = await fetch(
				"https://api.github.com/repos/sftwrdotdev/Markpad/releases",
			);

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
						date: new Date(
							release.published_at,
						).toLocaleDateString(),
						bodyHTML: await marked.parse(release.body),
					};
				}),
			);

			if (latest) {
				latestRelease = {
					version: latest.tag_name || "unknown",
					assets: parseAssets(latest.assets),
				};
			}
		} catch (e) {
			console.error("Failed to fetch releases:", e);
		}
	});

	const featureCategories = [
		{
			category: "Reading",
			features: [
				{
					title: "GitHub Rendering",
					description:
						"Standard GFM markdown preview with syntax highlighting in code blocks.",
					icon: FileText,
				},
				{
					title: "Maths & Diagrams",
					description:
						"KaTeX for mathematical formulas and native Mermaid diagrams.",
					icon: Sigma,
				},
				{
					title: "Table of Contents",
					description:
						"Floating outline navigation that follows wherever you scroll.",
					icon: BookOpen,
				},
				{
					title: "Themes & Focus",
					description:
						"Heading folding, Zen mode, and seamless VS Code theme imports.",
					icon: Palette,
				},
			],
		},
		{
			category: "Editing",
			features: [
				{
					title: "Monaco + Vim Mode",
					description:
						"Embedded VS Code editor engine with built-in Vim keybindings.",
					icon: Keyboard,
				},
				{
					title: "Synchronized Split",
					description:
						"Real-time side-by-side editing and preview kept in sync line for line.",
					icon: Columns,
				},
				{
					title: "Smart Completions",
					description:
						"Heading completion for links and a customizable formatting toolbar.",
					icon: Link2,
				},
				{
					title: "Paste & Drop",
					description:
						"Paste images straight into documents or drag files in to open.",
					icon: Image,
				},
			],
		},
		{
			category: "Documents",
			features: [
				{
					title: "Tabs & Sessions",
					description:
						"Multi-window tabs, window tags, and seamless session restoration.",
					icon: AppWindow,
				},
				{
					title: "Disk Auto-Reload",
					description:
						"Automatically updates whenever a file changes on disk.",
					icon: RefreshCw,
				},
				{
					title: "Export & Print",
					description:
						"Clean one-click HTML export and crisp print-to-PDF formatting.",
					icon: FileOutput,
				},
				{
					title: "Extended Syntax",
					description:
						"Wikilinks, embeds, and GitHub-style callouts alongside Markdown.",
					icon: Globe,
				},
			],
		},
		{
			category: "More",
			features: [
				{
					title: "Cross-Platform",
					description:
						"First-class native desktop experience on Windows, macOS, and Linux.",
					icon: Monitor,
				},
				{
					title: "~10MB Memory",
					description:
						"Ultra-efficient resource usage and near-instant startup times.",
					icon: Cpu,
				},
				{
					title: "Private & Open",
					description:
						"Zero telemetry, no bloatware, and 100% free and open source.",
					icon: ShieldCheck,
				},
				{
					title: "26 Languages",
					description:
						"Fully localized user interface available in 26 languages.",
					icon: Languages,
				},
			],
		},
	];
</script>

<svelte:head>
	<title>Markpad - Simple Markdown Editor & Notepad Alternative</title>
	<meta
		name="description"
		content="A simple, lightweight markdown viewer, editor, and tabbed notepad alternative for Windows, macOS, and Linux. The perfect simple text editor."
	/>
</svelte:head>

<div
	class="min-h-screen overflow-x-hidden bg-vscode-bg font-sans text-vscode-text selection:bg-vscode-accent selection:text-white"
>
	<Navbar />

	<main class="mx-auto max-w-5xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
		<!-- Hero Section -->
		<section class="flex flex-col items-center text-center">
			<img
				src="/icon.png"
				alt="Markpad Logo"
				class="mb-8 w-32 h-32"
				style="filter:invert(0.9)"
			/>
			<h1
				class="mb-4 text-5xl font-extrabold tracking-tight text-white sm:text-7xl"
			>
				Markpad
			</h1>
			<p class="mb-16 max-w-2xl text-xl text-gray-400 sm:text-2xl">
				The Notepad equivalent for Markdown.
			</p>

			<div class="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
				<DownloadDropdown release={latestRelease} />
				<a
					href="https://github.com/sftwrdotdev/Markpad"
					target="_blank"
					rel="noreferrer"
					class="inline-flex items-center justify-center rounded-md border border-[#333] px-6 py-3 font-semibold text-vscode-text transition-all hover:border-vscode-text hover:bg-[#252526] hover:text-white"
				>
					View on GitHub
				</a>
			</div>

			<div
				class="relative mt-16 flex w-full max-w-6xl justify-center px-4"
			>
				<!-- Left Image (Home) -->
				<div
					in:fly={{ x: 100, duration: 1500, delay: 100 }}
					class="absolute -left-4 top-12 z-0 hidden w-2/3 transition-all duration-1000 sm:block md:-left-64 md:w-7/12"
				>
					<div
						class="absolute inset-0 z-20 rounded-xl pointer-events-none bg-gradient-to-b from-transparent via-transparent to-[#1E1E1E]"
					></div>
					<img
						src="/mac.png"
						alt="Home view"
						class="w-full h-auto rounded-xl shadow-2xl border border-white/10"
					/>
				</div>

				<!-- Right Image (Editor) -->
				<div
					in:fly={{ x: -100, duration: 1500, delay: 100 }}
					class="absolute -right-4 top-12 z-0 hidden w-2/3 transition-all duration-1000 sm:block md:-right-64 md:w-7/12"
				>
					<div
						class="absolute inset-0 z-20 rounded-xl pointer-events-none bg-gradient-to-b from-transparent via-transparent to-[#1E1E1E]"
					></div>
					<img
						src="/editor.png"
						alt="Editor view"
						class="w-full h-auto rounded-xl shadow-2xl border border-white/10"
					/>
				</div>

				<!-- Center Image (Viewer) -->
				<div
					in:fly={{ y: 50, duration: 1000 }}
					class="relative z-10 w-full max-w-4xl shadow-2xl md:w-3/4"
				>
					<div
						class="absolute inset-0 z-20 rounded-xl pointer-events-none bg-gradient-to-b from-transparent via-transparent to-[#1E1E1E]"
					></div>
					<ImageComparison
						leftImage="/splitleft.png"
						rightImage="/splitright.png"
						alt="Markpad Editor Interface"
					/>
				</div>
			</div>
		</section>

		<!-- Features Section -->
		<section class="mt-24">
			<h2 class="mb-16 text-center text-3xl font-bold text-white">
				Lightweight + Powerful
			</h2>
			<div class="space-y-12">
				{#each featureCategories as group}
					<div>
						<div class="mb-4 flex items-center gap-3">
							<span
								class="text-xs font-bold tracking-widest text-vscode-accent uppercase"
							>
								{group.category}
							</span>
							<div class="h-px flex-1 bg-[#333]"></div>
						</div>
						<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
							{#each group.features as feature}
								<FeatureCard {...feature} />
							{/each}
						</div>
					</div>
				{/each}
			</div>

			<!-- Demo Section -->
			<section class="mt-24 flex flex-col items-center">
				<h2 class="mb-12 text-3xl font-bold text-white">
					See it in Action
				</h2>
				<div
					class="relative overflow-hidden rounded-xl border border-white/10 shadow-2xl"
				>
					<div
						class="absolute inset-0 z-10 bg-linear-to-t from-[#1e1e1e] via-transparent to-transparent opacity-20"
					></div>
					<img
						src="/demo.gif"
						alt="Markpad Demo"
						class="w-full max-w-5xl"
					/>
				</div>
				<button
					onclick={() =>
						window.scrollTo({ top: 0, behavior: "smooth" })}
					class="mt-12 inline-flex items-center justify-center rounded-md bg-vscode-accent px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-101 hover:bg-vscode-accent/90 active:scale-95"
				>
					Try Markpad Now
				</button>
			</section>
			<!-- Tech Stack -->
			<section class="mt-24">
				<h2 class="mb-0 text-center text-3xl font-bold text-white">
					Built with
				</h2>
				<div
					class="mt-0 flex flex-wrap justify-center gap-4 border-0 border-[#252526] py-10 opacity-80 transition-all"
				>
					<div
						class="flex items-center gap-2 rounded-full border border-[#333] bg-[#252526] px-4 py-1.5 text-sm font-medium text-gray-300"
					>
						<img
							src="https://icons.veryicon.com/png/o/business/vscode-program-item-icon/rust-1.png"
							alt="Tauri"
							class="h-5 w-5"
						/>
						Rust
					</div>
					<div
						class="flex items-center gap-2 rounded-full border border-[#333] bg-[#252526] px-4 py-1.5 text-sm font-medium text-gray-300"
					>
						<img
							src="https://user-images.githubusercontent.com/37125/191574240-d2196844-81b3-4173-8397-5a43077d38d0.png"
							alt="Tauri"
							class="h-5 w-5"
						/>
						Tauri
					</div>
					<div
						class="flex items-center gap-2 rounded-full border border-[#333] bg-[#252526] px-4 py-1.5 text-sm font-medium text-gray-300"
					>
						<img
							src="https://svelte.dev/svelte-logo.svg"
							alt="SvelteKit"
							class="h-5 w-5"
						/> SvelteKit
					</div>
					<div
						class="flex items-center gap-2 rounded-full border border-[#333] bg-[#252526] px-4 py-1.5 text-sm font-medium text-gray-300"
					>
						<span class="font-bold text-[#3178C6]">TS</span> TypeScript
					</div>
				</div>
			</section>
		</section>

		<!-- Changelog -->
		<section class="mt-24 max-w-2xl mx-auto">
			<h2 class="mb-12 text-center text-3xl font-bold text-white">
				Latest Updates
			</h2>
			<div class="ml-4 space-y-0">
				{#each changelog as release}
					<VersionItem {...release} />
				{/each}
			</div>
		</section>
	</main>

	<footer
		class="mt-20 border-t border-[#252526] bg-[#252526] py-12 text-center text-gray-500"
	>
		<p><a href="https://github.com/alecdotdev">&copy; alecdotdev</a></p>
	</footer>
</div>
