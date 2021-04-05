import PropTypes from 'prop-types';

import TagInput from '../components/TagInput';
import LabelLine from '../components/LabelLine';
import useRandomId from '../hooks/useRandomId';

import FieldError from './FieldError';
import './TagInputField.less';

/** A tag input field. */
const TagInputField = ({id, className, label, optional, tags, error, ...props}) => {
	id = useRandomId(id);
	const labelId = `${id}-label`;
	return (
		<div className={`TagInputField${className ? ' ' + className : ''}`}>
			<LabelLine id={labelId} htmlFor={id} text={label} optional={optional && tags.length === 0} />
			<TagInput {...props} id={id} tags={tags} error={error} aria-labelledby={labelId} />
			<FieldError text={error} />
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
	/** Whether the field is optional. */
	optional: PropTypes.bool,
	/** The entered tags. */
	tags: PropTypes.array.isRequired,
	/** The default tags. */
	defaultTags: PropTypes.array,
	/** The tooltip for default tags. */
	defaultTooltipText: PropTypes.string,
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
