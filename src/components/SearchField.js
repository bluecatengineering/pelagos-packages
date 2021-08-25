import {useCallback, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash-es/debounce';
import {t} from '@bluecat/l10n.macro';

import handleButtonKeyDown from '../functions/handleButtonKeyDown';
import timesThin from '../icons/timesThin';

import SvgIcon from './SvgIcon';
import './SearchField.less';

/** A search field. */
const SearchField = ({className, initialText, onChange, ...props}) => {
	const inputRef = useRef(null);
	const [text, setText] = useState(initialText);
	const debouncedOnChange = useMemo(() => debounce(onChange, 300), [onChange]);
	const handleChange = useCallback(
		(event) => {
			const text = event.target.value.toLowerCase();
			setText(text);
			debouncedOnChange(text);
		},
		[debouncedOnChange]
	);
	const handleClick = useCallback(() => (inputRef.current.focus(), setText(''), onChange('')), [onChange]);
	return (
		<div className={`SearchField ${className}`}>
			<input
				{...props}
				className="SearchField__input"
				type="text"
				role="searchbox"
				value={text}
				ref={inputRef}
				onChange={handleChange}
			/>
			{text && (
				<span
					className="SearchField__icon"
					tabIndex="0"
					role="button"
					aria-label={t`Clear`}
					onClick={handleClick}
					onKeyDown={handleButtonKeyDown}>
					<SvgIcon icon={timesThin} />
				</span>
			)}
		</div>
	);
};

SearchField.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The initial search text. */
	initialText: PropTypes.string,
	/** Function invoked when the text changes. */
	onChange: PropTypes.func.isRequired,
};
SearchField.defaultProps = {
	initialText: '',
};

export default SearchField;
