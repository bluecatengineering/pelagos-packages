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
	const [showTooltip, hide] = useTooltipBase();

	const show = useCallback(
		() => showTooltip(text, placement, targetRef.current, aria),
		[text, placement, showTooltip, aria]
	);

	return useCallback(
		(element) => {
			const handleKeyDown = (event) => {
				if (event.key === 'Escape') hide();
			};
			const target = targetRef.current;
			if (target) {
				target.removeEventListener('mouseenter', show);
				target.removeEventListener('mouseleave', hide);
				target.removeEventListener('focus', show);
				target.removeEventListener('blur', hide);
				target.removeEventListener('keydown', handleKeyDown);

				hide();
			}
			if (element) {
				element.addEventListener('mouseenter', show);
				element.addEventListener('mouseleave', hide);
				element.addEventListener('focus', show);
				element.addEventListener('blur', hide);
				element.addEventListener('keydown', handleKeyDown);
			}
			targetRef.current = element;
		},
		[hide, show, targetRef]
	);
};

export default useTooltip;
