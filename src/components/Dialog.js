import {cloneElement, useCallback, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {createFocusTrap} from 'focus-trap';

import './Dialog.less';

/** A modal dialog box. */
const Dialog = ({id, className, title, role, initialFocus, children: [body, buttons], onSubmit}) => {
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
			if (p && p.focus) {
				p.focus();
			}
		};
	}, [initialFocus]);

	const fullClassName = `Dialog${className ? ' ' + className : ''}`;
	return (
		<div className="Dialog__backdrop">
			{onSubmit ? (
				<form
					id={id}
					className={fullClassName}
					role={role}
					aria-modal
					aria-labelledby="dialogTitle"
					ref={element}
					onSubmit={handleSubmit}>
					{content}
				</form>
			) : (
				<div id={id} className={fullClassName} role={role} aria-modal aria-labelledby="dialogTitle" ref={element}>
					{content}
				</div>
			)}
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
	/** The ID of the component to focus. */
	initialFocus: PropTypes.string,
	/** The dialog children. */
	children: PropTypes.arrayOf(PropTypes.element).isRequired,
	/** Function invoked when a submit button is clicked. */
	onSubmit: PropTypes.func,
};

Dialog.defaultProps = {
	role: 'dialog',
};

export default Dialog;
