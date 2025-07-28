import type {FunctionComponent, HTMLProps, ReactNode} from 'react';

interface RadioGroupProps extends Omit<HTMLProps<HTMLDivElement>, 'onChange'> {
	/** The component ID. */
	id?: string;
	/** The component class name(s). */
	className?: string;
	/** The value of the selected option. */
	value?: string;
	/** The list of options. */
	options: string[];
	/** Function invoked to render each option. */
	renderLabel: (option: string) => ReactNode;
	/** Function invoked when the selected option changes. */
	onChange: (option: string) => void;
}

/** A group of radio buttons. */
declare const RadioGroup: FunctionComponent<RadioGroupProps>;
export default RadioGroup;
