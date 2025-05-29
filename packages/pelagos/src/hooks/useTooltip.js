import {useCallback, useRef} from 'react';

import useTooltipBase from './useTooltipBase';

/**
 * Returns a callback ref to show a tooltip over the target element.
 * @param {string} text the tooltip text.
 * @param {'left'|'right'|'top'|'bottom'} placement the tooltip placement.
 * @param {'describedby'|'labelledby'} [aria] the aria attribute to set on the target.
 * @returns {(function(Element): void)} callback ref.
 *
 * @example
 * import {useTooltip} from '@bluecateng/pelagos';
 *
 * const Example = () => <div ref={useTooltip('Example tooltip', 'top')}>...</div>
 */
const useTooltip = (text, placement, aria) => {
	const targetRef = useRef(null);
	const [showTooltip, hide, tooltip] = useTooltipBase();

	const show = useCallback(
		() => showTooltip(text, placement, targetRef.current, aria),
		[text, placement, showTooltip, aria]
	);

	return useCallback(
		(element) => {
			const handleMouseEnter = (event) => {
				if (event.relatedTarget !== tooltip && event.relatedTarget !== targetRef.current) {
					show();
				}
			};
			const handleMouseLeave = (event) => {
				if (event.relatedTarget !== tooltip && event.relatedTarget !== targetRef.current) {
					hide();
				}
			};
			const target = targetRef.current;
			if (target) {
				tooltip.removeEventListener('mouseenter', handleMouseEnter);
				tooltip.removeEventListener('mouseleave', handleMouseLeave);
				target.removeEventListener('mouseenter', handleMouseEnter);
				target.removeEventListener('mouseleave', handleMouseLeave);
				target.removeEventListener('focus', show);
				target.removeEventListener('blur', hide);

				hide();
			}
			if (element) {
				tooltip.addEventListener('mouseenter', handleMouseEnter);
				tooltip.addEventListener('mouseleave', handleMouseLeave);
				element.addEventListener('mouseenter', handleMouseEnter);
				element.addEventListener('mouseleave', handleMouseLeave);
				element.addEventListener('focus', show);
				element.addEventListener('blur', hide);
			}
			targetRef.current = element;
		},
		[hide, show, tooltip]
	);
};

export default useTooltip;
