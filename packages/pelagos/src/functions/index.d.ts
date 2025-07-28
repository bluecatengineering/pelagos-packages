import type {ListInputSuggestion} from '../listInput/ListInput';

/** Adds a resize observer to the specified target element. */
export function addResizeObserver(target: Element, callback: (contentRect: DOMRectReadOnly) => void): () => void;

/** Invokes the specified function using an easing curve. */
export function animate(duration: number, f: (position: number) => void, done: () => void): {cancel: () => void};

/** Builds a parser for simple suggestions. */
export function buildSimpleSuggestionsParser<T>(
	validate: (entry: T) => string | null,
	transform?: (entry: string) => T
): (text: string, list: T[]) => {entries: T[]} | {error: string};

/** Compares suggestions. */
export function compareSuggestions(a: ListInputSuggestion, b: ListInputSuggestion): number;

/** Copies the specified text to the clipboard. */
export function copyToClipboard(text: string): Promise<void>;

/** Returns suggestions from a list. */
export function getGenericSuggestions(
	text: string,
	selected: ListInputSuggestion[] | ((id: string) => boolean),
	sourceList: ListInputSuggestion[],
	errorMessage: string
): {error: string} | ListInputSuggestion[];

export function moveEffect(element: Element, rect: DOMRectReadOnly): void;

export function moveListItem<T>(list: T[], fromIndex: number, toIndex: number): T[];

/** Starts a move animation on the specified element. */
export function scrollIntoView(
	element: Element,
	options?: {
		alignBottom?: boolean;
		smooth?: boolean;
		duration?: number;
		done?: () => void;
	}
): void;

/** Scrolls to the specified element inside the container. */
export function scrollToItem(
	container: Element,
	element: Element,
	options?: {
		headerHeight: number;
		duration: number;
		done?: () => void;
	}
): void;

/**
 * Sets the locale for Pelagos. The default language is English,
 * there is no need to call this function unless the selected language is different.
 * This function should be called as early as possible,
 * the caller must catch the returned promise and handle any errors.
 */
export function setLocale(locale: 'en' | 'es'): Promise<void>;

/** Starts a slide down animation on the specified element. */
export function slideDownEffect(element: Element): void;

/** Starts a slide up animation on the specified element. */
export function slideUpEffect(element: Element): void;

/** Scrolls the specified element using an animation. */
export function smoothScroll(
	element: Element,
	initialTop: number,
	offset: number,
	duration: number,
	done?: () => void
): {cancel: () => void};

/** Throttles calls to the specified function using `requestAnimationFrame`. */
export function throttleAF<A, Args extends A[], R>(
	f: (...args: Args) => R
): {(...args: Args): R; cancel: () => void; flush: () => void};
