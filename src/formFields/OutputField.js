import React from 'react';
import PropTypes from 'prop-types';

import Label from '../components/Label';
import './OutputField.less';

/** A labelled output. */
const OutputField = ({id, className, label, value, alignRight, active}) => {
	id = id || 'e' + ('' + Math.random()).substr(2);
	return (
		<div
			className={'OutputField' + (alignRight ? ' OutputField--alignRight' : '') + (className ? ' ' + className : '')}>
			<div className="OutputField__label">
				<Label text={label} htmlFor={id} />
			</div>
			<output id={id} className={'OutputField__value' + (active ? ' OutputField--active' : '')}>
				{value}
			</output>
		</div>
	);
};

OutputField.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The label text. */
	label: PropTypes.string.isRequired,
	/** The value to be displayed. */
	value: PropTypes.any,
	/** Whether the content will align right. */
	alignRight: PropTypes.bool,
	/** Whether the content is active. */
	active: PropTypes.bool,
};

export default OutputField;
