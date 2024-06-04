/**
 * Starts a move animation on the specified element.
 * @param {Element} element the element to animate.
 * @param {DOMRectReadOnly} rect the rectangle of the target position.
 *
 * @example
 * import {moveEffect} from '@bluecateng/pelagos';
 *
 * const Example = () => {
 *   const handleClick = useCallback(() => {
 *     const element = document.getElementById('test');
 *     const rect = document.getElementById('other').getBoundingClientRect();
 *     moveEffect(element, rect);
 *   }, []);
 *   return <button onClick={handleClick}>...</button>;
 * }
 */
const moveEffect = (element, rect) => {
	const r1 = element.getBoundingClientRect();
	const dx = rect.left - r1.left;
	const dy = rect.top - r1.top;
	const clone = element.cloneNode(true);
	clone.style.left = `${r1.left}px`;
	clone.style.top = `${r1.top}px`;
	clone.style.width = `${r1.width}px`;
	clone.style.height = `${r1.height}px`;
	clone.classList.add('clone');
	document.body.appendChild(clone);
	element.style.opacity = '0';
	clone
		.animate({transform: [`translate(${dx}px,${dy}px)`, 'translate(0,0)']}, {duration: 250, easing: 'ease-out'})
		.finished.then(() => (document.body.removeChild(clone), (element.style.opacity = '')));
};

export default moveEffect;
