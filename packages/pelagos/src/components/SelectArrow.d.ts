import type {FunctionComponent} from 'react';

interface SelectArrowProps {
	/** The component class name(s). */
	className: string;
	/** Whether the select is open. */
	open?: boolean;
}

/** Arrow for select components. */
declare const SelectArrow: FunctionComponent<SelectArrowProps>;
export default SelectArrow;
