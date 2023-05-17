import {useCallback, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {t} from '@bluecateng/l10n.macro';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

import xmarkThin from '../icons/xmarkThin';
import SvgIcon from '../components/SvgIcon';

/** Search input for a table toolbar. */
export const OldTableToolbarSearch = ({className, initialText, onChange, ...props}) => {
	const inputRef = useRef(null);
	const [text, setText] = useState(initialText || '');
	const handleChange = useCallback(
		(event) => {
			const text = event.target.value.toLowerCase();
			setText(text);
			onChange(text);
		},
		[onChange]
	);
	const handleKeyDown = useCallback(
		(event) => {
			if (event.keyCode === 27) {
				setText('');
				onChange('');
			}
		},
		[onChange]
	);
	const handleSearchClick = useCallback(() => inputRef.current.focus(), []);
	const handleClearClick = useCallback(() => (inputRef.current.focus(), setText(''), onChange('')), [onChange]);
	return (
		<div className={`Table__search${className ? ` ${className}` : ''}`}>
			<span onClick={handleSearchClick} aria-hidden>
				<SvgIcon className="Table__searchIcon" icon={faMagnifyingGlass} />
			</span>
			<input
				{...props}
				className="Table__searchInput"
				type="text"
				role="searchbox"
				value={text}
				ref={inputRef}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
			/>
			{text && (
				<button className="Table__searchClear" aria-label={t`Clear search`} onClick={handleClearClick}>
					<SvgIcon icon={xmarkThin} />
				</button>
			)}
		</div>
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
export const NewTableToolbarSearch = ({className, value, onChange, ...props}) => {
	const inputRef = useRef(null);
	const handleChange = useCallback((event) => onChange(event.target.value.toLowerCase()), [onChange]);
	const handleKeyDown = useCallback(
		(event) => {
			if (event.keyCode === 27) {
				onChange('');
			}
		},
		[onChange]
	);
	const handleSearchClick = useCallback(() => inputRef.current.focus(), []);
	const handleClearClick = useCallback(() => (inputRef.current.focus(), onChange('')), [onChange]);
	return (
		<div className={`Table__search${className ? ` ${className}` : ''}`}>
			<span onClick={handleSearchClick} aria-hidden>
				<SvgIcon className="Table__searchIcon" icon={faMagnifyingGlass} />
			</span>
			<input
				{...props}
				className="Table__searchInput"
				type="text"
				role="searchbox"
				value={value}
				ref={inputRef}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
			/>
			{value && (
				<button className="Table__searchClear" aria-label={t`Clear search`} onClick={handleClearClick}>
					<SvgIcon icon={xmarkThin} />
				</button>
			)}
		</div>
	);
};

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
