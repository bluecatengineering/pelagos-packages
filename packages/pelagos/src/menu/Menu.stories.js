import {action} from 'storybook/actions';

import Menu from './Menu';
import MenuItem from './MenuItem';
import MenuItemDivider from './MenuItemDivider';

const handleClick = action('onClick');

export default {
	title: 'Components/Menu',
	component: Menu,
};

export const Default = {
	args: {
		children: [
			<MenuItem key="1" text="Option 1" onClick={handleClick} />,
			<MenuItem key="2" text="Option 2" onClick={handleClick} />,
			<MenuItem key="3" text="Option 3" disabled onClick={handleClick} />,
			<MenuItemDivider key="d1" />,
			<MenuItem key="4" text="Danger option" type="danger" onClick={handleClick} />,
		],
	},
};
