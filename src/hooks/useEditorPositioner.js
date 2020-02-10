import {useEffect} from 'react';

export default (ref, buttonId, trackId) =>
	useEffect(() => {
		const editor = ref.current;
		const button = document.getElementById(buttonId);
		const {bottom, left, right} = button.getBoundingClientRect();

		editor.style.display = '';
		editor.style.top = bottom + 1 + 'px';

		if (!trackId) {
			editor.style.left = left + 'px';
		} else {
			const innerWidth = window.innerWidth;
			const track = document.getElementById(trackId).getBoundingClientRect();
			if (left > innerWidth / 2) {
				editor.style.right = innerWidth - Math.min(track.right, right) + 'px';
			} else {
				editor.style.left = Math.max(left, track.left) + 'px';
			}
		}
	}, [ref, buttonId, trackId]);
