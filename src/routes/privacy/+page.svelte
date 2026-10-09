<script lang="ts">
	import Navbar from "$lib/components/Navbar.svelte";
	import Footer from "$lib/components/Footer.svelte";
</script>

<svelte:head>
	<title>Privacy &amp; Code Signing Policy - Markpad</title>
	<meta
		name="description"
		content="Markpad collects no data and has no telemetry. Privacy policy and code signing policy for the Markpad app and markpad.dev."
	/>
</svelte:head>

<div
	class="flex min-h-screen flex-col bg-vscode-bg font-sans text-vscode-text selection:bg-vscode-accent selection:text-white"
>
	<Navbar />

	<main class="prose-page mx-auto w-full max-w-2xl flex-1 px-4 pb-8 pt-16 sm:px-6 lg:px-8">
		<h1 class="mb-3 text-4xl font-extrabold tracking-tight text-white">Privacy</h1>
		<p class="mb-12 text-sm text-gray-500">Last updated October 9, 2026</p>

		<p>
			Markpad does not collect, store or share personal data. There is no telemetry, no analytics and no
			account.
		</p>

		<section aria-labelledby="the-app">
			<h2 id="the-app">The app</h2>
			<p>
				This program will not transfer any information to other networked systems unless specifically requested
				by the user or the person installing or operating it.
			</p>
			<p>Markpad only goes online when you ask it to:</p>
			<ul>
				<li>
					<strong>Check for Updates</strong> contacts GitHub to find and download new releases
					(<a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
						>GitHub Privacy Statement</a
					>).
				</li>
				<li>
					<strong>Import VS Code Theme</strong> downloads the theme from the Visual Studio Marketplace
					(<a href="https://www.microsoft.com/en-us/privacy/privacystatement">Microsoft Privacy Statement</a>).
				</li>
				<li>Images and other remote content in a document load from wherever the document points.</li>
				<li>Links you click open in your default browser.</li>
			</ul>
			<p>
				Installing or updating through Homebrew, Chocolatey or Snap is subject to the privacy policy of that
				package manager.
			</p>
		</section>

		<section aria-labelledby="this-website">
			<h2 id="this-website">This website</h2>
			<p>
				markpad.dev sets no cookies of its own and runs no analytics. It is hosted on Cloudflare, which processes
				standard request data such as your IP address to serve pages
				(<a href="https://www.cloudflare.com/privacypolicy/">Cloudflare Privacy Policy</a>). Your browser fetches
				release information and the star count directly from the GitHub API, and a few icons from third-party
				hosts.
			</p>
		</section>

		<section aria-labelledby="code-signing-policy">
			<h2 id="code-signing-policy">Code signing policy</h2>
			<p>
				Free code signing provided by <a href="https://about.signpath.io">SignPath.io</a>, certificate by
				<a href="https://signpath.org">SignPath Foundation</a>.
			</p>
			<dl>
				<div>
					<dt>Committers and reviewers</dt>
					<dd>
						<a href="https://github.com/alecdotdev">@alecdotdev</a>,
						<a href="https://github.com/PathGao">@PathGao</a>
					</dd>
				</div>
				<div>
					<dt>Approvers</dt>
					<dd><a href="https://github.com/alecdotdev">@alecdotdev</a></dd>
				</div>
			</dl>
			<p>Privacy: see <a href="#the-app">The app</a> above.</p>
		</section>

		<section aria-labelledby="contact">
			<h2 id="contact">Contact</h2>
			<p>
				Questions about this policy can be raised as an
				<a href="https://github.com/sftwrdotdev/Markpad/issues">issue on GitHub</a>.
			</p>
		</section>
	</main>

	<Footer />
</div>

<style>
	.prose-page p,
	.prose-page li,
	.prose-page dd {
		color: #9ca3af;
		line-height: 1.75;
	}
	.prose-page p {
		margin-bottom: 1rem;
	}
	.prose-page h2 {
		scroll-margin-top: 5rem;
		margin: 3rem 0 1rem;
		font-size: 1.25rem;
		font-weight: 700;
		color: #fff;
	}
	.prose-page strong {
		font-weight: 600;
		color: #d1d5db;
	}
	.prose-page a {
		color: var(--color-vscode-accent-text);
		transition: color 150ms;
	}
	.prose-page a:hover {
		color: #fff;
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.prose-page ul {
		margin-bottom: 1rem;
		padding-left: 1.25rem;
		list-style: disc;
	}
	.prose-page li {
		margin-bottom: 0.375rem;
	}
	.prose-page li::marker {
		color: #4b5563;
	}
	.prose-page dl {
		margin-bottom: 1rem;
		border-top: 1px solid #333;
	}
	.prose-page dl > div {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem 1.5rem;
		justify-content: space-between;
		padding: 0.75rem 0;
		border-bottom: 1px solid #333;
	}
	.prose-page dt {
		font-weight: 500;
		color: #d1d5db;
		line-height: 1.75;
	}
</style>
