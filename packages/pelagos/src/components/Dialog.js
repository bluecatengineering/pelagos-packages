import {cloneElement, useCallback, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {createFocusTrap} from 'focus-trap';

import Layer from './Layer';
import './Dialog.less';

/** A modal dialog box. */
const Dialog = ({id, className, title, role, size, stretch, initialFocus, children: [body, buttons], onSubmit}) => {
	const previousActive = useRef(document.activeElement);
	const element = useRef(null);

	const content = (
		<>
			<div id="dialogTitle" className="Dialog__title">
				{title}
			</div>
			{cloneElement(body, {
				className: body.props.className ? body.props.className + ' Dialog__body' : 'Dialog__body',
			})}
			{cloneElement(buttons, {className: 'Dialog__buttons'})}
		</>
	);

	const handleSubmit = useCallback((event) => (event.preventDefault(), onSubmit()), [onSubmit]);

	useEffect(() => {
		const p = previousActive.current;
		const trap = createFocusTrap(element.current, {
			initialFocus,
			escapeDeactivates: false,
			returnFocusOnDeactivate: false,
		});
		trap.activate();
		return () => {
			trap.deactivate();
			if (p?.focus) {
				p.focus();
			}
		};
	}, [initialFocus]);

	const fullClassName = `Dialog Dialog--${size}${stretch ? ' Dialog--stretch' : ''}${className ? ` ${className}` : ''}`;
	return (
		<div className="Dialog__backdrop">
			<Layer
				id={id}
				className={fullClassName}
				level={1}
				role={role}
				aria-modal
				aria-labelledby="dialogTitle"
				ref={element}>
				{onSubmit ? <form onSubmit={handleSubmit}>{content}</form> : content}
			</Layer>
		</div>
	);
};

Dialog.propTypes = {
	/** The component ID. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The dialog title. */
	title: PropTypes.string.isRequired,
	/** The dialog ARIA role. */
	role: PropTypes.oneOf(['dialog', 'alertdialog']),
	/** The dialog size. */
	size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
	/** Whether the dialog should use the maximum height for the size. */
	stretch: PropTypes.bool,
	/** The ID of the component to focus. */
	initialFocus: PropTypes.string,
	/** The dialog children. */
	children: PropTypes.arrayOf(PropTypes.element).isRequired,
	/** Function invoked when a submit button is clicked. */
	onSubmit: PropTypes.func,
};

Dialog.defaultProps = {
	role: 'dialog',
	size: 'md',
};

export default Dialog;
