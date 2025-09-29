import PropTypes from 'prop-types';

import TagInput from '../components/TagInput';
import useRandomId from '../hooks/useRandomId';

import FieldWrapper from './FieldWrapper';

/** A form field wrapper for [TagInput](/docs/components-taginput--docs). */
const TagInputField = ({id, className, label, required, tags, helperText, error, disabled, ...props}) => {
	id = useRandomId(id);
	const labelId = `${id}-label`;
	const helperId = `${id}-helper`;
	return (
		<FieldWrapper
			id={labelId}
			className={`TagInputField${className ? ` ${className}` : ''}`}
			htmlFor={id}
			label={label}
			required={required}
			helperId={helperId}
			helperText={helperText}
			error={error}>
			<TagInput
				{...props}
				id={id}
				tags={tags}
				error={error}
				disabled={disabled}
				aria-required={required}
				aria-labelledby={labelId}
				aria-describedby={helperId}
			/>
		</FieldWrapper>
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
	/** Whether the field is disabled. */
	disabled: PropTypes.bool,
	/** Function invoked to validate each tag. */
	validate: PropTypes.func.isRequired,
	/** Function invoked when the tags change. */
	onChange: PropTypes.func.isRequired,
	/** Function invoked when an error is detected. */
	onError: PropTypes.func.isRequired,
};

export default TagInputField;
