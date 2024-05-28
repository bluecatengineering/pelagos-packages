import {useCallback, useState} from 'react';
import PropTypes from 'prop-types';

import Search from '../components/Search';

/** Search input for a table toolbar. */
export const OldTableToolbarSearch = ({className, initialText, onChange, ...props}) => {
	const [text, setText] = useState(initialText || '');
	const handleChange = useCallback(
		(text) => {
			setText(text);
			onChange(text);
		},
		[onChange]
	);
	return (
		<Search
			{...props}
			className={`Table__search${className ? ` ${className}` : ''}`}
			value={text}
			onChange={handleChange}
		/>
	);
};

OldTableToolbarSearch.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The initial search text. Must be in lowercase. */
	initialText: PropTypes.string,
	/** Function invoked when the text changes. */
	onChange: PropTypes.func.isRequired,
};

/** Search input for a table toolbar. */
export const NewTableToolbarSearch = ({className, value, onChange, ...props}) => (
	<Search {...props} className={`Table__search${className ? ` ${className}` : ''}`} value={value} onChange={onChange} />
);

NewTableToolbarSearch.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The search text. Must be in lowercase. */
	value: PropTypes.string,
	/** Function invoked when the text changes. */
	onChange: PropTypes.func.isRequired,
};

const TableToolbarSearch = ({...props}) =>
	props.value === undefined ? <OldTableToolbarSearch {...props} /> : <NewTableToolbarSearch {...props} />;

TableToolbarSearch.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The search text. Must be in lowercase. */
	value: PropTypes.string,
	/** @deprecated use value instead. */
	initialText: PropTypes.string,
	/** Function invoked when the text changes. */
	onChange: PropTypes.func.isRequired,
};

export default TableToolbarSearch;
