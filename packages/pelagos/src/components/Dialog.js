import {cloneElement, useCallback, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {createFocusTrap} from 'focus-trap';
import {t} from '@bluecateng/l10n.macro';
import Help from '@carbon/icons-react/es/Help';

import Layer from './Layer';
import './Dialog.less';

/** A modal dialog box. */
const Dialog = ({
	id,
	className,
	title,
	helpHref,
	role = 'dialog',
	size = 'md',
	stretch,
	scrollable,
	initialFocus,
	children: [body, buttons],
	onSubmit,
}) => {
	const previousActive = useRef(document.activeElement);
	const element = useRef(null);

	const content = (
		<>
			<div className="Dialog__heading">
				<div id="dialogTitle" className="Dialog__title" title={title}>
					{title}
				</div>
				{!!helpHref && (
					<a className="Dialog__help" href={helpHref} target="_blank" rel="noreferrer">
						<Help />
						{t`Help`}
					</a>
				)}
			</div>
			{cloneElement(body, {
				className: `Dialog__body${scrollable ? ' scrollable' : ''}${body.props.className ? ` ${body.props.className}` : ''}`,
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
			allowOutsideClick: (event) => event.target.closest('.Toast'),
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
				tabIndex={-1}
				role={role}
				aria-modal
				aria-labelledby="dialogTitle"
				ref={element}>
				{onSubmit ? (
					<form className="Dialog__form" onSubmit={handleSubmit}>
						{content}
					</form>
				) : (
					content
				)}
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
	/** The URL to use in the help link, if specified a link will be added in the header. */
	helpHref: PropTypes.string,
	/** The dialog ARIA role. */
	role: PropTypes.oneOf(['dialog', 'alertdialog']),
	/** The dialog size. */
	size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
	/** Whether the dialog should use the maximum height for the size. */
	stretch: PropTypes.bool,
	/** Whether the dialog body can scroll. */
	scrollable: PropTypes.bool,
	/** The ID of the component to focus. */
	initialFocus: PropTypes.string,
	/** The dialog children. */
	children: PropTypes.arrayOf(PropTypes.element).isRequired,
	/** Function invoked when a submit button is clicked. */
	onSubmit: PropTypes.func,
};

export default Dialog;
