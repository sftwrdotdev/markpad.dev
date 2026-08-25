<script lang="ts">
	import { ArrowLeftRight } from 'lucide-svelte';

	let { leftImage, rightImage, alt }: { leftImage: string; rightImage: string; alt: string } = $props();

	let sliderPosition = $state(50);
	let isDragging = $state(false);

	function updateSliderPosition(event: MouseEvent | TouchEvent) {
		const target = event.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();
		const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;

		let position = ((clientX - rect.left) / rect.width) * 100;
		position = Math.max(0, Math.min(100, position));

		sliderPosition = position;
	}

	function handleMouseMove(event: MouseEvent) {
		if (event.buttons === 1) {
			updateSliderPosition(event);
		}
	}

	function handleTouchMove(event: TouchEvent) {
		updateSliderPosition(event);
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="image-comparison-container group relative grid w-full overflow-hidden rounded-xl border border-white/20 shadow-2xl cursor-ew-resize select-none"
	role="slider"
	aria-valuenow={sliderPosition}
	aria-valuemin="0"
	aria-valuemax="100"
	aria-label="Compare light and dark modes"
	tabindex="0"
	onmousedown={updateSliderPosition}
	onmousemove={handleMouseMove}
	ontouchmove={handleTouchMove}>
	<!-- Background (Dark) -->
	<img src={rightImage} {alt} class="col-start-1 row-start-1 w-full h-auto pointer-events-none" />

	<!-- Foreground (Light) - Clip Path approach is cleanest -->
	<div class="col-start-1 row-start-1 w-full h-full pointer-events-none" style="clip-path: polygon(0 0, {sliderPosition}% 0, {sliderPosition}% 100%, 0 100%)">
		<img src={leftImage} {alt} class="w-full h-auto" />
	</div>

	<!-- Gradient Overlay on top of everything -->
	<div class="col-start-1 row-start-1 absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-[#1E1E1E]"></div>

	<!-- Slider Handle -->
	<div class="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-30 pointer-events-none shadow-[0_0_15px_rgba(0,0,0,0.5)]" style="left: {sliderPosition}%">
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg text-[#1E1E1E]">
			<ArrowLeftRight size={16} />
		</div>
	</div>
</div>
