import React, {cloneElement} from 'react';
import PropTypes from 'prop-types';

import './Dialog.less';

const Dialog = ({id, componentId, title, children: [body, buttons], onSubmit}) => {
	const content = (
		<>
			<div className="Dialog__title">{title}</div>
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
					data-bcn-id={componentId}
					className="Dialog"
					onSubmit={event => (event.preventDefault(), onSubmit())}>
					{content}
				</form>
			) : (
				<div id={id} data-bcn-id={componentId} className="Dialog">
					{content}
				</div>
			)}
		</div>
	);
};

Dialog.propTypes = {
	id: PropTypes.string,
	componentId: PropTypes.string,
	title: PropTypes.string.isRequired,
	children: PropTypes.arrayOf(PropTypes.element).isRequired,
	onSubmit: PropTypes.func,
};

export default Dialog;
