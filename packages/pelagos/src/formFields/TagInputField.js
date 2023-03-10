import PropTypes from 'prop-types';

import TagInput from '../components/TagInput';
import LabelLine from '../components/LabelLine';
import useRandomId from '../hooks/useRandomId';

import FieldError from './FieldError';
import FieldHelper from './FieldHelper';
import './TagInputField.less';

/** A tag input field. */
const TagInputField = ({id, className, label, required, tags, helperText, error, ...props}) => {
	id = useRandomId(id);
	const labelId = `${id}-label`;
	const helperId = `${id}-helper`;
	const errorId = `${id}-error`;
	return (
		<div className={`TagInputField${className ? ' ' + className : ''}`}>
			<LabelLine id={labelId} htmlFor={id} text={label} required={required} error={!!error} />
			<TagInput
				{...props}
				id={id}
				tags={tags}
				error={error}
				aria-required={required}
				aria-labelledby={labelId}
				aria-describedby={error ? errorId : helperId}
			/>
			{error ? <FieldError id={errorId} text={error} /> : <FieldHelper id={helperId} text={helperText} />}
		</div>
	);
};

TagInputField.propTypes = {
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
	/** Function invoked to validate each tag. */
	validate: PropTypes.func.isRequired,
	/** Function invoked when the tags change. */
	onChange: PropTypes.func.isRequired,
	/** Function invoked when an error is detected. */
	onError: PropTypes.func.isRequired,
};

export default TagInputField;
