import {useEffect, useRef} from 'react';
import reorder from '@bluecateng/smooth-reorder';
import {t} from '@bluecateng/l10n.macro';

const removeAriaHidden = (element) => setTimeout(() => element.removeAttribute('aria-hidden'), 500);

const setLiveText = (ref, text) => (ref.current.textContent = text);

/**
 * Returns two React refs which enable reordering child nodes using drag and drop.
 * @param {string} selector CSS selector for elements to reorder.
 * @param {string} handleSelector CSS selector for reorder handle.
 * @param {number} count the number of elements.
 * @param {function(Element): string} getElementName returns the name of the specified element.
 * @param {function(number, number): void} onChange invoked when the list is changed, the first argument is the original index of the element moved, the second is the target index.
 * @return {Array<MutableRefObject<Element>>} reorderRef and liveRef.
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
 *   const [reorderRef, liveRef] = useReorder('.Child', '.Handle', list.length, getElementName, onChange);
 *   return (
 *     <div>
 *       <div className="sr-only" aria-live="polite" ref={liveRef} />
 *       <ol ref={reorderRef}>...</ol>
 *     </div>
 *   );
 * };
 */
const useReorder = (selector, handleSelector, count, getElementName, onChange) => {
	const reorderRef = useRef(null);
	const liveRef = useRef(null);
	useEffect(() => {
		let describeId;
		return reorder(reorderRef.current, {
			selector,
			focusSelector: selector,
			handleSelector,
			onStart: (element, position) => {
				describeId = element.getAttribute('aria-describedby');
				element.removeAttribute('aria-describedby');
				element.setAttribute('aria-hidden', 'true');
				setLiveText(
					liveRef,
					t`${getElementName(element)} grabbed. Current position in list: ${
						position + 1
					} of ${count}. Press up or down arrow keys to change position, space bar to drop, Escape key to cancel.`
				);
			},
			onMove: (element, position) =>
				setTimeout(
					() =>
						setLiveText(liveRef, t`${getElementName(element)}. Current position in list: ${position + 1} of ${count}.`),
					150
				),
			onFinish: (element) => {
				const fromIndex = +element.dataset.index;
				const tmp = element.previousSibling ? +element.previousSibling.dataset.index + 1 : 0;
				const toIndex = fromIndex < tmp ? tmp - 1 : tmp;
				if (fromIndex !== tmp) {
					onChange(fromIndex, toIndex);
				}
				setLiveText(
					liveRef,
					t`${getElementName(element)} dropped. Final position in list: ${toIndex + 1} of ${count}.`
				);
				if (describeId) {
					element.setAttribute('aria-describedby', describeId);
					describeId = null;
				}
				removeAriaHidden(element);
			},
			onCancel: (element) => {
				setLiveText(liveRef, t`${getElementName(element)} reorder cancelled.`);
				if (describeId) {
					element.setAttribute('aria-describedby', describeId);
					describeId = null;
				}
				removeAriaHidden(element);
			},
		});
	}, [selector, handleSelector, getElementName, onChange, count]);
	return [reorderRef, liveRef];
};

export default useReorder;
