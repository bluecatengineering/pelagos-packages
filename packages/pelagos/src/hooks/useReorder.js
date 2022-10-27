import {useEffect, useRef} from 'react';
import reorder from '@bluecateng/smooth-reorder';
import {t} from '@bluecateng/l10n.macro';

import setLiveText from '../functions/setLiveText';

const removeAriaHidden = (element) => setTimeout(() => element.removeAttribute('aria-hidden'), 500);

/**
 * Returns a React ref which enables reordering child nodes using drag and drop.
 * @param {string} selector CSS selector for elements to reorder.
 * @param {string} handleSelector CSS selector for reorder handle.
 * @param {number} count the number of elements.
 * @param {function(Element): string} getElementName returns the name of the specified element.
 * @param {function(number, number): void} onChange invoked when the list is changed, the first argument is the original index of the element moved, the second is the target index.
 * @return {MutableRefObject<Element>} React ref.
 *
 * @example
 * import {useCallback} from 'react';
 * import {useReorder} from '@bluecateng/pelagos';
 *
 * const Example = ({list}) => {
 *   const getElementName = useCallback((element) => {
 *     // return name for element
 *   }, []);
 *   const onChange = useCallback((fromIndex, toIndex) => {
 *     // move item
 *   }, []);
 *   const reorder = useReorder('.Child', '.Handle', list.length, getElementName, onChange);
 *   return <ol ref={reorder}>...</ol>;
 * };
 */
const useReorder = (selector, handleSelector, count, getElementName, onChange) => {
	const reorderRef = useRef(null);
	useEffect(
		() =>
			reorder(reorderRef.current, {
				selector,
				focusSelector: selector,
				handleSelector,
				onStart: (element, position) => (
					element.setAttribute('aria-hidden', 'true'),
					setLiveText(
						t`${getElementName(element)} grabbed. Current position in list: ${
							position + 1
						} of ${count}. Press up or down arrow keys to change position, space bar to drop, Escape key to cancel.`
					)
				),
				onMove: (element, position) =>
					setLiveText(t`${getElementName(element)}. Current position in list: ${position + 1} of ${count}.`),
				onFinish: (element) => {
					const fromIndex = +element.dataset.index;
					const tmp = element.previousSibling ? +element.previousSibling.dataset.index + 1 : 0;
					const toIndex = fromIndex < tmp ? tmp - 1 : tmp;
					if (fromIndex !== tmp) {
						onChange(fromIndex, toIndex);
					}
					setLiveText(t`${getElementName(element)} dropped. Final position in list: ${toIndex + 1} of ${count}.`);
					removeAriaHidden(element);
				},
				onCancel: (element) => (
					setLiveText(t`${getElementName(element)} reorder cancelled.`), removeAriaHidden(element)
				),
			}),
		[selector, handleSelector, getElementName, onChange, count]
	);
	return reorderRef;
};

export default useReorder;
