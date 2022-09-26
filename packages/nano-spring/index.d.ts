/**
 * Animation using spring simulation.
 * @param stiffness - spring stiffness, in kg / s^2.
 * @param damping - spring damping, in kg / s.
 * @param step - function called on each step, the argument is a number between 0 and 1.
 * @param done - function called at the end of the animation.
 * @return function to cancel the animation.
 */
export default function spring(stiffness: number, damping: number, step: (p: number)=>void, done?: ()=>void): ()=>void;
