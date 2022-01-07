import {FieldHelper} from '../src';

const Template = (args) => <FieldHelper {...args} />;

export const Normal = Template.bind({});
Normal.args = {text: 'Helper text'};

export default {
	title: 'Components/FieldHelper',
	component: FieldHelper,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
