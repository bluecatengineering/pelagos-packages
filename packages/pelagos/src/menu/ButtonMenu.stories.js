import {action} from 'storybook/actions';

import WithLayers from '../../templates/WithLayers';

import ButtonMenu from './ButtonMenu';
import MenuItem from './MenuItem';
import MenuItemDivider from './MenuItemDivider';

const handleClick = action('onClick');

export default {
	title: 'Components/ButtonMenu',
	component: ButtonMenu,
};

const children = [
	<MenuItem key="1" text="Option 1" onClick={handleClick} />,
	<MenuItem key="2" text="Option 2" onClick={handleClick} />,
	<MenuItem key="3" text="Option 3" disabled onClick={handleClick} />,
	<MenuItem key="4" text="Option 4" onClick={handleClick} />,
	<MenuItem key="5" text="Option 5" onClick={handleClick} />,
	<MenuItem key="6" text="Option 6" onClick={handleClick} />,
	<MenuItem key="7" text="Option 7" onClick={handleClick} />,
	<MenuItem key="8" text="Option 8" onClick={handleClick} />,
	<MenuItemDivider key="d1" />,
	<MenuItem key="9" text="Danger option" type="danger" onClick={handleClick} />,
];

export const Default = {args: {text: 'Actions', children}};

export const _WithLayers = {
	render: () => <WithLayers align="start">{() => <ButtonMenu text="Actions">{children}</ButtonMenu>}</WithLayers>,
	parameters: {
		controls: {hideNoControlsWarning: true},
	},
};
