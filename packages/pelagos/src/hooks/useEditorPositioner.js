import {useEffect} from 'react';

/**
 * Adds an effect which positions an editor.
 * @param {{current: Element}} ref React reference to the editor.
 * @param {string} buttonId the ID of the editor trigger button.
 * @param {string} trackId the ID of the track element.
 */
export default (ref, buttonId, trackId) =>
	useEffect(() => {
		const editor = ref.current;
		const button = document.getElementById(buttonId);
		const {bottom, left, right} = button.getBoundingClientRect();
		const innerWidth = window.innerWidth;

		editor.style.display = '';
		editor.style.top = `${bottom}px`;

		if (!trackId) {
			if (left > innerWidth / 2) {
				editor.style.right = `${innerWidth - right}px`;
			} else {
				editor.style.left = `${left}px`;
			}
		} else {
			const track = document.getElementById(trackId).getBoundingClientRect();
			if (left > innerWidth / 2) {
				editor.style.right = `${innerWidth - Math.min(track.right, right)}px`;
			} else {
				editor.style.left = `${Math.max(left, track.left)}px`;
			}
		}
	}, [ref, buttonId, trackId]);
