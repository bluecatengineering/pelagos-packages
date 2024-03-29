import {forwardRef} from 'react';
import PropTypes from 'prop-types';

/** @deprecated use MenuItem instead. */
const IconMenuItem = forwardRef(({className, text, disabled, hasDivider, ...props}, ref) => (
	<li
		{...props}
		className={`IconMenu__option${hasDivider ? ' IconMenu--divider' : ''}${className ? ` ${className}` : ''}`}
		tabIndex={-1}
		role="menuitem"
		aria-disabled={disabled}
		ref={ref}>
		{text}
	</li>
));

IconMenuItem.displayName = 'IconMenuItem';

IconMenuItem.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The item text. */
	text: PropTypes.string,
	/** Whether the item is disabled. */
	disabled: PropTypes.bool,
	/** Whether the item has a divider. */
	hasDivider: PropTypes.bool,
};

export default IconMenuItem;
