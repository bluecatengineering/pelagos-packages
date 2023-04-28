import {useCallback} from 'react';

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
export default (flipped) =>
	useCallback(
		(button, menu) => {
			const {top, bottom, left, right} = button.getBoundingClientRect();

			const popUp = menu.parentNode;
			const {width: menuWidth, height: menuHeight} = popUp.getBoundingClientRect();
			const scrollTop = document.scrollingElement.scrollTop;
			popUp.style.top = `${
				(bottom + menuHeight < innerHeight ? bottom : top - menuHeight >= 0 ? top - menuHeight : 0) + scrollTop
			}px`;
			popUp.style.left = flipped ? `${right - menuWidth}px` : `${left}px`;
		},
		[flipped]
	);
