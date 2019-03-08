import React from 'react';
import PropTypes from 'prop-types';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';

import ToastMessage from './ToastMessage';
import './Toast.less';

const Toast = ({messages, onRemove}) => (
	<div className="Toast">
		<TransitionGroup>
			{messages.map((m, i) => (
				<CSSTransition key={i} classNames="swing" timeout={{enter: 500, exit: 300}}>
					<ToastMessage message={m} onRemove={onRemove} />
				</CSSTransition>
			))}
		</TransitionGroup>
	</div>
);

Toast.propTypes = {
	messages: PropTypes.array,
	onRemove: PropTypes.func,
};

export default Toast;
