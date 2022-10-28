import {useCallback, useEffect, useRef} from 'react';

/**
 * Adds a "slide" animation to the specified element.
 * @param {string} id the ID of the element to animate.
 * @param {function(): void} onFinish invoked when the animation finishes.
 * @return {function(): void} function to use as event handler.
 *
 * @example
 * import {useCallback} from 'react';
 * import {useSlidingPanel} from '@bluecateng/pelagos';
 *
 * const Example = () => {
 *   const handleFinish = useCallback(() => {
 *     // handle finish
 *   });
 *   const handleCloseClick = useSlidingPanel('example', handleFinish);
 *   return <div id="example"><button onClick={handleCloseClick}>Close</button>...</div>;
 * };
 */
const useSlidingPanel = (id, onFinish) => {
	const animationRef = useRef(null);

	useEffect(() => {
		animationRef.current = document
			.getElementById(id)
			.animate([{transform: 'translateX(100%)'}, {transform: 'translateX(0)'}], {
				duration: 250,
				fill: 'both',
				easing: 'ease-out',
			});
	}, [id]);

	return useCallback(() => {
		const animation = animationRef.current;
		animation.onfinish = onFinish;
		animation.reverse();
	}, [onFinish]);
};

export default useSlidingPanel;
