import {action} from '@storybook/addon-actions';

import WithLayers from '../../templates/WithLayers';

import ButtonMenu from './ButtonMenu';
import MenuItem from './MenuItem';

const handleClick = action('onClick');

export default {
	title: 'Components/ButtonMenu',
	component: ButtonMenu,
	subcomponents: {MenuItem},
};

const children = [
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
];

export const Default = {args: {text: 'Actions', children}};

export const _WithLayers = {
	render: () => <WithLayers align="start">{() => <ButtonMenu text="Actions">{children}</ButtonMenu>}</WithLayers>,
	parameters: {
		controls: {hideNoControlsWarning: true},
	},
};
