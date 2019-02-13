import React, {cloneElement} from 'react';
import PropTypes from 'prop-types';

import './Dialog.less';

const Dialog = ({componentId, title, children: [body, buttons], onSubmit}) => (
	<div className="Dialog__backdrop" onClick={event => event.nativeEvent.stopImmediatePropagation()}>
		<form
			className="Dialog"
			data-bcn-id={componentId}
			onSubmit={onSubmit ? event => (event.preventDefault(), onSubmit()) : null}>
			<div className="Dialog__title">{title}</div>
			{cloneElement(body, {
				className: body.props.className ? body.props.className + ' Dialog__body' : 'Dialog__body',
			})}
			{cloneElement(buttons, {className: 'Dialog__buttons'})}
		</form>
	</div>
);

Dialog.propTypes = {
	componentId: PropTypes.string,
	title: PropTypes.string.isRequired,
	children: PropTypes.arrayOf(PropTypes.element).isRequired,
	onSubmit: PropTypes.func,
};

export default Dialog;
