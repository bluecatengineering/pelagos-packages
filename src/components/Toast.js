import PropTypes from 'prop-types';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';

import {hasFatalError} from '../toasts/ToastFunctions';

import ToastMessage from './ToastMessage';
import './Toast.less';

/** Displays messages as toasts. */
const Toast = ({messages, onRemove}) => (
	<div className="Toast">
		<TransitionGroup className="Toast__messages">
			{messages.map((m, i) => (
				<CSSTransition key={i} classNames="swing" timeout={{enter: 500, exit: 300}}>
					<ToastMessage message={m} onRemove={onRemove} />
				</CSSTransition>
			))}
		</TransitionGroup>
		{hasFatalError(messages) && <div className="Toast__backdrop" />}
	</div>
);

Toast.propTypes = {
	/** Messages to display. */
	messages: PropTypes.array,
	/** Function to remove a message. */
	onRemove: PropTypes.func,
};

export default Toast;
