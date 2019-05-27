import React from 'react';
import PropTypes from 'prop-types';

import Label from '../components/Label';
import './OutputField.less';

const OutputField = ({id, className, label, value, alignRight, active}) => {
	id = id || 'e' + ('' + Math.random()).substr(2);
	return (
		<div
			className={'OutputField' + (alignRight ? ' OutputField--alignRight' : '') + (className ? ' ' + className : '')}>
			<div>
				<Label text={label} htmlFor={id} />
			</div>
			<output id={id} className={'OutputField__value' + (active ? ' OutputField--active' : '')}>
				{value}
			</output>
		</div>
	);
};

OutputField.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	label: PropTypes.string.isRequired,
	value: PropTypes.any,
	alignRight: PropTypes.bool,
	active: PropTypes.bool,
};

export default OutputField;
