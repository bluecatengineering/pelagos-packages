import {action} from '@storybook/addon-actions';
import {faCat} from '@fortawesome/free-solid-svg-icons';

import WithLayers from '../../templates/WithLayers';
import MenuItem from '../menu/MenuItem';

import IconMenu from './IconMenu';

const handleClick = action('onClick');

export default {
	title: 'Components/IconMenu',
	component: IconMenu,
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
export const Default = {args: {icon: faCat, arrow: true, 'aria-label': 'Cat actions', children}};

export const _WithLayers = {
	render: () => (
		<WithLayers>
			{() => (
				<IconMenu icon={faCat} arrow aria-label="Cat actions">
					{children}
				</IconMenu>
			)}
		</WithLayers>
	),
	parameters: {
		controls: {hideNoControlsWarning: true},
	},
};
