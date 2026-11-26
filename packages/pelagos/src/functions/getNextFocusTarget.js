const selector =
	'a[href],area[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),' +
	'textarea:not([disabled]),iframe,summary,[contenteditable]:not([contenteditable="false"]),[tabindex]';

const isTabbable = (candidate) =>
	candidate.tabIndex >= 0 && !candidate.closest('[inert]') && candidate.getClientRects().length !== 0;

/**
 * Returns the first tabbable element after the specified element in document order, or the last one before it if there
 * are none after it, or null if there are none. Elements inside the specified element are skipped.
 * @param {Element} element the reference element.
 * @returns {HTMLElement|null} the element to focus.
 */
export default (element) => {
	let previous = null;
	for (const candidate of element.ownerDocument.querySelectorAll(selector)) {
		if (!element.contains(candidate) && isTabbable(candidate)) {
			if (element.compareDocumentPosition(candidate) & Node.DOCUMENT_POSITION_FOLLOWING) {
				return candidate;
			}
			previous = candidate;
		}
	}
	return previous;
};
