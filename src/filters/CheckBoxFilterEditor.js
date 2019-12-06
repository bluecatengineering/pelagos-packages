import React from 'react';
import PropTypes from 'prop-types';

import Label from '../components/Label';
import CheckBox from '../components/CheckBox';

import './CheckBoxFilterEditor.less';

const CheckBoxFilterEditor = ({label, list, options, getLabel, onListChange}) => (
	<>
		<div className="CheckBoxFilterEditor__label">
			<Label text={label} />
		</div>
		{options.map(opt => (
			<CheckBox
				key={opt}
				id={`checkBoxOption-${opt}`}
				className="CheckBoxFilterEditor__option"
				label={getLabel(opt)}
				checked={list.includes(opt)}
				onChange={() =>
					list.includes(opt) ? onListChange(list.filter(cur => cur !== opt)) : onListChange([...list, opt])
				}
			/>
		))}
	</>
);

CheckBoxFilterEditor.propTypes = {
	label: PropTypes.string,
	list: PropTypes.array,
	options: PropTypes.array,
	filterName: PropTypes.string,
	getLabel: PropTypes.func,
	onListChange: PropTypes.func,
};

export default CheckBoxFilterEditor;
