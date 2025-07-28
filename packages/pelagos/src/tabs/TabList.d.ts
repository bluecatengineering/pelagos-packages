import type {FunctionComponent, HTMLProps, ReactNode} from 'react';

interface TabListProps extends Omit<HTMLProps<HTMLDivElement>, 'onChange'> {
	/** The component class name(s). */
	className?: string;
	/** The index of the selected tab. */
	selectedIndex?: number;
	/** Whether the tabs use the contained style. */
	contained?: boolean;
	/** The tabs. */
	children: ReactNode;
	/** Function invoked when the selected tab changes. */
	onChange: (index: number) => void;
}

/** A list of tabs. When using this component the related tab panels should follow the indication in: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/ */
declare const TabList: FunctionComponent<TabListProps>;
export default TabList;
