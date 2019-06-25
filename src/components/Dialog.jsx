import React, {cloneElement} from 'react';
import PropTypes from 'prop-types';

import './Dialog.less';

const Dialog = ({id, title, role, children: [body, buttons], onSubmit}) => {
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

	return (
		<div className="Dialog__backdrop" onClick={event => event.nativeEvent.stopImmediatePropagation()}>
			{onSubmit ? (
				<form
					id={id}
					className="Dialog"
					role={role}
					aria-modal
					aria-labelledby="dialogTitle"
					onSubmit={event => (event.preventDefault(), onSubmit())}>
					{content}
				</form>
			) : (
				<div id={id} className="Dialog" role={role} aria-modal aria-labelledby="dialogTitle">
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
	children: PropTypes.arrayOf(PropTypes.element).isRequired,
	onSubmit: PropTypes.func,
};

Dialog.defaultProps = {
	role: 'dialog',
};

export default Dialog;
