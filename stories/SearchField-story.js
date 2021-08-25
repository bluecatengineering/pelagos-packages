import {SearchField} from '../src';

const Template = (args) => <SearchField {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

export default {
	title: 'SearchField',
	component: SearchField,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
