import {Menu, MenuItem} from '../src';

export default {
	title: 'Components/Menu',
	component: Menu,
	subcomponents: {MenuItem},
};

export const Default = {
	args: {children: [<MenuItem key="0">Option 1</MenuItem>, <MenuItem key="1">Option 2</MenuItem>]},
};
