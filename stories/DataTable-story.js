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

const emptyTableText = 'This table is empty';

const getRowId = (row) => row.id;

const Template = (args) => <DataTable {...args} />;

export const Normal = Template.bind({});
Normal.args = {id: 'normal', metadata, data, selectedId: '3', getRowId, defaultSort};

export const Loading = Template.bind({});
Loading.args = {id: 'loading', metadata, data: [], getRowId, fetchingNextPage: true};

export const LoadingNext = Template.bind({});
LoadingNext.args = {id: 'next', metadata, data, getRowId, fetchingNextPage: true};

export const LoadingPrevious = Template.bind({});
LoadingPrevious.args = {id: 'prev', metadata, data, getRowId, fetchingPrevPage: true};

export const Empty = Template.bind({});
Empty.args = {id: 'empty', metadata, data: [], emptyTableText, getRowId};

export default {
	title: 'DataTable',
	component: DataTable,
	parameters: {layout: 'fullscreen', actions: {argTypesRegex: '^on.*'}},
	decorators: [(story) => <div className="Story__stretch">{story()}</div>],
};
