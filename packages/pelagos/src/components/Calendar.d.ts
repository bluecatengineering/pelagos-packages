import type {FunctionComponent, HTMLProps} from 'react';

interface CalendarProps extends Omit<HTMLProps<HTMLDivElement>, 'value' | 'onChange'> {
	/** The component id. */
	id?: string;
	/** The component class name(s). */
	className?: string;
	/** The current value, either a single date or an array with two dates. */
	value?: number | [start: number, end: number];
	/** Function invoked when the selection changes. */
	onChange: (time: number | [start: number, end: number]) => void;
}

/** A component which allows selecting either a single date or a date range. Passing an array in `value` enables range selection. */
declare const Calendar: FunctionComponent<CalendarProps>;
export default Calendar;
