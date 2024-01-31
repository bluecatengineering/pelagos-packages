import Hamburger from './Hamburger';

export default {
	title: 'Components/Hamburger',
	component: Hamburger,
};

export const Default = {args: {'aria-label': 'Hamburger default'}};

export const Active = {args: {active: true, 'aria-label': 'Hamburger active'}};
