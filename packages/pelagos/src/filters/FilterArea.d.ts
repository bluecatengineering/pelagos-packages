import type {FunctionComponent, HTMLProps, ReactNode} from 'react';

interface FilterAreaProps extends HTMLProps<HTMLUListElement> {
	/** The component class name(s). */
	className?: string;
	/** Whether the area is expanded. */
	expanded?: boolean;
	/** The buttons. */
	children?: ReactNode;
}

/** Displays a list of filters. A ref set on it must be stable (for example created with useRef or wrapped in useCallback), a new ref stops the running animation. */
declare const FilterArea: FunctionComponent<FilterAreaProps>;
export default FilterArea;
