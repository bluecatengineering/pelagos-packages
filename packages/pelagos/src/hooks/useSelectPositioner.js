import {useLayoutEffect} from 'react';

const {max} = Math;

/**
 * Returns an effect which positions the pop-up for a select box.
 * @param {boolean} open whether the pop-up is open.
 * @param {MutableRefObject<Element>} boxRef React ref to the select box.
 * @param {MutableRefObject<Element>} popUpRef React ref to the pop-up box.
 * @param {Object} options the positioning options.
 * @param {boolean} [options.changePopUpWidth] whether the width should be set, default: true.
 *
 * @example
 * import {useRef, useState} from 'react';
 * import {useSelectPositioner} from '@bluecateng/pelagos';
 *
 * const Example = () => {
 *   const boxRef = useRef(null);
 *   const popUpRef = useRef(null);
 *   const [open, setOpen] = useState(false);
 *   useSelectPositioner(open, boxRef, popUpRef);
 * }
 */
const useSelectPositioner = (open, boxRef, popUpRef, {changePopUpWidth} = {changePopUpWidth: true}) =>
	useLayoutEffect(() => {
		const button = boxRef.current;
		const popUp = popUpRef.current;
		const setPosition = () => {
			const {height: popUpHeight} = popUp.getBoundingClientRect();
			const {top, bottom, left, width} = button.getBoundingClientRect();
			popUp.style.top = `${bottom + popUpHeight + 8 < innerHeight ? bottom : max(0, top - popUpHeight)}px`;
			popUp.style.left = `${left}px`;
			if (changePopUpWidth) {
				popUp.style.width = `${width}px`;
			}
		};

		if (open) {
			setPosition(button, popUp);
			document.addEventListener('scroll', setPosition, {passive: true, capture: true});
			window.addEventListener('resize', setPosition, {passive: true, capture: true});
		}

		return () => {
			document.removeEventListener('scroll', setPosition, {passive: true, capture: true});
			window.removeEventListener('resize', setPosition, {passive: true, capture: true});
		};
	}, [boxRef, popUpRef, open, changePopUpWidth]);

export default useSelectPositioner;
