import {faCat} from '@fortawesome/free-solid-svg-icons';

import {HeaderIcon} from '../src';

const Template = (args) => <HeaderIcon {...args} />;

export const Normal = Template.bind({});
Normal.args = {icon: faCat, label: 'Normal'};

export default {
	title: 'Components/HeaderIcon',
	component: HeaderIcon,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
