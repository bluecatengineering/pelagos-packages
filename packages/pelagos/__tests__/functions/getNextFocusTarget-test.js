import getNextFocusTarget from '../../src/functions/getNextFocusTarget';

jest.unmock('../../src/functions/getNextFocusTarget');

const DOCUMENT_POSITION_PRECEDING = 2;
const DOCUMENT_POSITION_FOLLOWING = 4;

global.Node = {DOCUMENT_POSITION_FOLLOWING};

const createCandidate = (position, {tabIndex = 0, inert = false, rects = 1, inside = false} = {}) => ({
	position,
	inside,
	tabIndex,
	closest: jest.fn(() => (inert ? {} : null)),
	getClientRects: () => ({length: rects}),
});

const createElement = (candidates) => {
	const querySelectorAll = jest.fn(() => candidates);
	return {
		ownerDocument: {querySelectorAll},
		contains: (candidate) => candidate.inside,
		compareDocumentPosition: (candidate) => candidate.position,
	};
};

describe('getNextFocusTarget', () => {
	it('returns the first tabbable element after the element', () => {
		const before = createCandidate(DOCUMENT_POSITION_PRECEDING);
		const after = createCandidate(DOCUMENT_POSITION_FOLLOWING);
		const element = createElement([before, after, createCandidate(DOCUMENT_POSITION_FOLLOWING)]);
		expect(getNextFocusTarget(element)).toBe(after);
		expect(element.ownerDocument.querySelectorAll.mock.calls).toEqual([
			[
				'a[href],area[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),' +
					'textarea:not([disabled]),iframe,summary,[contenteditable]:not([contenteditable="false"]),[tabindex]',
			],
		]);
		expect(after.closest.mock.calls).toEqual([['[inert]']]);
	});

	it('returns the last tabbable element before the element if there are none after it', () => {
		const first = createCandidate(DOCUMENT_POSITION_PRECEDING);
		const last = createCandidate(DOCUMENT_POSITION_PRECEDING);
		const element = createElement([first, last]);
		expect(getNextFocusTarget(element)).toBe(last);
	});

	it('skips elements which are inside the element, not tabbable, inert, or not rendered', () => {
		const before = createCandidate(DOCUMENT_POSITION_PRECEDING);
		const element = createElement([
			before,
			createCandidate(DOCUMENT_POSITION_FOLLOWING, {inside: true}),
			createCandidate(DOCUMENT_POSITION_FOLLOWING, {tabIndex: -1}),
			createCandidate(DOCUMENT_POSITION_FOLLOWING, {inert: true}),
			createCandidate(DOCUMENT_POSITION_FOLLOWING, {rects: 0}),
		]);
		expect(getNextFocusTarget(element)).toBe(before);
	});

	it('returns null if there are no tabbable elements', () => {
		expect(getNextFocusTarget(createElement([]))).toBeNull();
	});
});
