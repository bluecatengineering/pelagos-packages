/**
 * Animation using spring simulation.
 *
 * The animation ends when the position is within 0.001 of 1 and the velocity is close to 0,
 * therefore both parameters must be greater than 0, otherwise the animation will never end.
 * The time between frames is limited to 1/30 s to keep the simulation stable.
 * @param stiffness - spring stiffness, in kg / s^2, must be greater than 0.
 * @param damping - spring damping, in kg / s, must be greater than 0.
 * @param step - function called on each step, the argument is a number between 0 and 1,
 * values can go outside this range if the spring is underdamped.
 * @param done - function called at the end of the animation, not called if the animation is cancelled.
 * @return function to cancel the animation, no more calls to step or done are made after it is called.
 */
export default function spring(
	stiffness: number,
	damping: number,
	step: (p: number) => void,
	done?: () => void
): () => void;
