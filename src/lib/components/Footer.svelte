<script lang="ts">
	const links = [
		{ label: "GitHub", href: "https://github.com/sftwrdotdev/Markpad", external: true },
		{ label: "Releases", href: "https://github.com/sftwrdotdev/Markpad/releases", external: true },
		{ label: "Privacy", href: "/privacy/", external: false },
		{ label: "Code signing policy", href: "/privacy/#code-signing-policy", external: false },
	];
</script>

<footer class="mt-20 border-t border-white/5 bg-vscode-footer text-sm text-gray-400">
	<div
		class="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between sm:px-6 lg:px-8"
	>
		<p>
			&copy; <a href="https://github.com/alecdotdev" class="transition-colors hover:text-white">alecdotdev</a>
		</p>
		<nav aria-label="Footer">
			<ul class="flex flex-wrap justify-center gap-x-6 gap-y-2">
				{#each links as link (link.href)}
					<li>
						<a
							href={link.href}
							target={link.external ? "_blank" : undefined}
							rel={link.external ? "noreferrer" : undefined}
							class="transition-colors hover:text-white"
						>
							{link.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
	<div class="border-t border-white/5">
		<p class="mx-auto max-w-5xl px-4 py-5 text-center text-xs text-gray-500 sm:px-6 lg:px-8">
			Free code signing provided by
			<a href="https://about.signpath.io" class="transition-colors hover:text-gray-300">SignPath.io</a>, certificate by
			<a href="https://signpath.org" class="transition-colors hover:text-gray-300">SignPath Foundation</a>
		</p>
	</div>
</footer>
