import {LabelLine} from '../src';

const Template = (args) => <LabelLine {...args} />;

export const Normal = Template.bind({});
Normal.args = {text: 'Normal'};

export const Optional = Template.bind({});
Optional.args = {text: 'Optional', optional: true};

export default {
	title: 'Components/LabelLine',
	component: LabelLine,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
