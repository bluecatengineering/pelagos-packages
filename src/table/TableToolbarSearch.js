import {useCallback, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash-es/debounce';
import {t} from '@bluecat/l10n.macro';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

import timesThin from '../icons/timesThin';
import SvgIcon from '../components/SvgIcon';

/** Search input for a table toolbar. */
const TableToolbarSearch = ({className, onChange, ...props}) => {
	const inputRef = useRef(null);
	const [text, setText] = useState('');
	const debouncedOnChange = useMemo(() => debounce(onChange, 300), [onChange]);
	const handleChange = useCallback(
		(event) => {
			const text = event.target.value.toLowerCase();
			setText(text);
			debouncedOnChange(text);
		},
		[debouncedOnChange]
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
			<span onClick={handleSearchClick}>
				<SvgIcon className="Table__searchIcon" icon={faSearch} />
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
				<button className="Table__searchClear" aria-label={t`Clear`} onClick={handleClearClick}>
					<SvgIcon icon={timesThin} />
				</button>
			)}
		</div>
	);
};

TableToolbarSearch.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** Function invoked when the text changes. */
	onChange: PropTypes.func.isRequired,
};

export default TableToolbarSearch;
