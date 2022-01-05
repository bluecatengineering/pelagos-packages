import {Calendar} from '../src';

const Template = (args) => <Calendar id="test" {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

export const Range = Template.bind({});
Range.args = {value: []};

export default {
	title: 'Components/Calendar',
	component: Calendar,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
