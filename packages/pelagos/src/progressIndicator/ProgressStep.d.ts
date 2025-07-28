import type {FunctionComponent} from 'react';

interface ProgressStepProps {
	/** The step label. */
	label: string;
	/** Whether the step is complete. */
	complete?: boolean;
	/** Whether the step the current one. */
	current?: boolean;
	/** Whether the step is not valid. */
	invalid?: boolean;
}

/** Progress step. */
declare const ProgressStep: FunctionComponent<ProgressStepProps>;
export default ProgressStep;
