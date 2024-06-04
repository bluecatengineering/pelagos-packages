/**
 * Starts a slide down animation on the specified element.
 * @param {Element} element the element to animate.
 *
 * @example
 * import {slideDownEffect} from '@bluecateng/pelagos';
 *
 * const Example = () => {
 *   const handleClick = useCallback(() => {
 *     const element = document.getElementById('test');
 *     slideDownEffect(element);
 *   }, []);
 *   return <button onClick={handleClick}>...</button>;
 * }
 */
const slideDownEffect = (element) => {
	const height = element.offsetHeight;
	while (element) {
		element.animate({transform: [`translateY(-${height}px)`, 'translateY(0)']}, 250);
		element = element.nextSibling;
	}
};

export default slideDownEffect;
