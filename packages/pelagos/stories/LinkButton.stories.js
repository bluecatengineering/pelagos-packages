import {LinkButton} from '../src';

export default {
	title: 'Components/LinkButton',
	component: LinkButton,
};

export const Primary = {
	args: {href: '#', text: 'Primary', type: 'primary'},
};

export const Secondary = {
	args: {href: '#', text: 'Secondary', type: 'secondary'},
};

export const Tertiary = {
	args: {href: '#', text: 'Tertiary', type: 'tertiary'},
};

export const Ghost = {
	args: {href: '#', text: 'Ghost', type: 'ghost'},
};

export const Disabled = {
	args: {href: '#', text: 'Disabled', disabled: true},
};
