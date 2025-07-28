import type {FunctionComponent, HTMLProps, ReactNode} from 'react';

interface ContentSwitcherProps extends Omit<HTMLProps<HTMLDivElement>, 'selected' | 'onChange'> {
	/** The component class name(s). */
	className?: string;
	/** The index of the selected button. */
	selected?: number;
	/** The buttons. */
	children: ReactNode;
	/** Function invoked when selected button changes. */
	onChange: (index: number) => void;
}

/**
 * A component which allows users to toggle between two or more content sections within the same space.
 * The caller is responsible for setting either `aria-label` or `aria-labelledby` on this component and
 * `aria-controls` and `aria-labelledby` on the buttons and panels respectively, for more details see
 * [WAI-ARIA Tabs roles, states, and properties](https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/#wai-aria-roles-states-and-properties-22).
 */
declare const ContentSwitcher: FunctionComponent<ContentSwitcherProps>;
export default ContentSwitcher;
