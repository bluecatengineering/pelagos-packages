import {forwardRef} from 'react';
import PropTypes from 'prop-types';

/** An item in IconMenu. */
const IconMenuItem = forwardRef(({className, text, disabled, hasDivider, ...props}, ref) => (
	<li
		{...props}
		className={`IconMenu__option${disabled ? ' IconMenu--disabled' : ''}${hasDivider ? ' IconMenu--divider' : ''}${
			className ? ` ${className}` : ''
		}`}
		role="menuitem"
		ref={ref}
	>
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
