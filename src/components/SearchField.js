import {useCallback, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash-es/debounce';
import {t} from '@bluecat/l10n.macro';

import timesThin from '../icons/timesThin';

import Layer from './Layer';
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
		<Layer className={`SearchField ${className}`}>
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
				<button className="SearchField__icon" aria-label={t`Clear`} onClick={handleClick}>
					<SvgIcon icon={timesThin} />
				</button>
			)}
		</Layer>
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
