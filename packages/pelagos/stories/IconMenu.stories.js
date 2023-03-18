import {action} from '@storybook/addon-actions';
import {faCat} from '@fortawesome/free-solid-svg-icons';

import {IconMenu, IconMenuItem} from '../src';

const handleClick = action('onClick');

export default {
	title: 'Components/IconMenu',
	component: IconMenu,
	subcomponents: {IconMenuItem},
};

export const Default = {
	args: {
		icon: faCat,
		arrow: true,
		'aria-label': 'Cat actions',
		children: [
			<IconMenuItem key="1" text="Action 1" onClick={handleClick} />,
			<IconMenuItem key="2" text="Action 2" onClick={handleClick} />,
			<IconMenuItem key="3" text="Action 3" disabled onClick={handleClick} />,
			<IconMenuItem key="4" text="Action 4" hasDivider onClick={handleClick} />,
		],
	},
};
