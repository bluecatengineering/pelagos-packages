/**
 * Reorder options.
 * @property horizontal - whether the list is horizontal, default: false.
 * @property selector - CSS selector for elements to reorder, default: '.draggable'.
 * @property handleSelector - CSS selector for reorder handle, default: value of selector.
 * @property focusSelector - CSS selector for element to focus, default: value of handleSelector.
 * @property onStart - function called when reordering start.
 * @property onMove - function called when the element is moved.
 * @property onFinish - function called when reordering finishes.
 * @property onCancel - function called when reordering is cancelled.
 */
export interface ReorderOptions {
	horizontal?: boolean;
	selector?: string;
	handleSelector?: string;
	focusSelector?: string;
	onStart: (element: Element, position: number) => void;
	onMove: (element: Element, position: number) => void;
	onFinish: (element: Element) => void;
	onCancel: (element: Element) => void;
}

/**
 * Enable reordering on the specified element.
 * @param container - element that contains the elements to reorder.
 * @param options - options.
 * @return function to remove listeners.
 */
export default function reorder(container: Element, options: ReorderOptions): () => void;
