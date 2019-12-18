import React from 'react';
import PropTypes from 'prop-types';

import Label from '../components/Label';
import CheckBox from '../components/CheckBox';

import './CheckBoxFilterEditor.less';

/** Filter editor where options are presented as check boxes. */
const CheckBoxFilterEditor = ({label, options, list, getLabel, onListChange}) => (
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
	/** The field label. */
	label: PropTypes.string.isRequired,
	/** The filter options. */
	options: PropTypes.array.isRequired,
	/** The current filter values. */
	list: PropTypes.array.isRequired,
	/** Function returning the option label. */
	getLabel: PropTypes.func.isRequired,
	/** Function invoked to apply changes. */
	onListChange: PropTypes.func,
};

export default CheckBoxFilterEditor;
