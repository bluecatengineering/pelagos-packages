import {DataTable} from '../src';

const metadata = [
	{
		id: 'name',
		header: 'Name',
		width: '60%',
		sortable: true,
		value: (row) => row.name,
		sortComparator: (a, b) => a.name.localeCompare(b.name),
	},
	{
		id: 'value',
		header: 'Value',
		width: '40%',
		sortable: true,
		value: (row) => row.value,
		sortComparator: (a, b) => a.value - b.value,
	},
];

const defaultSort = {columnId: 'name', order: 'a'};

const data = [
	{id: '1', name: 'One', value: 1},
	{id: '2', name: 'Two', value: 2},
	{id: '3', name: 'Three', value: 3},
	{id: '4', name: 'Four', value: 4},
];

const getRowId = (row) => row.id;

const Template = (args) => <DataTable {...args} />;

export const Normal = Template.bind({});
Normal.args = {id: 'normal', className: 'Story__table', metadata, data, selectedId: '3', getRowId, defaultSort};

export const Loading = Template.bind({});
Loading.args = {id: 'loading', className: 'Story__table', metadata, data: [], getRowId, fetchingNextPage: true};

export const LoadingNext = Template.bind({});
LoadingNext.args = {id: 'next', className: 'Story__table', metadata, data, getRowId, fetchingNextPage: true};

export const LoadingPrevious = Template.bind({});
LoadingPrevious.args = {id: 'prev', className: 'Story__table', metadata, data, getRowId, fetchingPrevPage: true};

export default {
	title: 'DataTable',
	component: DataTable,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
