import {useCallback, useRef} from 'react';
import PropTypes from 'prop-types';
import {t} from '@bluecateng/l10n.macro';
import Close from '@carbon/icons-react/es/Close';
import SearchIcon from '@carbon/icons-react/es/Search';

import Layer from './Layer';

import './Search.less';

/** Search input. */
export const Search = ({className, value, disabled, onChange, ...props}) => {
	const inputRef = useRef(null);
	const handleChange = useCallback((event) => onChange(event.target.value.toLowerCase()), [onChange]);
	const handleKeyDown = useCallback(
		(event) => {
			if (event.key === 'Escape') {
				onChange('');
			}
		},
		[onChange]
	);
	const handleClearClick = useCallback(() => (inputRef.current.focus(), onChange('')), [onChange]);
	return (
		<div className={`Search${disabled ? ' Search--disabled' : ''}${className ? ` ${className}` : ''}`}>
			<SearchIcon className="Search__icon" />
			<Layer
				{...props}
				as="input"
				className="Search__input"
				type="text"
				role="searchbox"
				value={value}
				disabled={disabled}
				ref={inputRef}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
			/>
			{value && (
				<button className="Search__clear" disabled={disabled} aria-label={t`Clear search`} onClick={handleClearClick}>
					<Close />
				</button>
			)}
		</div>
	);
};

Search.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The search text. Must be in lowercase. */
	value: PropTypes.string,
	/** Whether the field is disabled. */
	disabled: PropTypes.bool,
	/** Function invoked when the text changes. */
	onChange: PropTypes.func.isRequired,
};

export default Search;
