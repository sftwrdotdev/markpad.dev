<script lang="ts">
	import { onMount } from 'svelte';

	const commands = {
		mac: { label: 'macOS', manager: 'Homebrew', command: 'brew install --cask markpad' },
		windows: { label: 'Windows', manager: 'Chocolatey', command: 'choco install markpad-app' },
		linux: { label: 'Linux', manager: 'Snap', command: 'sudo snap install markpad' },
	} as const;
	type Os = keyof typeof commands;

	let os = $state<Os>('windows');
	let copied = $state(false);
	let timer: ReturnType<typeof setTimeout> | undefined;

	onMount(() => {
		// Same detection as DownloadDropdown, so the command matches the download button.
		const userAgent = navigator.userAgent.toLowerCase();
		if (userAgent.includes('mac')) os = 'mac';
		else if (userAgent.includes('linux') || userAgent.includes('fedora') || userAgent.includes('ubuntu')) os = 'linux';
		return () => clearTimeout(timer);
	});

	async function copy() {
		try {
			await navigator.clipboard.writeText(commands[os].command);
		} catch {
			return;
		}
		copied = true;
		clearTimeout(timer);
		timer = setTimeout(() => (copied = false), 1500);
	}
</script>

<div class="mt-8 w-full max-w-md text-left">
	<div class="mb-2 flex items-center gap-4 text-sm" role="tablist" aria-label="Install with a package manager">
		{#each Object.entries(commands) as [key, item]}
			<button
				type="button"
				role="tab"
				aria-selected={os === key}
				onclick={() => (os = key as Os)}
				class="transition-colors {os === key ? 'text-white' : 'text-gray-500 hover:text-gray-300'}"
			>
				{item.label}
			</button>
		{/each}
		<span class="ml-auto text-xs text-gray-500">{commands[os].manager}</span>
	</div>
	<div class="flex items-center gap-3 rounded-md border border-[#333] bg-vscode-header px-4 py-3 font-mono text-sm">
		<span class="select-none text-gray-500" aria-hidden="true">$</span>
		<code class="flex-1 overflow-x-auto whitespace-nowrap text-vscode-text">{commands[os].command}</code>
		<button
			type="button"
			onclick={copy}
			aria-label="Copy install command"
			class="shrink-0 text-xs text-gray-500 transition-colors hover:text-white"
		>
			{copied ? 'copied' : 'copy'}
		</button>
	</div>
</div>
