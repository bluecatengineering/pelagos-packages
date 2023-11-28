import PropTypes from 'prop-types';
import {faCircleCheck} from '@fortawesome/free-solid-svg-icons';

import useRandomId from '../hooks/useRandomId';
import rhombusExclamation from '../icons/rhombusExclamation';

import SvgIcon from './SvgIcon';
import Layer from './Layer';

import './ProgressBar.less';

const icons = {finished: faCircleCheck, error: rhombusExclamation};

/** Displays the progress status for tasks that take a long time. */
const ProgressBar = ({id, className, label, helperText, type, size, status, max, value}) => {
	id = useRandomId(id);
	const labelId = `${id}-label`;
	const helperId = `${id}-helper`;
	if (status === 'active' && (value === null || value === undefined)) {
		status = 'indeterminate';
	}
	return (
		<div
			className={`ProgressBar ProgressBar--${type} ProgressBar--${size} ProgressBar--${status}${
				className ? ` ${className}` : ''
			}`}>
			<div id={labelId} className="ProgressBar__label">
				<span className="ProgressBar__labelText">{label}</span>
				{status in icons && <SvgIcon className="ProgressBar__icon" icon={icons[status]} aria-hidden />}
			</div>
			<Layer
				id={id}
				className="ProgressBar__track"
				role="progressbar"
				aria-invalid={status === 'error'}
				aria-labelledby={labelId}
				aria-describedby={helperText && helperId}
				aria-valuemin="0"
				aria-valuemax={max}
				aria-valuenow={status === 'finished' ? max : status === 'error' ? 0 : value}>
				<div className="ProgressBar__bar" style={status === 'active' ? {transform: `scaleX(${value / max})`} : null} />
			</Layer>
			{helperText && (
				<div id={helperId} className="ProgressBar__helper">
					{helperText}
				</div>
			)}
		</div>
	);
};

ProgressBar.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The label text. */
	label: PropTypes.string,
	/** The textual representation of the current progress. */
	helperText: PropTypes.string,
	/** The alignment type. */
	type: PropTypes.oneOf(['default', 'inline', 'indented']),
	/** The size of the progress bar. */
	size: PropTypes.oneOf(['small', 'big']),
	/** The progress bar status. */
	status: PropTypes.oneOf(['active', 'finished', 'error']),
	/** The maximum value. */
	max: PropTypes.number,
	/** The current value. */
	value: PropTypes.number,
};

ProgressBar.defaultProps = {
	type: 'default',
	size: 'big',
	status: 'active',
	max: 100,
};

export default ProgressBar;
