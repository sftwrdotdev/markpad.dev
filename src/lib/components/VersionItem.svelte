<script lang="ts">
	import { tick } from "svelte";

	interface Props {
		version: string;
		date?: string;
		previewHTML: string;
		fullHTML: string;
		truncated: boolean;
	}

	let { version, date = "", previewHTML, fullHTML, truncated }: Props = $props();

	// notes with no download section to cut at are clamped by height instead
	const CLAMP_PX = 320;
	const CLAMP_THRESHOLD_PX = 440;

	const uid = $props.id();
	const notesId = `release-notes-${uid}`;

	let root: HTMLElement;
	let expanded = $state(false);
	let contentHeight = $state(0);

	const clampable = $derived(!truncated && contentHeight > CLAMP_THRESHOLD_PX);
	const collapsible = $derived(truncated || clampable);
	const clamped = $derived(clampable && !expanded);
	const html = $derived(truncated && !expanded ? previewHTML : fullHTML);

	async function toggle() {
		expanded = !expanded;
		if (expanded) return;
		await tick();
		if (root.getBoundingClientRect().top < 0) {
			root.scrollIntoView({ block: "start", behavior: "smooth" });
		}
	}
</script>

<div bind:this={root} class="relative scroll-mt-20 border-l border-[#333] pl-6 pb-8 last:pb-0">
	<div class="absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full bg-vscode-accent ring-4 ring-vscode-bg"></div>
	<div class="mb-4 flex items-center gap-3">
		<span class="text-sm font-bold text-vscode-accent">{version}</span>
		{#if date}
			<span class="text-xs text-gray-500">{date}</span>
		{/if}
	</div>
	<div
		id={notesId}
		class="relative"
		class:overflow-hidden={clamped}
		style:max-height={clamped ? `${CLAMP_PX}px` : null}
	>
		<div bind:offsetHeight={contentHeight} class="markdown-body format-changelog">
			{@html html}
		</div>
		{#if clamped}
			<div class="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-vscode-bg to-transparent"></div>
		{/if}
	</div>
	{#if collapsible}
		<button
			type="button"
			aria-expanded={expanded}
			aria-controls={notesId}
			onclick={toggle}
			class="mt-3 text-sm font-medium text-vscode-accent-text transition-colors hover:text-white"
		>
			{expanded ? "Show less" : "Show more"}
		</button>
	{/if}
</div>

<style>
	:global(.format-changelog.markdown-body) {
		background-color: transparent !important;
		color: #9ca3af !important;
		font-family: inherit !important;
		font-size: 0.875rem !important;
	}
	:global(.format-changelog.markdown-body a) {
		color: #3b82f6 !important;
		text-decoration: none !important;
	}
	:global(.format-changelog.markdown-body a:hover) {
		text-decoration: underline !important;
	}
	:global(.format-changelog.markdown-body ul) {
		list-style-type: disc !important;
		padding-left: 1.5rem !important;
		margin-bottom: 0.5rem !important;
	}
	:global(.format-changelog.markdown-body li) {
		margin-bottom: 0.25rem !important;
	}
	:global(.format-changelog.markdown-body p) {
		margin-bottom: 0.5rem !important;
	}
	:global(.format-changelog.markdown-body > *:last-child) {
		margin-bottom: 0 !important;
	}
	:global(.format-changelog.markdown-body h1),
	:global(.format-changelog.markdown-body h2),
	:global(.format-changelog.markdown-body h3),
	:global(.format-changelog.markdown-body h4) {
		color: #d1d5db !important;
		border-bottom: none !important;
		margin-top: 1rem !important;
		margin-bottom: 0.5rem !important;
		padding-bottom: 0 !important;
	}
	:global(.format-changelog.markdown-body table) {
		background-color: transparent !important;
	}
	:global(.format-changelog.markdown-body table tr) {
		background-color: transparent !important;
		border-color: #333 !important;
	}
	:global(.format-changelog.markdown-body table th),
	:global(.format-changelog.markdown-body table td) {
		background-color: transparent !important;
		border-color: #333 !important;
	}
	:global(.format-changelog.markdown-body img) {
		max-width: 100% !important;
		height: auto !important;
		border-radius: 0.5rem !important;
		border: 1px solid rgba(255, 255, 255, 0.1) !important;
	}
</style>
