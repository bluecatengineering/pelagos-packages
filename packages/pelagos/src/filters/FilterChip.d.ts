import type {FunctionComponent, HTMLProps, MouseEventHandler, ReactNode} from 'react';

interface FilterChipProps extends HTMLProps<HTMLLIElement> {
	/** The component id. */
	id?: string;
	/** The category name. */
	name: string;
	/** The filter values. */
	children?: ReactNode;
	/** Function invoked when the chip is clicked. */
	onEditClick: MouseEventHandler<HTMLButtonElement>;
	/** Function invoked when the remove button is clicked. */
	onRemoveClick: MouseEventHandler<HTMLButtonElement>;
}

/** Represents a filter category and the selected filter values.  */
declare const FilterChip: FunctionComponent<FilterChipProps>;
export default FilterChip;
