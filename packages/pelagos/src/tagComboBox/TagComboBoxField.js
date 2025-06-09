import PropTypes from 'prop-types';

import FieldError from '../formFields/FieldError';
import FieldHelper from '../formFields/FieldHelper';
import LabelLine from '../components/LabelLine';
import useRandomId from '../hooks/useRandomId';

import TagComboBox from './TagComboBox';

import './TagComboBoxField.less';

/** A tag combo box field. */
const TagComboBoxField = ({id, className, label, required, helperText, error, ...props}) => {
	id = useRandomId(id);
	const labelId = `${id}-label`;
	const helperId = `${id}-helper`;
	const errorId = `${id}-error`;
	return (
		<div className={`TagComboBoxField${className ? ` ${className}` : ''}`}>
			<LabelLine id={labelId} htmlFor={id} text={label} required={required} error={!!error} />
			<TagComboBox
				{...props}
				id={id}
				error={error}
				aria-required={required}
				aria-labelledby={labelId}
				aria-describedby={error ? errorId : helperId}
			/>
			{error ? <FieldError id={errorId} text={error} /> : <FieldHelper id={helperId} text={helperText} />}
		</div>
	);
};

TagComboBoxField.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The label text. */
	label: PropTypes.string.isRequired,
	/** Whether the field is required. */
	required: PropTypes.bool,
	/** The entered tags. */
	tags: PropTypes.array.isRequired,
	/** The default tags. */
	defaultTags: PropTypes.array,
	/** The tooltip for default tags. */
	defaultTooltipText: PropTypes.string,
	/** Additional information for the field. */
	helperText: PropTypes.string,
	/** The error text. */
	error: PropTypes.string,
	/** Whether the input is disabled. */
	disabled: PropTypes.bool,
	/** Function invoked to get the key of each tag. */
	getKey: PropTypes.func,
	/** Function invoked to get the name of each tag. */
	getName: PropTypes.func,
	/** Function invoked to render each tag. */
	renderTag: PropTypes.func,
	/** Function invoked to check if a tag is already present. */
	hasTag: PropTypes.func,
	/** Function invoked to validate each tag. */
	validate: PropTypes.func.isRequired,
	/** Function that transforms the text input before it is validated. */
	transform: PropTypes.func,
	/** Function that converts the text input to a tag. */
	textToTag: PropTypes.func,
	/** Function invoked to get suggestions based on text input, can return a promise. */
	getSuggestions: PropTypes.func,
	/** Function invoked to render suggestions. */
	renderSuggestion: PropTypes.func,
	/** Function that converts a suggestion to a tag. */
	suggestionToTag: PropTypes.func,
	/** Function invoked when the tags change. */
	onChange: PropTypes.func.isRequired,
	/** Function invoked when an error is detected. */
	onError: PropTypes.func.isRequired,
};

export default TagComboBoxField;
