import {useCallback, useRef} from 'react';

import useTooltipBase from './useTooltipBase';

export default (text, placement) => {
	const targetRef = useRef(null);
	const [showTooltip, hide] = useTooltipBase();

	const show = useCallback(() => showTooltip(text, placement, targetRef.current), [text, placement, showTooltip]);

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
