import {faCat} from '@fortawesome/free-solid-svg-icons';

import {IconMenu, IconMenuItem} from '../src';

// eslint-disable-next-line no-console
const handleClick = (event) => console.log(event.target);

const Template = (args) => <IconMenu {...args} />;

export const Default = Template.bind({});
Default.args = {
	icon: faCat,
	arrow: true,
	'aria-label': 'Cat actions',
	children: [
		<IconMenuItem key="1" text="Action 1" onClick={handleClick} />,
		<IconMenuItem key="2" text="Action 2" onClick={handleClick} />,
		<IconMenuItem key="3" text="Action 3" disabled onClick={handleClick} />,
		<IconMenuItem key="4" text="Action 4" hasDivider onClick={handleClick} />,
	],
};

export default {
	title: 'Components/IconMenu',
	component: IconMenu,
	subcomponents: {IconMenuItem},
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
