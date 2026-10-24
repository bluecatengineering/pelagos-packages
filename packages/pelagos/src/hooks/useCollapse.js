import {useCallback, useRef} from 'react';

import animate from '../functions/animate';
import scrollIntoView from '../functions/scrollIntoView';

/**
 * Returns a React ref which collapses the element. The element must have `overflow: hidden`.
 * If the ref is merged with other refs, those must be stable (for example created with useRef or wrapped in useCallback),
 * a new ref detaches the element and stops the running animation.
 * @param {boolean} open whether the component is expanded.
 * @return {function(Element): void} React ref.
 *
 * @example
 * import {useCollapse} from '@bluecateng/pelagos';
 *
 * const Example = ({open}) => <div style={{overflow: hidden}} ref={useCollapse(open)}>...</div>;
 */
const useCollapse = (open) => {
	const prevOpenRef = useRef(null);
	const animationRef = useRef(null);
	return useCallback(
		(element) => {
			// React calls the previous ref with null when open changes and when the element is removed,
			// in both cases the running animation must stop.
			animationRef.current?.cancel();
			animationRef.current = null;
			if (element) {
				if (prevOpenRef.current === null) {
					if (!open) {
						element.style.display = 'none';
					}
				} else if (open !== prevOpenRef.current) {
					// Start from the current height, the element may be in the middle of the previous animation
					if (open) {
						const start = element.style.display === 'none' ? 0 : element.offsetHeight;
						element.style.display = '';
						const end = element.scrollHeight;
						animationRef.current = animate(
							150,
							(current) => (element.style.height = `${start + (end - start) * current}px`),
							() =>
								scrollIntoView(element.parentNode, {
									smooth: true,
									done: () => (prevOpenRef.current ? (element.style.height = '') : null),
								})
						);
					} else {
						const start = element.offsetHeight;
						animationRef.current = animate(
							150,
							(current) => (element.style.height = `${start * (1 - current)}px`),
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

export default useCollapse;
