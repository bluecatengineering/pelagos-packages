import type {FunctionComponent, ReactNode} from 'react';

interface OutputFieldProps {
	/** The component id. */
	id?: string;
	/** The component class name(s). */
	className?: string;
	/** The label text. */
	label: string;
	/** The value to be displayed. */
	value?: ReactNode;
	/** Whether the content will align right. */
	alignRight?: boolean;
	/** Whether the content is active. */
	active?: boolean;
}

/** A labelled output. */
declare const OutputField: FunctionComponent<OutputFieldProps>;
export default OutputField;
