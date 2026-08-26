<script lang="ts">
	import type { ComponentType } from 'svelte';
	import type { Icon } from 'lucide-svelte';

	export let title: string;
	export let description: string;
	export let icon: ComponentType<Icon>;
</script>

<div class="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-[#333] bg-[#252526] p-5 transition-all duration-200 hover:border-vscode-accent/60 hover:bg-[#282829] hover:shadow-lg hover:shadow-vscode-accent/5">
	<div>
		<div class="mb-3.5 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-vscode-bg text-vscode-accent transition-colors group-hover:bg-vscode-accent group-hover:text-white">
			<svelte:component this={icon} size={18} />
		</div>
		<h4 class="mb-1.5 text-base font-semibold text-gray-100 group-hover:text-white transition-colors">{title}</h4>
		<p class="text-xs sm:text-sm leading-relaxed text-gray-400 group-hover:text-gray-300 transition-colors">{description}</p>
	</div>
</div>
