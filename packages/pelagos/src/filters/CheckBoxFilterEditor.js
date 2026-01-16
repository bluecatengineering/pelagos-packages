import {useCallback, useState} from 'react';
import PropTypes from 'prop-types';

import CheckBox from '../components/CheckBox';
import useRandomId from '../hooks/useRandomId';

import FilterEditor from './FilterEditor';

import './CheckBoxFilterEditor.less';

/** Filter editor where options are presented as check boxes. */
export const OldCheckBoxFilterEditor = ({label, options, list, getLabel, onListChange}) => (
	<fieldset className="CheckBoxFilterEditor">
		<legend className="CheckBoxFilterEditor__legend">{label}</legend>
		{options.map((opt) => (
			<CheckBox
				key={opt}
				id={`checkBoxOption-${opt}`}
				className="CheckBoxFilterEditor__option"
				label={getLabel(opt)}
				checked={list && list.includes(opt)}
				onChange={() =>
					onListChange(
						list
							? list.includes(opt)
								? list.length === 1
									? null
									: list.filter((cur) => cur !== opt)
								: [...list, opt]
							: [opt]
					)
				}
			/>
		))}
	</fieldset>
);

OldCheckBoxFilterEditor.propTypes = {
	/** The field label. */
	label: PropTypes.string.isRequired,
	/** The filter options. */
	options: PropTypes.array.isRequired,
	/** The current filter values. */
	list: PropTypes.array,
	/** Function returning the option label. */
	getLabel: PropTypes.func.isRequired,
	/** Function invoked to apply changes. */
	onListChange: PropTypes.func,
};

/** Filter editor where options are presented as check boxes. */
export const NewCheckBoxFilterEditor = ({id, label, options, list: initialList, getLabel, chipId, onClose, onSave}) => {
	const [list, setList] = useState(initialList || []);
	const handleChange = useCallback(
		(event) => {
			const {checked, value} = event.target;
			const option = options[value];
			setList((list) => (checked ? [...list, option] : list.filter((cur) => cur !== option)));
		},
		[options]
	);
	const handleSave = useCallback(() => onSave(list.length ? list : null), [list, onSave]);
	id = useRandomId(id);
	const labelId = `${id}-label`;
	return (
		<FilterEditor id={id} chipId={chipId} aria-labelledby={labelId} onClose={onClose} onSave={handleSave}>
			<fieldset className="CheckBoxFilterEditor">
				<legend id={labelId} className="CheckBoxFilterEditor__legend">
					{label}
				</legend>
				<div className="CheckBoxFilterEditor__options">
					{options.map((opt, index) => (
						<CheckBox
							key={opt}
							id={`${id}-${opt}`}
							className="CheckBoxFilterEditor__option"
							label={getLabel(opt)}
							value={index}
							checked={list.includes(opt)}
							onChange={handleChange}
						/>
					))}
				</div>
			</fieldset>
		</FilterEditor>
	);
};

NewCheckBoxFilterEditor.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The field label. */
	label: PropTypes.string.isRequired,
	/** The filter options. */
	options: PropTypes.array.isRequired,
	/** The current filter values. */
	list: PropTypes.array,
	/** Function returning the option label. */
	getLabel: PropTypes.func.isRequired,
	/** The ID of the chip which triggered the editor. */
	chipId: PropTypes.string,
	/** Function invoked to close the editor. */
	onClose: PropTypes.func,
	/** Function invoked to save changes. */
	onSave: PropTypes.func,
};

/** Filter editor where options are presented as check boxes. */
const CheckBoxFilterEditor = ({forArea, ...props}) =>
	forArea ? <NewCheckBoxFilterEditor {...props} /> : <OldCheckBoxFilterEditor {...props} />;

CheckBoxFilterEditor.propTypes = {
	/** The component id (only when forArea is true). */
	id: PropTypes.string,
	/** The field label. */
	label: PropTypes.string.isRequired,
	/** The filter options. */
	options: PropTypes.array.isRequired,
	/** The current filter values. */
	list: PropTypes.array,
	/** Function returning the option label. */
	getLabel: PropTypes.func.isRequired,
	/** Function invoked to apply changes (only when forArea is false). */
	onListChange: PropTypes.func,
	/** The ID of the chip which triggered the editor (only when forArea is true). */
	chipId: PropTypes.string,
	/** Function invoked to close the editor (only when forArea is true). */
	onClose: PropTypes.func,
	/** Function invoked to save changes (only when forArea is true). */
	onSave: PropTypes.func,
	/** Whether to enable new behaviour for FilterArea.  */
	forArea: PropTypes.bool,
};

export default CheckBoxFilterEditor;
