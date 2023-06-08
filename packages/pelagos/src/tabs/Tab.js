import {forwardRef, useCallback, useContext} from 'react';
import PropTypes from 'prop-types';
import {t} from '@bluecateng/l10n.macro';

import SvgIcon from '../components/SvgIcon';
import xmarkThin from '../icons/xmarkThin';

import TabListContext from './TabContext';

/** A single tab in a TabList. */
const Tab = forwardRef(({className, secondaryLabel, children, onRemove, ...props}, ref) => {
	const {index, selectedIndex, focused, hasSecondary, onChange} = useContext(TabListContext);
	const handleClick = useCallback(() => onChange(index), [index, onChange]);
	const handleMouseUp = useCallback(
		(event) => {
			if (event.button === 1 && onRemove) {
				event.preventDefault();
				onRemove(index);
			}
		},
		[index, onRemove]
	);
	const handleKeyDown = useCallback(
		(event) => {
			if (onRemove && event.key === 'Delete') {
				onRemove(index);
			}
		},
		[index, onRemove]
	);
	const handleRemoveClick = useCallback(
		(event) => {
			event.stopPropagation();
			onRemove(index);
		},
		[index, onRemove]
	);
	return (
		<button
			{...props}
			className={`TabList__tab${className ? ` ${className}` : ''}`}
			type="button"
			tabIndex={focused === index ? 0 : -1}
			role="tab"
			aria-selected={index === selectedIndex}
			ref={ref}
			onClick={handleClick}
			onMouseUp={handleMouseUp}
			onKeyDown={handleKeyDown}>
			<div className="TabList__label">
				{children}
				{/* can't nest buttons, span it is; keyboard support is on the button */}
				{onRemove && (
					<span className="TabList__remove" tabIndex={-1} role="button" aria-hidden onClick={handleRemoveClick}>
						<SvgIcon icon={xmarkThin} />
					</span>
				)}
			</div>
			{hasSecondary && <div className="TabList__secondaryLabel">{secondaryLabel}</div>}
			{onRemove && <div className="sr-only">{t`Press delete to remove tab`}</div>}
		</button>
	);
});

Tab.displayName = 'Tab';

Tab.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** A label to display under the primary label, only available in contained tabs. */
	secondaryLabel: PropTypes.string,
	/** The primary label. */
	children: PropTypes.node,
	/** Function invoked when the remove button is clicked. The remove button is displayed only when this property is not null. */
	onRemove: PropTypes.func,
};

export default Tab;
