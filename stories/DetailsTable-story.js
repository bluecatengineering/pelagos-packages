import {DetailsTable} from '../src';

const list = [
	{a: 'one', b: 'alpha'},
	{a: 'two', b: 'beta'},
	{a: 'three', b: 'gamma'},
];
const columns = [
	{key: 'a', header: 'A', renderValue: ({a}) => a},
	{key: 'b', header: 'B', renderValue: ({b}) => b},
];

const Template = (args) => <DetailsTable {...args} />;

export const Normal = Template.bind({});
Normal.args = {title: 'Test', list, columns};

export default {
	title: 'Components/DetailsTable',
	component: DetailsTable,
};
