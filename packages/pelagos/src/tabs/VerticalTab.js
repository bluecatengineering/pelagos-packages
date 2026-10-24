import {forwardRef, useCallback, useContext} from 'react';
import PropTypes from 'prop-types';
import WarningFilled from '@carbon/icons-react/es/WarningFilled';

import TabListContext from './TabContext';

/** A single tab in a VerticalTabList. */
const VerticalTab = forwardRef(
	({as: BaseComponent = 'button', className, secondaryLabel, error, children, onClick, ...props}, ref) => {
		const {index, selectedIndex, focused, onChange} = useContext(TabListContext);
		// The handler set by the caller runs first, it can call preventDefault to skip the default behaviour
		const handleClick = useCallback(
			(event) => {
				onClick?.(event);
				if (!event.defaultPrevented) {
					onChange?.(index);
				}
			},
			[index, onChange, onClick]
		);
		return (
			<BaseComponent
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
			</BaseComponent>
		);
	}
);

VerticalTab.displayName = 'VerticalTab';

VerticalTab.propTypes = {
	/** Element or custom component to use as main element. */
	as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
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
	/** Function invoked when the element is clicked, before the default behaviour which is skipped if it calls preventDefault. */
	onClick: PropTypes.func,
};

export default VerticalTab;
