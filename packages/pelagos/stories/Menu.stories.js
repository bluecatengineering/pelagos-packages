import {Menu, MenuItem} from '../src';

export const Default = (args) => (
	<Menu {...args}>
		<MenuItem>Option 1</MenuItem>
		<MenuItem>Option 2</MenuItem>
	</Menu>
);
Default.args = {};

export default {
	title: 'Components/Menu',
	component: Menu,
	subcomponents: {MenuItem},
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
