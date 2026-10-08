import {useEffect, useRef} from 'react';
import reorder from '@bluecateng/smooth-reorder';
import {t} from '@bluecateng/l10n.macro';

const removeAriaHidden = (element) => setTimeout(() => element.removeAttribute('aria-hidden'), 500);

const setLiveText = (ref, text) => (ref.current.textContent = text);

/**
 * Returns two React refs which enable reordering child nodes using drag and drop.
 * The element `reorderRef` is attached to can change between renders (e.g. an empty state replaced by the list),
 * the handlers follow it.
 * @param {string} selector CSS selector for elements to reorder.
 * @param {(string|{handle:string,focus:string})} handleSelector CSS selector for reorder handle or selectors for the handle and focus elements.
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
	// callbacks read the latest values at call time so a change in the list does not require re-initializing
	const latestRef = useRef(null);
	latestRef.current = {count, getElementName, onChange};
	const boundRef = useRef(null);
	const handle = typeof handleSelector === 'string' ? handleSelector : handleSelector.handle;
	const focus = typeof handleSelector === 'string' ? selector : handleSelector.focus;

	// runs after every render: the container element can be replaced (e.g. an empty state swapped for the list),
	// so the handlers are bound again whenever the element behind reorderRef or the selectors change
	useEffect(() => {
		const element = reorderRef.current;
		const bound = boundRef.current;
		if (
			bound &&
			bound.element === element &&
			bound.selector === selector &&
			bound.handle === handle &&
			bound.focus === focus
		) {
			return;
		}
		bound?.dispose();
		if (!element) {
			boundRef.current = null;
			return;
		}
		let describeId;
		const dispose = reorder(element, {
			selector,
			handleSelector: handle,
			focusSelector: focus,
			onStart: (element, position) => {
				const {count, getElementName} = latestRef.current;
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
			onMoveEnd: (element, position) => {
				const {count, getElementName} = latestRef.current;
				setLiveText(liveRef, t`${getElementName(element)}. Current position in list: ${position + 1} of ${count}.`);
			},
			onFinish: (element) => {
				const {count, getElementName, onChange} = latestRef.current;
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
				const {getElementName} = latestRef.current;
				setLiveText(liveRef, t`${getElementName(element)} reorder cancelled.`);
				if (describeId) {
					element.setAttribute('aria-describedby', describeId);
					describeId = null;
				}
				removeAriaHidden(element);
			},
		});
		boundRef.current = {element, selector, handle, focus, dispose};
	});
	useEffect(
		() => () => {
			boundRef.current?.dispose();
			boundRef.current = null;
		},
		[]
	);
	return [reorderRef, liveRef];
};

export default useReorder;
