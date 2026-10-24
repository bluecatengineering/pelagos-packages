import {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';

import ToastTypes from '../toasts/ToastTypes';

import ToastMessage from './ToastMessage';
import './Toast.less';

const duration = 150;

const emptyMessages = [];

const hasFatalError = (messages) => messages.some((m) => m.type === ToastTypes.FATAL);

const createAnimation = (id) =>
	document.getElementById(`toast-${id}`).animate(
		[
			{opacity: 0, transform: 'rotateX(-90deg)'},
			{opacity: 1, transform: 'none'},
		],
		{duration, fill: 'both', easing: 'ease-out'}
	);

const updateIds = (current, keep, added) => {
	const ids = new Set(current?.filter(keep));
	for (const id of added) {
		ids.add(id);
	}
	return ids.size ? [...ids] : null;
};

/** Displays messages as toasts. */
const Toast = ({messages = emptyMessages, onRemove}) => {
	const animationsRef = useRef(null);
	const enteringRef = useRef(null);
	const leavingRef = useRef(null);
	const onRemoveRef = useRef(onRemove);
	const messagesRef = useRef(messages);

	// The children keep this function, so it must always call the latest onRemove
	const handleRemove = useCallback((message) => onRemoveRef.current?.(message), []);

	const [children, setChildren] = useState(() =>
		messages.map((m) => <ToastMessage key={m.id} message={m} onRemove={handleRemove} />)
	);

	useLayoutEffect(() => {
		onRemoveRef.current = onRemove;
		messagesRef.current = messages;
	});

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
			for (const id of enteringRef.current) {
				const animation = animations[id];
				if (animation?.leaving) {
					// The message was added again while leaving, run the animation forwards again
					animation.leaving = false;
					animation.onfinish = null;
					animation.reverse();
				} else {
					// Build animations for new children
					animations[id] = createAnimation(id);
				}
			}
			enteringRef.current = null;
		}
		if (leavingRef.current) {
			// Run animation backwards for removed children
			for (const id of leavingRef.current) {
				const animation = animations[id];
				if (animation && !animation.leaving) {
					animation.leaving = true;
					animation.reverse();
					animation.onfinish = () => {
						// The message may have been added again before the effect could cancel this handler,
						// in that case the child and the animation are kept so the animation can run forwards again
						if (!messagesRef.current.some((m) => m.id === id)) {
							delete animations[id];
							setChildren((children) => children.filter(({key}) => key !== id));
						}
					};
				}
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
			// Build children for new messages, and for messages added again while leaving
			for (const m of messages) {
				const id = m.id;
				newIds[id] = true;
				if (!allIds[id]) {
					newChildren.push(<ToastMessage key={id} message={m} onRemove={handleRemove} />);
					allIds[id] = true;
					entering.push(id);
				} else if (animationsRef.current?.[id]?.leaving) {
					const index = newChildren.findIndex(({key}) => key === id);
					newChildren[index] = <ToastMessage key={id} message={m} onRemove={handleRemove} />;
					entering.push(id);
				}
			}
			// Get removed messages
			const leaving = children.map(({key}) => key).filter((key) => !newIds[key]);
			// Several updates can be processed before the effect runs, so the ids are accumulated,
			// dropping the ones that the latest messages contradict
			enteringRef.current = updateIds(enteringRef.current, (id) => newIds[id], entering);
			leavingRef.current = updateIds(leavingRef.current, (id) => !newIds[id], leaving);
			return newChildren;
		});
	}, [messages, handleRemove]);

	return (
		<div className="Toast">
			<div className="Toast__messages" aria-live="polite">
				{children}
			</div>
			{hasFatalError(messages) && <div className="Toast__backdrop" />}
		</div>
	);
};

Toast.propTypes = {
	/** Messages to display. */
	messages: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			type: PropTypes.string,
			text: PropTypes.string,
			actionText: PropTypes.string,
			onClick: PropTypes.func,
		})
	),
	/** Function to remove a message. */
	onRemove: PropTypes.func,
};

export default Toast;
