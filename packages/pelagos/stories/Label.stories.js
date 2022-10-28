import {Label} from '../src';

const Template = (args) => <Label {...args} />;

export const Normal = Template.bind({});
Normal.args = {text: 'Normal'};

export default {
	title: 'Components/Label',
	component: Label,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
