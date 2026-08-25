<script lang="ts">
	import type { ComponentType } from 'svelte';
	import type { Icon } from 'lucide-svelte';

	export let title: string;
	export let description: string;
	export let icon: ComponentType<Icon>;
</script>

<div class="group relative overflow-hidden rounded-lg border border-[#333] bg-[#252526] p-6 transition-all hover:border-vscode-accent/50 hover:shadow-lg">
	<div
		class="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-vscode-bg text-vscode-accent group-hover:bg-vscode-accent group-hover:text-white transition-colors">
		<svelte:component this={icon} size={20} />
	</div>
	<h3 class="mb-2 text-lg font-semibold text-gray-100">{title}</h3>
	<p class="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{description}</p>
</div>
