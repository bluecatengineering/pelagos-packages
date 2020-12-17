import {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';

import {hasFatalError} from '../toasts/ToastFunctions';

import ToastMessage from './ToastMessage';
import './Toast.less';

const duration = 150;

const createAnimation = (id) =>
	document.getElementById(`toast-${id}`).animate(
		[
			{opacity: 0, transform: 'rotateX(-90deg)'},
			{opacity: 1, transform: 'none'},
		],
		{duration, fill: 'both', easing: 'ease-out'}
	);

/** Displays messages as toasts. */
const Toast = ({messages, onRemove}) => {
	const animationsRef = useRef(null);
	const enteringRef = useRef(null);
	const leavingRef = useRef(null);
	const [children, setChildren] = useState(() =>
		messages.map((m) => <ToastMessage key={m.id} message={m} onRemove={onRemove} />)
	);

	// The order of the effects is important for correct processing
	useEffect(() => {
		let animations = animationsRef.current;
		if (!animations) {
			// Build animations for initial children
			animations = animationsRef.current = {};
			for (const {key} of children) {
				const animation = createAnimation(key);
				animation.finish();
				animations[key] = animation;
			}
		}
		if (enteringRef.current) {
			// Build animations for new children
			for (const id of enteringRef.current) {
				animations[id] = createAnimation(id);
			}
			enteringRef.current = null;
		}
		if (leavingRef.current) {
			// Run animation backwards for removed children
			for (const id of leavingRef.current) {
				const animation = animations[id];
				animation.reverse();
				animation.onfinish = () => {
					delete animations[id];
					setChildren((children) => children.filter(({key}) => key !== id));
				};
			}
			leavingRef.current = null;
		}
	});

	useEffect(() => {
		setChildren((children) => {
			const newChildren = [...children];
			const allIds = Object.fromEntries(children.map(({key}) => [key, true]));
			const newIds = {};
			const entering = [];
			// Build children for new messages
			for (const m of messages) {
				const id = m.id;
				newIds[id] = true;
				if (!allIds[id]) {
					newChildren.push(<ToastMessage key={id} message={m} onRemove={onRemove} />);
					allIds[id] = true;
					entering.push(id);
				}
			}
			// Get removed messages
			const leaving = children.map(({key}) => key).filter((key) => !newIds[key]);
			if (entering.length) {
				enteringRef.current = entering;
			}
			if (leaving.length) {
				leavingRef.current = leaving;
			}
			return newChildren;
		});
	}, [messages, onRemove]);

	return (
		<div className="Toast">
			<div className="Toast__messages">{children}</div>
			{hasFatalError(messages) && <div className="Toast__backdrop" />}
		</div>
	);
};

Toast.propTypes = {
	/** Messages to display. */
	messages: PropTypes.array,
	/** Function to remove a message. */
	onRemove: PropTypes.func,
};

export default Toast;
