import React from 'react';
import {storiesOf} from '@storybook/react';

import {DataTable} from '../src';

const metadata = [
	{
		id: 'name',
		header: 'Name',
		width: '60%',
		sortable: true,
		value: row => row.name,
		sortComparator: (a, b) => a.name.localeCompare(b.name),
	},
	{
		id: 'value',
		header: 'Value',
		width: '40%',
		sortable: true,
		value: row => row.value,
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

const getRowId = row => row.id;

storiesOf('DataTable', module)
	.add('normal', () => (
		<DataTable
			id="normal"
			metadata={metadata}
			data={data}
			selectedId="3"
			getRowId={getRowId}
			addedCount={data.length}
			defaultSort={defaultSort}
		/>
	))
	.add('loading', () => (
		<DataTable
			id="loading"
			className="Story__table"
			metadata={metadata}
			data={[]}
			addedCount={0}
			getRowId={getRowId}
			isFetchingNextDataPage
		/>
	))
	.add('loading next', () => (
		<DataTable
			id="next"
			metadata={metadata}
			data={data}
			addedCount={data.length}
			getRowId={getRowId}
			isFetchingNextDataPage
		/>
	))
	.add('loading previous', () => (
		<DataTable
			id="prev"
			metadata={metadata}
			data={data}
			addedCount={data.length}
			getRowId={getRowId}
			isFetchingPrevDataPage
		/>
	));
