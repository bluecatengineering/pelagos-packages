import React, {cloneElement, useCallback, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import focusTrap from 'focus-trap';

import './Dialog.less';

const Dialog = ({id, title, role, initialFocus, children: [body, buttons], onSubmit}) => {
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
		const trap = focusTrap(element.current, {initialFocus, escapeDeactivates: false, returnFocusOnDeactivate: false});
		trap.activate();
		return () => {
			trap.deactivate();
			if (p && p.focus) {
				p.focus();
			}
		};
	}, [initialFocus]);

	return (
		<div className="Dialog__backdrop">
			{onSubmit ? (
				<form
					id={id}
					className="Dialog"
					role={role}
					aria-modal
					aria-labelledby="dialogTitle"
					ref={element}
					onSubmit={handleSubmit}>
					{content}
				</form>
			) : (
				<div id={id} className="Dialog" role={role} aria-modal aria-labelledby="dialogTitle" ref={element}>
					{content}
				</div>
			)}
		</div>
	);
};

Dialog.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string.isRequired,
	role: PropTypes.oneOf(['dialog', 'alertdialog']),
	initialFocus: PropTypes.string,
	children: PropTypes.arrayOf(PropTypes.element).isRequired,
	onSubmit: PropTypes.func,
};

Dialog.defaultProps = {
	role: 'dialog',
};

export default Dialog;
