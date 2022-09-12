import {useCallback, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash-es/debounce';
import {t} from '@bluecat/l10n.macro';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

import xmarkThin from '../icons/xmarkThin';
import SvgIcon from '../components/SvgIcon';

/** Search input for a table toolbar. */
const TableToolbarSearch = ({className, initialText, onChange, ...props}) => {
	const inputRef = useRef(null);
	const [text, setText] = useState(initialText || '');
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
				<button className="Table__searchClear" aria-label={t`Clear`} onClick={handleClearClick}>
					<SvgIcon icon={xmarkThin} />
				</button>
			)}
		</div>
	);
};

TableToolbarSearch.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The initial search text. Must be in lowercase. */
	initialText: PropTypes.string,
	/** Function invoked when the text changes. The call is debounced with 300 ms delay. */
	onChange: PropTypes.func.isRequired,
};

export default TableToolbarSearch;
