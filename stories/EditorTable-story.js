import {registerPathActions} from '@bluecat/redux-navigation';

import {EditorTable} from '../src';

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

const itemsById = {
	1: {id: '1', name: 'One', value: 1},
	2: {id: '2', name: 'Two', value: 2},
	3: {id: '3', name: 'Three', value: 3},
	4: {id: '4', name: 'Four', value: 4},
	5: {id: '5', name: 'Five', value: 5},
	6: {id: '6', name: 'Six', value: 6},
};

const filter =
	(text) =>
	({name}) =>
		name.toLowerCase().includes(text);

const Details = () => <div>Some details.</div>;

const homePage = () => null;
const showHome = () => null;

registerPathActions('/', 'Home', showHome, homePage);

const Template = (args) => <EditorTable {...args} />;

export const Normal = Template.bind({});
Normal.args = {
	id: 'test',
	appTitle: 'Story Book',
	breadcrumb: [],
	page: homePage,
	defaultSort: {columnId: 'name', order: 'a'},
	titleName: 'Item',
	singularName: 'item',
	pluralName: 'items',
	filterHint: 'Filter by name',
	metadata,
	itemsById,
	canEdit: true,
	selectedId: '5',
	getRowId: ({id}) => id,
	filter,
	details: Details,
};

export default {
	title: 'EditorTable',
	component: EditorTable,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
