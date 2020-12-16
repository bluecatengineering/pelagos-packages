import {useCallback} from 'react';
import PropTypes from 'prop-types';

import Label from '../components/Label';
import Toggle from '../components/Toggle';
import './ToggleField.less';

/** A toggle button field. */
const ToggleField = ({id, className, label, value, disabled, onChange}) => {
	id = id || 'e' + ('' + Math.random()).substr(2);
	const labelId = `${id}-label`;
	return (
		<div className={'ToggleField' + (className ? ' ' + className : '')}>
			<div className="ToggleField__label">
				<Label id={labelId} text={label} />
			</div>

			<Toggle
				id={id}
				className="ToggleField__field"
				checked={value}
				disabled={disabled}
				aria-labelledby={labelId}
				onChange={useCallback(() => onChange(!value), [value, onChange])}
			/>
		</div>
	);
};

ToggleField.propTypes = {
	/** The component ID. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The label text. */
	label: PropTypes.string.isRequired,
	/** The field value. */
	value: PropTypes.bool,
	/** Whether the toggle is disabled */
	disabled: PropTypes.bool,
	/** Function invoked when the value changes. */
	onChange: PropTypes.func.isRequired,
};

export default ToggleField;
