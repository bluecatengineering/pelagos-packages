import type {HTMLProps, MutableRefObject, Provider, RefObject} from 'react';

export declare const LayerProvider: Provider<number>;

/** Adds an effect which positions an editor in a filter area. */
export function useAreaEditorPositioner<T extends Element>(
	ref: MutableRefObject<T | null>,
	buttonId: string,
	onClose: () => void
): void;

/** Returns a React ref which collapses the element. The element must have `overflow: hidden`. */
export function useCollapse<T extends Element>(open: boolean): RefObject<T> | undefined;

/** Adds an effect which positions an editor. */
export function useEditorPositioner<T extends Element>(
	ref: MutableRefObject<T | null>,
	buttonId: string,
	trackId?: string
): void;

/** Adds an effect which creates a focus trap. */
export function useFocusTrap<T extends Element>(
	ref: MutableRefObject<T | null>,
	initialFocus: string,
	onDeactivate?: () => void
): void;

/** Returns the current layer number. */
export function useLayer(): number;

/**
 * Returns properties to be added to the button which displays a menu and to the menu elements.
 * The menu should be rendered using the Menu and MenuItem components.
 */
export function useMenuHandler(setPopUpPosition?: (button: Element, menu: Element) => void): {
	expanded: boolean;
	buttonProps: Partial<HTMLProps<HTMLButtonElement>>;
	menuProps: Partial<HTMLProps<HTMLUListElement>>;
	guardProps: Partial<HTMLProps<HTMLElement>>;
	buttonRef: MutableRefObject<HTMLButtonElement>;
	menuRef: MutableRefObject<HTMLElement>;
};

/** Returns a callback which positions a menu. Typically used with `useMenuHandler`. */
export function useMenuPositioner(flipped?: boolean): (button: Element, Menu: Element) => void;

/** Returns either the specified string or a stable random string. */
export function useRandomId(id?: string): string;

/** Returns two React refs which enable reordering child nodes using drag and drop. */
export function useReorder(
	selector: string,
	handleSelector: string | {handle: string; focus: string},
	count: number,
	getElementName: (element: Element) => string,
	onChange: (fromIndex: number, toIndex: number) => void
): [MutableRefObject<Element>, MutableRefObject<Element>];

/** Returns an effect which positions the pop-up for a select box. */
export function useSelectPositioner(
	open: boolean,
	boxRef: MutableRefObject<Element>,
	popUpRef: MutableRefObject<Element>,
	options?: {changePopUpWidth?: boolean}
): void;

/** Adds a "slide" animation to the specified element. */
export function useSlidingPanel(id: string, onFinish?: () => void): () => void;

/**
 * Returns a stateful boolean and a function to toggle it.
 * Additionally, adds an effect which sets the state to true if any errors are found.
 */
export function useToggle(initialState: boolean, errors: boolean[]): [boolean, () => void];

/** Returns a callback ref to show a tooltip over the target element. */
export function useTooltip<T extends Element>(
	text?: string,
	placement?: 'bottom' | 'left' | 'right' | 'top',
	aria?: 'describedby' | 'labelledby'
): (element: T | null) => void;

/** Returns a tuple with two functions to show and hide a tooltip. */
export function useTooltipBase(): [
	(
		text: string | undefined,
		placement: string | undefined,
		element: Element,
		aria?: 'describedby' | 'labelledby'
	) => void,
	() => void,
	Element,
];
