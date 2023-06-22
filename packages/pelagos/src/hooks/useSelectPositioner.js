import {useLayoutEffect} from 'react';

const {max} = Math;

/** @private */
export default (open, buttonRef, popUpRef) =>
	useLayoutEffect(() => {
		const button = buttonRef.current;
		const popUp = popUpRef.current;
		const setPosition = () => {
			const {height: popUpHeight} = popUp.getBoundingClientRect();
			const {top, bottom, left, width} = button.getBoundingClientRect();
			popUp.style.top = `${bottom + popUpHeight + 8 < innerHeight ? bottom : max(0, top - popUpHeight)}px`;
			popUp.style.left = `${left}px`;
			popUp.style.width = `${width}px`;
		};

		if (open) {
			setPosition(button, popUp);
			document.addEventListener('scroll', setPosition, {passive: true, capture: true});
		}

		return () => {
			document.removeEventListener('scroll', setPosition, {passive: true, capture: true});
		};
	}, [buttonRef, popUpRef, open]);
