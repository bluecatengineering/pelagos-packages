import {useLayoutEffect} from 'react';

import createPopUpTrap from '../functions/createPopUpTrap';

const {max} = Math;

/**
 * Adds an effect which positions an editor in a filter area.
 * @param {MutableRefObject<Element>} ref React reference to the editor.
 * @param {string} buttonId the ID of the editor trigger button.
 * @param {function(): void} onClose function invoked when the editor is closed.
 *
 * @example
 * import {useRef} from 'react';
 * import {useAreaEditorPositioner} from '@bluecateng/pelagos';
 *
 * const Example = (onClose) => {
 *   const editorRef = useRef(null);
 *   useAreaEditorPositioner(editorRef, 'button', onClose);
 *   return <div ref={editorRef}>...</div>;
 * }
 */
const useAreaEditorPositioner = (ref, buttonId, onClose) =>
	useLayoutEffect(() => {
		const editor = ref.current;
		const button = document.getElementById(buttonId);
		const {width: editorWidth, height: editorHeight} = editor.getBoundingClientRect();

		const setEditorPosition = () => {
			const {top, bottom, left, right} = button.getBoundingClientRect();

			editor.style.top = `${bottom + editorHeight + 8 < innerHeight ? bottom : max(0, top - editorHeight)}px`;
			editor.style.left = `${left > innerWidth / 2 ? right - editorWidth : left}px`;
		};

		setEditorPosition();
		button.setAttribute('aria-expanded', 'true');
		button.setAttribute('aria-controls', editor.id);

		document.addEventListener('scroll', setEditorPosition, {passive: true, capture: true});
		window.addEventListener('resize', setEditorPosition, {passive: true, capture: true});
		const trap = createPopUpTrap(editor, button, {onDeactivate: onClose});
		trap.activate();

		return () => {
			button.removeAttribute('aria-expanded');
			button.removeAttribute('aria-controls');
			document.removeEventListener('scroll', setEditorPosition, {passive: true, capture: true});
			window.removeEventListener('resize', setEditorPosition, {passive: true, capture: true});
			trap.deactivate();
		};
	}, [ref, buttonId, onClose]);

export default useAreaEditorPositioner;
