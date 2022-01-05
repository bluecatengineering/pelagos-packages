import {faCat} from '@fortawesome/free-solid-svg-icons';

import {LabeledIcon} from '../src';

const Template = (args) => <LabeledIcon {...args} />;

export const Normal = Template.bind({});
Normal.args = {icon: faCat, label: 'Normal'};

export default {
	title: 'Components/LabeledIcon',
	component: LabeledIcon,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
