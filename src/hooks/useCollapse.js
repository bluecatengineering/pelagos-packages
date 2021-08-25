import {useCallback, useRef} from 'react';
import {scrollIntoView} from '@bluecat/helpers';

/**
 * Returns a React ref which collapses the element. The element must have overflow: hidden.
 * @param {boolean} open whether the component is expanded.
 * @return {function(*=): void} React ref.
 */
export default (open) => {
	const prevOpenRef = useRef(null);
	return useCallback(
		(element) => {
			if (element) {
				if (prevOpenRef.current === null) {
					if (!open) {
						element.style.display = 'none';
					}
				} else if (open !== prevOpenRef.current) {
					if (open) {
						element.style.display = '';
					}
					const animation = element.animate([{height: '0'}, {height: `${element.scrollHeight}px`}], {
						duration: 250,
						fill: 'both',
						easing: 'ease-out',
						direction: open ? 'normal' : 'reverse',
					});
					animation.onfinish = () => {
						if (prevOpenRef.current) {
							scrollIntoView(element.parentNode, {smooth: true});
						} else {
							element.style.display = 'none';
						}
					};
				}
				prevOpenRef.current = open;
			}
		},
		[open]
	);
};
