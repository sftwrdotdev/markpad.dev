<script lang="ts">
	import {
		ShieldCheck,
		ArrowLeft,
		CheckCircle2,
		Users,
		Lock,
		ExternalLink,
		FileCode2,
		Server,
	} from "lucide-svelte";
	import Navbar from "$lib/components/Navbar.svelte";
	import Footer from "$lib/components/Footer.svelte";
</script>

<svelte:head>
	<title>Code signing policy - Markpad</title>
	<meta
		name="description"
		content="Code signing policy, security guidelines, and privacy policy for Markpad official releases."
	/>
	<meta property="og:title" content="Code signing policy - Markpad" />
	<meta
		property="og:description"
		content="Code signing policy, security guidelines, and privacy policy for Markpad official releases."
	/>
</svelte:head>

<div
	class="min-h-screen overflow-x-hidden bg-vscode-bg font-sans text-vscode-text selection:bg-vscode-accent selection:text-white flex flex-col"
>
	<Navbar />

	<main class="mx-auto max-w-4xl flex-1 px-4 py-12 sm:px-6 lg:px-8 w-full">
		<div class="mb-8">
			<a
				href="/"
				class="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
			>
				<ArrowLeft size={16} />
				<span>Back to Markpad</span>
			</a>
		</div>

		<header class="mb-10">
			<div class="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400 mb-4">
				<ShieldCheck size={14} />
				<span>Security & Integrity</span>
			</div>
			<h1 class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
				Code signing policy
			</h1>
			<p class="mt-3 text-lg text-gray-400">
				This policy defines the code signing standards, verification processes, project roles, and privacy practices for Markpad official releases.
			</p>
		</header>

		<div class="space-y-8">
			<!-- SignPath Disclosure Callout -->
			<section class="rounded-xl border border-blue-500/30 bg-gradient-to-r from-blue-950/40 to-[#1e1e1e] p-6 shadow-lg">
				<div class="flex items-start gap-4">
					<div class="rounded-lg bg-blue-500/20 p-2.5 text-blue-400 mt-1">
						<ShieldCheck size={24} />
					</div>
					<div class="space-y-2">
						<h2 class="text-xl font-semibold text-white">
							Code Signing Provider
						</h2>
						<p class="text-gray-300 leading-relaxed text-base">
							Free code signing provided by <a
								href="https://about.signpath.io"
								target="_blank"
								rel="noreferrer"
								class="text-blue-400 underline underline-offset-2 hover:text-blue-300 font-medium inline-flex items-center gap-0.5"
							>SignPath.io<ExternalLink size={13} class="inline ml-0.5" /></a>, certificate by <a
								href="https://signpath.org"
								target="_blank"
								rel="noreferrer"
								class="text-blue-400 underline underline-offset-2 hover:text-blue-300 font-medium inline-flex items-center gap-0.5"
							>SignPath Foundation<ExternalLink size={13} class="inline ml-0.5" /></a>.
						</p>
						<p class="text-sm text-gray-400">
							Because the signing certificate is issued to the SignPath Foundation on behalf of the project, official signed Windows binaries will list <strong class="text-gray-200">SignPath Foundation</strong> as the verified publisher.
						</p>
					</div>
				</div>
			</section>

			<!-- Build & Signing Process -->
			<section class="rounded-xl border border-[#333] bg-[#252526]/60 p-6">
				<div class="flex items-center gap-3 mb-4">
					<FileCode2 size={20} class="text-vscode-accent" />
					<h2 class="text-xl font-semibold text-white">Release Verification & Build Pipeline</h2>
				</div>
				<ul class="space-y-3 text-gray-300 text-sm sm:text-base leading-relaxed">
					<li class="flex items-start gap-2.5">
						<CheckCircle2 size={18} class="text-emerald-400 shrink-0 mt-1" />
						<span>
							Official Windows release artifacts (installers and portable packages) are built automatically from the source code in the <a href="https://github.com/sftwrdotdev/Markpad" target="_blank" rel="noreferrer" class="text-blue-400 underline hover:text-blue-300">Markpad repository</a> via automated GitHub Actions release workflows.
						</span>
					</li>
					<li class="flex items-start gap-2.5">
						<CheckCircle2 size={18} class="text-emerald-400 shrink-0 mt-1" />
						<span>
							Every signing request is submitted directly from isolated CI builds and must be manually inspected and approved by an authorized project approver before binaries are signed and published.
						</span>
					</li>
					<li class="flex items-start gap-2.5">
						<CheckCircle2 size={18} class="text-emerald-400 shrink-0 mt-1" />
						<span>
							Signing applies exclusively to binaries compiled and built by Markpad. Any third-party binaries or libraries packaged with the application are distributed as provided by their upstream source projects and are not covered by the Markpad signing operation.
						</span>
					</li>
				</ul>
			</section>

			<!-- Team Roles -->
			<section class="rounded-xl border border-[#333] bg-[#252526]/60 p-6">
				<div class="flex items-center gap-3 mb-4">
					<Users size={20} class="text-vscode-accent" />
					<h2 class="text-xl font-semibold text-white">Team Roles & Permissions</h2>
				</div>
				<p class="text-sm text-gray-400 mb-4">
					Project permissions and responsibilities are mapped to organization permission groups on GitHub:
				</p>
				<div class="grid gap-4 sm:grid-cols-2">
					<div class="rounded-lg border border-[#383838] bg-[#1e1e1e] p-4">
						<span class="text-xs font-bold tracking-wider text-vscode-accent uppercase">
							Review & Contribution
						</span>
						<h3 class="mt-1 text-base font-semibold text-white">Committers & Reviewers</h3>
						<p class="mt-2 text-sm text-gray-400">
							Authorized to maintain issues, submit code, and review pull requests:
						</p>
						<p class="mt-3">
							<a
								href="https://github.com/orgs/sftwrdotdev/people"
								target="_blank"
								rel="noreferrer"
								class="inline-flex items-center gap-1 text-sm font-medium text-blue-400 underline hover:text-blue-300"
							>
								Members team
								<ExternalLink size={12} />
							</a>
						</p>
					</div>

					<div class="rounded-lg border border-[#383838] bg-[#1e1e1e] p-4">
						<span class="text-xs font-bold tracking-wider text-emerald-400 uppercase">
							Release Authorization
						</span>
						<h3 class="mt-1 text-base font-semibold text-white">Approvers</h3>
						<p class="mt-2 text-sm text-gray-400">
							Authorized to merge release branches and approve signing requests in SignPath:
						</p>
						<p class="mt-3">
							<a
								href="https://github.com/orgs/sftwrdotdev/people?query=role%3Aowner"
								target="_blank"
								rel="noreferrer"
								class="inline-flex items-center gap-1 text-sm font-medium text-emerald-400 underline hover:text-emerald-300"
							>
								Owners
								<ExternalLink size={12} />
							</a>
						</p>
					</div>
				</div>
			</section>

			<!-- Privacy Policy -->
			<section class="rounded-xl border border-[#333] bg-[#252526]/60 p-6">
				<div class="flex items-center gap-3 mb-4">
					<Lock size={20} class="text-vscode-accent" />
					<h2 class="text-xl font-semibold text-white">Privacy Policy</h2>
				</div>
				<div class="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
					<blockquote class="border-l-2 border-vscode-accent bg-[#1e1e1e] px-4 py-3 text-gray-200 italic rounded-r">
						“This program will not transfer any information to other networked systems unless specifically requested by the user or the person installing or operating it.”
					</blockquote>

					<div class="space-y-2 pt-2">
						<h3 class="text-base font-semibold text-white">Data Collection & Telemetry</h3>
						<p class="text-sm text-gray-400">
							Markpad is completely free, open source, and privacy-focused. There is zero telemetry, zero background usage tracking, and zero advertising. Your documents and files are stored strictly on your local device.
						</p>
					</div>

					<div class="space-y-2 pt-2">
						<h3 class="text-base font-semibold text-white">Third-Party Services & Network Access</h3>
						<p class="text-sm text-gray-400">
							Network communication only occurs when initiated by explicit user request (for example, navigating to external links, loading remote images referenced within a Markdown document, or checking for application updates). Markpad does not bundle any third-party tracking services or analytics providers.
						</p>
					</div>
				</div>
			</section>
		</div>
	</main>

	<Footer />
</div>
