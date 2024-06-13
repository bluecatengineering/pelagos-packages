import {forwardRef, useCallback, useContext} from 'react';
import PropTypes from 'prop-types';
import WarningFilled from '@carbon/icons-react/es/WarningFilled';

import TabListContext from './TabContext';

/** A single tab in a VerticalTabList. */
const VerticalTab = forwardRef(({className, secondaryLabel, error, children, ...props}, ref) => {
	const {index, selectedIndex, focused, onChange} = useContext(TabListContext);
	const handleClick = useCallback(() => onChange(index), [index, onChange]);
	return (
		<button
			{...props}
			className={`VerticalTabList__tab${error ? ' VerticalTabList__tab--error' : ''}${className ? ` ${className}` : ''}`}
			type="button"
			tabIndex={focused === index ? 0 : -1}
			role="tab"
			aria-selected={index === selectedIndex}
			ref={ref}
			onClick={handleClick}>
			<div className="VerticalTabList__labelWrapper">
				<div className="VerticalTabList__label">{children}</div>
				{secondaryLabel && <div className="VerticalTabList__secondaryLabel">{secondaryLabel}</div>}
			</div>
			{error && <WarningFilled className="VerticalTabList__error" />}
		</button>
	);
});

VerticalTab.displayName = 'VerticalTab';

VerticalTab.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** A label to display under the primary label. */
	secondaryLabel: PropTypes.string,
	/** Whether the tab is disabled. */
	disabled: PropTypes.bool,
	/** Whether the tab has an error. */
	error: PropTypes.bool,
	/** The primary label. */
	children: PropTypes.node,
};

export default VerticalTab;
