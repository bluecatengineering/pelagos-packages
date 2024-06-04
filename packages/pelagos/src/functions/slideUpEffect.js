/**
 * Starts a slide up animation on the specified element.
 * @param {Element} element the element to animate.
 *
 * @example
 * import {slideUpEffect} from '@bluecateng/pelagos';
 *
 * const Example = () => {
 *   const handleClick = useCallback(() => {
 *     const element = document.getElementById('test');
 *     slideUpEffect(element);
 *   }, []);
 *   return <button onClick={handleClick}>...</button>;
 * }
 */
const slideUpEffect = (element) => {
	const height = element.offsetHeight;
	while (element) {
		element.animate({transform: [`translateY(${height}px)`, 'translateY(0)']}, 250);
		element = element.nextSibling;
	}
};

export default slideUpEffect;
