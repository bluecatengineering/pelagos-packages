import {useCallback} from 'react';

const {max} = Math;

/**
 * Returns a callback which positions a menu. Typically used with `useMenuHandler`.
 * @param {boolean} flipped whether the menu alignment should be flipped.
 *
 * @example
 * import {useRef} from 'react';
 * import {useMenuPositioner} from '@bluecateng/pelagos';
 *
 * const Example = () => {
 *   const editorRef = useRef(null);
 *   const setPopUpPosition = useMenuPositioner();
 *   const {...} = useMenuHandler(setPopUpPosition);
 * }
 */
const useMenuPositioner = (flipped) =>
	useCallback(
		(button, menu) => {
			const {top, bottom, left, right} = button.getBoundingClientRect();

			const popUp = menu.parentNode;
			const {width: menuWidth, height: menuHeight} = popUp.getBoundingClientRect();
			const scrollTop = document.scrollingElement.scrollTop;
			popUp.style.top = `${(bottom + menuHeight < innerHeight ? bottom : max(0, top - menuHeight)) + scrollTop}px`;
			popUp.style.left = flipped ? `${right - menuWidth}px` : `${left}px`;
		},
		[flipped]
	);

export default useMenuPositioner;
