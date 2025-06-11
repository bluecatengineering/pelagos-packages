import {useCallback} from 'react';
import PropTypes from 'prop-types';

import Label from '../components/Label';
import Toggle from '../components/Toggle';
import useRandomId from '../hooks/useRandomId';

import './ToggleField.less';

/** A form field wrapper for [Toggle](/docs/components-toggle--docs). */
const ToggleField = ({id, className, label, value, disabled, labelOn, labelOff, onChange}) => {
	id = useRandomId(id);
	const labelId = `${id}-label`;
	return (
		<div className={'ToggleField' + (className ? ' ' + className : '')}>
			<div className="ToggleField__label">
				<Label id={labelId} text={label} />
			</div>

			<Toggle
				id={id}
				checked={value}
				disabled={disabled}
				aria-labelledby={labelId}
				labelOn={labelOn}
				labelOff={labelOff}
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
	/** The label for the "on" position. */
	labelOn: PropTypes.string,
	/** The label for the "off" position. */
	labelOff: PropTypes.string,
	/** Function invoked when the value changes. */
	onChange: PropTypes.func.isRequired,
};

export default ToggleField;
