<script lang="ts">
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { fade } from 'svelte/transition';

	interface Props {
		images: { src: string; alt: string; label: string }[];
	}

	let { images }: Props = $props();

	let currentIndex = $state(0);

	function next() {
		currentIndex = (currentIndex + 1) % images.length;
	}

	function prev() {
		currentIndex = (currentIndex - 1 + images.length) % images.length;
	}

	function goTo(index: number) {
		currentIndex = index;
	}
</script>

<div class="group relative w-full overflow-hidden rounded-xl border border-[#333] bg-[#0d1117] shadow-2xl">
	<!-- Main Image Area -->
	<div class="aspect-video w-full relative">
		{#key currentIndex}
			<div in:fade={{ duration: 300 }} class="absolute inset-0 flex items-center justify-center p-4">
				<img src={images[currentIndex].src} alt={images[currentIndex].alt} class="max-h-full max-w-full object-contain shadow-lg" />
			</div>
		{/key}
	</div>

	<!-- Navigation Overlay -->
	<div class="absolute inset-0 flex items-center justify-between opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
		<button
			onclick={prev}
			class="pointer-events-auto ml-4 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 focus:outline-none backdrop-blur-sm transition-all hover:scale-110"
			aria-label="Previous image">
			<ChevronLeft size={24} />
		</button>
		<button
			onclick={next}
			class="pointer-events-auto mr-4 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 focus:outline-none backdrop-blur-sm transition-all hover:scale-110"
			aria-label="Next image">
			<ChevronRight size={24} />
		</button>
	</div>

	<!-- Indicators -->
	<div class="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
		{#each images as _, i}
			<button
				onclick={() => goTo(i)}
				class="h-2 w-2 rounded-full transition-all {i === currentIndex ? 'bg-white w-4' : 'bg-white/40 hover:bg-white/60'}"
				aria-label="Go to slide {i + 1}"></button>
		{/each}
	</div>

	<!-- Label Badge -->
	<div class="absolute top-4 left-4">
		<span class="rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm border border-white/10">
			{images[currentIndex].label}
		</span>
	</div>
</div>
