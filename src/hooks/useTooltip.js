import {useCallback, useMemo, useRef} from 'react';

import './Tooltip.less';

const getOffset = (position, size, windowSize) =>
	position < 0 ? -position : position + size > windowSize ? windowSize - position - size : 0;

const updatePosition = (target, tooltip, placement) => {
	const {left, top, width, height} = target.getBoundingClientRect();
	const {width: childWidth, height: childHeight} = tooltip.getBoundingClientRect();

	let tooltipLeft, tooltipTop, arrowLeft, arrowTop;
	if (placement === 'left' || placement === 'right') {
		tooltipTop = top + (height - childHeight) / 2;
		tooltipLeft = left + (placement === 'left' ? -childWidth : width);
		const offset = getOffset(tooltipTop, childHeight, window.innerHeight);
		tooltipTop += offset;
		arrowTop = 50 * (1 - (2 * offset) / childHeight) + '%';
	} else {
		tooltipLeft = left + (width - childWidth) / 2;
		tooltipTop = top + (placement === 'top' ? -childHeight : height);
		const offset = getOffset(tooltipLeft, childWidth, window.innerWidth);
		tooltipLeft += offset;
		arrowLeft = 50 * (1 - (2 * offset) / childWidth) + '%';
	}

	tooltip.style.left = tooltipLeft + 'px';
	tooltip.style.top = tooltipTop + 'px';

	const arrow = tooltip.lastChild;
	arrow.style.left = arrowLeft;
	arrow.style.top = arrowTop;
};

const createTooltip = (text, placement) => {
	const tooltip = document.createElement('div');
	tooltip.id = 'tooltip';
	tooltip.className = 'Tooltip Tooltip--' + placement;

	const body = document.createElement('div');
	body.className = 'Tooltip__body';
	body.textContent = text;
	tooltip.appendChild(body);

	const arrow = document.createElement('div');
	arrow.className = 'Tooltip__arrow';
	tooltip.appendChild(arrow);

	const animation = tooltip.animate([{opacity: 0}, {opacity: 1}], {duration: 150, fill: 'both', easing: 'ease-out'});
	animation.onfinish = ({currentTime}) => {
		if (currentTime === 0) {
			document.body.removeChild(tooltip);
		}
	};
	animation.pause();

	return [tooltip, animation];
};

export default (text, placement) => {
	const targetRef = useRef(null);
	const [tooltip, animation] = useMemo(() => createTooltip(text, placement), [text, placement]);
	const show = useCallback(() => {
		if (text) {
			document.body.appendChild(tooltip);
			animation.pause();
			animation.playbackRate = 1;
			animation.play();

			const target = targetRef.current;
			target.setAttribute('aria-describedby', 'tooltip');
			updatePosition(target, tooltip, placement);
		}
	}, [text, placement, tooltip, animation]);
	const hide = useCallback(() => {
		if (tooltip.parentNode) {
			targetRef.current.removeAttribute('aria-describedby');
			animation.pause();
			animation.playbackRate = -1;
			animation.play();
		}
	}, [tooltip, animation]);

	return useCallback(
		(element) => {
			const target = targetRef.current;
			if (target) {
				target.removeEventListener('mouseenter', show);
				target.removeEventListener('mouseleave', hide);
				target.removeEventListener('focus', show);
				target.removeEventListener('blur', hide);

				hide();
			}
			if (element) {
				element.addEventListener('mouseenter', show);
				element.addEventListener('mouseleave', hide);
				element.addEventListener('focus', show);
				element.addEventListener('blur', hide);
			}
			targetRef.current = element;
		},
		[hide, show, targetRef]
	);
};
