import {action} from '@storybook/addon-actions';

import {Menu, MenuItem} from '../src';

const handleClick = action('onClick');

export default {
	title: 'Components/Menu',
	component: Menu,
	subcomponents: {MenuItem},
};

export const Default = {
	args: {
		children: [
			<MenuItem key="1" onClick={handleClick}>
				Option 1
			</MenuItem>,
			<MenuItem key="2" onClick={handleClick}>
				Option 2
			</MenuItem>,
			<MenuItem key="3" disabled onClick={handleClick}>
				Option 3
			</MenuItem>,
			<MenuItem key="4" hasDivider onClick={handleClick}>
				Option 4
			</MenuItem>,
		],
	},
};
