import {useCallback, useRef} from 'react';
import {animate, scrollIntoView} from '@bluecat/helpers';

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
						const h = element.scrollHeight;
						animate(
							150,
							(current) => (element.style.height = `${h * current}px`),
							() => scrollIntoView(element.parentNode, {smooth: true, done: () => (element.style.height = '')})
						);
					} else {
						const h = element.scrollHeight;
						animate(
							150,
							(current) => (element.style.height = `${h * (1 - current)}px`),
							() => ((element.style.height = '0'), (element.style.display = 'none'))
						);
					}
				}
				prevOpenRef.current = open;
			}
		},
		[open]
	);
};
