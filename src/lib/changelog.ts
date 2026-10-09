import { marked, type Token } from 'marked';

export interface ReleaseNotes {
	previewHTML: string;
	fullHTML: string;
	truncated: boolean;
}

const DOWNLOAD_HEADING = /^downloads?:?$/i;

function isDownloadHeading(token: Token): boolean {
	if (token.type !== 'heading') return false;
	return DOWNLOAD_HEADING.test(token.text.replace(/[*_`]/g, '').trim());
}

function isFiller(token: Token): boolean {
	return token.type === 'space' || token.type === 'hr';
}

/**
 * Render a release body, plus a preview that stops before its download section.
 * Only top-level headings count, so a "Download" inside a code block or list is ignored.
 * A body with nothing worth showing before the cut is left untruncated.
 */
export function renderReleaseNotes(body: string | null | undefined): ReleaseNotes {
	const tokens = marked.lexer(body ?? '');
	const fullHTML = marked.parser(tokens);

	const cut = tokens.findIndex(isDownloadHeading);
	const head = cut === -1 ? [] : tokens.slice(0, cut);
	while (head.length && isFiller(head[head.length - 1])) head.pop();

	if (!head.length) {
		return { previewHTML: fullHTML, fullHTML, truncated: false };
	}

	return { previewHTML: marked.parser(head), fullHTML, truncated: true };
}
