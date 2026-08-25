export interface ReleaseAsset {
	name: string;
	browser_download_url: string;
}

export interface ReleaseAssets {
	windows: {
		installer: { x64: string; arm64: string };
		portable: { x64: string; arm64: string };
	};
	linux: {
		appimage: string;
		deb: string;
		rpm: string;
	};
	mac: {
		universal: string;
	};
}

/**
 * Map a release's asset list onto the download slots the page offers.
 * Tauri names the NSIS installer `*_x64-setup.exe` and the portable build `*_x64.exe`;
 * anything unrecognised is left out rather than guessed at.
 */
export function parseAssets(assets: ReleaseAsset[]): ReleaseAssets {
	const parsed: ReleaseAssets = {
		windows: {
			installer: { x64: '', arm64: '' },
			portable: { x64: '', arm64: '' },
		},
		linux: { appimage: '', deb: '', rpm: '' },
		mac: { universal: '' },
	};

	for (const asset of assets) {
		const name = asset.name.toLowerCase();
		const url = asset.browser_download_url;

		if (name.endsWith('.exe')) {
			const arch = name.includes('arm64') ? 'arm64' : name.includes('x64') ? 'x64' : null;
			if (!arch) continue;
			if (name.includes('-setup')) parsed.windows.installer[arch] = url;
			else parsed.windows.portable[arch] = url;
		} else if (name.endsWith('.appimage')) {
			parsed.linux.appimage = url;
		} else if (name.endsWith('.deb')) {
			parsed.linux.deb = url;
		} else if (name.endsWith('.rpm')) {
			parsed.linux.rpm = url;
		} else if (name.endsWith('.dmg')) {
			parsed.mac.universal = url;
		}
	}

	return parsed;
}
