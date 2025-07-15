import {createFocusTrap} from 'focus-trap';

export default (popUp, button, {initialFocus, onDeactivate}) => {
	let outsideClick = false;
	const trap = createFocusTrap(popUp, {
		initialFocus,
		setReturnFocus: () => (outsideClick ? (outsideClick = false) : button),
		allowOutsideClick: (event) => {
			const buttonClicked = button.contains(event.target);
			if (event.type === 'click') {
				trap.deactivate();
				outsideClick = !buttonClicked;
			}
			return !buttonClicked;
		},
		onDeactivate,
	});
	return trap;
};
