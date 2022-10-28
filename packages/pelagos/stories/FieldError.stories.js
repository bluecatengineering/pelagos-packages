import {FieldError} from '../src';

const Template = (args) => <FieldError {...args} />;

export const Normal = Template.bind({});
Normal.args = {text: 'Error message'};

export default {
	title: 'Components/FieldError',
	component: FieldError,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
