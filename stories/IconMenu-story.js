import {faCat} from '@fortawesome/free-solid-svg-icons';

import {IconMenu, IconMenuItem} from '../src';

const Template = (args) => <IconMenu {...args} />;

export const Default = Template.bind({});
Default.args = {
	icon: faCat,
	'aria-label': 'Select an option',
	children: [
		<IconMenuItem key="1" text="First option" />,
		<IconMenuItem key="2" text="Second option" />,
		<IconMenuItem key="3" text="Third option" disabled />,
		<IconMenuItem key="4" text="Fourth option" hasDivider />,
	],
};

export default {
	title: 'Components/IconMenu',
	component: IconMenu,
	subcomponents: {IconMenuItem},
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
