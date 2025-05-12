import PropTypes from 'prop-types';
import {t} from '@bluecateng/l10n.macro';
import CheckmarkOutline from '@carbon/icons-react/es/CheckmarkOutline';
import CircleDash from '@carbon/icons-react/es/CircleDash';
import Incomplete from '@carbon/icons-react/es/Incomplete';
import Warning from '@carbon/icons-react/es/Warning';

import './ProgressStep.less';

const stepDescription = (complete, current, invalid) =>
	invalid ? t`Invalid` : current ? t`Current` : complete ? t`Complete` : t`Incomplete`;

/** Progress step. */
const ProgressStep = ({label, complete, current, invalid}) => (
	<li
		className={`ProgressStep ${
			complete ? 'ProgressStep--complete' : current ? 'ProgressStep--current' : 'ProgressStep--incomplete'
		}`}
		aria-current={current ? 'step' : undefined}>
		<span className="sr-only">, {stepDescription(complete, current, invalid)}</span>
		{invalid ? (
			<Warning className="ProgressStep__icon ProgressStep__icon--error" />
		) : current ? (
			<Incomplete className="ProgressStep__icon ProgressStep__icon--current" />
		) : complete ? (
			<CheckmarkOutline className="ProgressStep__icon ProgressStep__icon--complete" />
		) : (
			<CircleDash className="ProgressStep__icon ProgressStep__icon--incomplete" />
		)}
		<span className="ProgressStep__label">{label}</span>
	</li>
);

ProgressStep.propTypes = {
	/** The step label. */
	label: PropTypes.string,
	/** Whether the step is complete. */
	complete: PropTypes.bool,
	/** Whether the step the current one. */
	current: PropTypes.bool,
	/** Whether the step is not valid. */
	invalid: PropTypes.bool,
};

export default ProgressStep;
