import {SearchField} from '../src';

const Template = (args) => <SearchField {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

export default {
	title: 'Components/SearchField',
	component: SearchField,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
