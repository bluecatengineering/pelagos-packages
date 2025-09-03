import {action} from 'storybook/actions';
import Model from '@carbon/icons-react/es/Model';

import WithLayers from '../../templates/WithLayers';
import MenuItem from '../menu/MenuItem';
import MenuItemDivider from '../menu/MenuItemDivider';

import IconMenu from './IconMenu';

const handleClick = action('onClick');

export default {
	title: 'Components/IconMenu',
	component: IconMenu,
};

const children = [
	<MenuItem key="1" text="Option 1" onClick={handleClick} />,
	<MenuItem key="2" text="Option 2" onClick={handleClick} />,
	<MenuItem key="3" text="Option 3" disabled onClick={handleClick} />,
	<MenuItemDivider key="d" />,
	<MenuItem key="4" text="Option 4" type="danger" onClick={handleClick} />,
];
export const Default = {args: {'aria-label': 'Actions', children}};

export const WithCustomIcon = {args: {icon: Model, arrow: true, 'aria-label': 'Actions', children}};

export const _WithLayers = {
	render: () => <WithLayers>{() => <IconMenu aria-label="Actions">{children}</IconMenu>}</WithLayers>,
	parameters: {
		controls: {hideNoControlsWarning: true},
	},
};
