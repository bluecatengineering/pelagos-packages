import {useCallback, useMemo, useState} from 'react';
import {faCat, faCog, faEllipsisV} from '@fortawesome/free-solid-svg-icons';
import {faEdit, faTrashAlt} from '@fortawesome/free-regular-svg-icons';

import {
	Button,
	IconButton,
	IconMenu,
	IconMenuItem,
	Layer,
	Pagination,
	Table,
	TableBody,
	TableCell,
	TableEmpty,
	TableHead,
	TableHeader,
	TableRow,
	TableScrollWrapper,
	TableSelectAll,
	TableSelectRow,
	TableTitle,
	TableToolbar,
	TableToolbarBatch,
	TableToolbarDefault,
	TableToolbarSearch,
} from '../src';

import './Table-stories.less';

const columns = [
	{
		id: 'name',
		header: 'Name',
		sortable: true,
	},
	{
		id: 'value',
		header: 'Value',
		align: 'right',
		sortable: true,
	},
	{
		id: 'other',
		header: 'Other',
	},
];

const sort = {id: 'value', order: 'a'};

const data = [
	{id: '1', name: 'One', value: 1, other: 'foo'},
	{id: '2', name: 'Two', value: 2, other: 'baz'},
	{id: '3', name: 'Three', value: 3, other: 'foo'},
	{id: '4', name: 'Four', value: 4, other: 'bar'},
	{id: '5', name: 'Five', value: 5, other: 'bar'},
	{id: '6', name: 'Six', value: 6, other: 'baz'},
];

const largeColumns = [];
const largeData = [];

for (let j = 0; j < 3; ++j) {
	largeColumns.push(`Column ${j}`);
}

for (let i = 0; i < 300; ++i) {
	const item = [];
	for (let j = 0; j < 3; ++j) {
		item.push(`row ${i}, cell ${j}`);
	}
	largeData.push(item);
}

export default {
	title: 'Components/Table',
	component: Table,
	subcomponents: {
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow,
		TableSelectAll,
		TableSelectRow,
		TableTitle,
		TableToolbar,
		TableToolbarBatch,
		TableToolbarDefault,
		TableToolbarSearch,
	},
	parameters: {layout: 'fullscreen'},
	decorators: [
		(Story) => (
			<div className="Story__stretch">
				<Story />
			</div>
		),
	],
};

export const Default = (args) => (
	<Layer className="TableStory__wrapper">
		<Table {...args}>
			<TableHead>
				<TableRow>
					{columns.map(({id, header, align, sortable}) => (
						<TableHeader key={id} align={align} sortable={sortable} sortOrder={id === sort.id ? sort.order : null}>
							{header}
						</TableHeader>
					))}
				</TableRow>
			</TableHead>
			<TableBody>
				{data.map((row) => (
					<TableRow key={row.id}>
						{columns.map(({id, align}) => (
							<TableCell key={id} align={align}>
								{row[id]}
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	</Layer>
);
Default.args = {
	id: 'default',
	className: 'TableStory--default',
	fixedLayout: true,
};

export const Empty = (args) => (
	<Layer className="TableStory__wrapper">
		<Table {...args}>
			<TableHead>
				<TableRow>
					{columns.map(({id, header, align, sortable}) => (
						<TableHeader key={id} align={align} sortable={sortable} sortOrder={id === sort.id ? sort.order : null}>
							{header}
						</TableHeader>
					))}
				</TableRow>
			</TableHead>
		</Table>
		<TableEmpty>This table is empty.</TableEmpty>
	</Layer>
);
Empty.args = {
	id: 'empty',
	className: 'TableStory--default',
	fixedLayout: true,
};

export const ScrollWrapper = (args) => (
	<Layer className="TableStory__wrapper">
		<TableTitle title="Table" description="With scroll wrapper." />
		<TableScrollWrapper>
			<Table {...args}>
				<TableHead>
					<TableRow>
						{largeColumns.map((header, j) => (
							<TableHeader key={j}>{header}</TableHeader>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{largeData.map((row, i) => (
						<TableRow key={i}>
							{row.map((text, j) => (
								<TableCell key={j}>{text}</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableScrollWrapper>
	</Layer>
);
ScrollWrapper.args = {
	id: 'default',
	className: 'TableStory--scroll',
	stickyHeader: true,
	fixedLayout: true,
};

export const Selection = (args) => (
	<Layer className="TableStory__wrapper">
		<TableTitle title="Table" description="With selection." />
		<Table {...args}>
			<TableHead>
				<TableRow>
					<TableSelectAll indeterminate aria-label="Select all rows" />
					{columns.map(({id, header, align, sortable}) => (
						<TableHeader key={id} align={align} sortable={sortable} sortOrder={id === sort.id ? sort.order : null}>
							{header}
						</TableHeader>
					))}
				</TableRow>
			</TableHead>
			<TableBody>
				{data.map((row) => (
					<TableRow key={row.id}>
						<TableSelectRow name="select" aria-label="Select row" />
						{columns.map(({id, align}) => (
							<TableCell key={id} align={align}>
								{row[id]}
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	</Layer>
);
Selection.args = {
	id: 'selection',
	className: 'TableStory--selection',
};

export const RadioSelection = (args) => (
	<Layer className="TableStory__wrapper">
		<TableTitle title="Table" description="With radio selection." />
		<Table {...args}>
			<TableHead>
				<TableRow>
					<TableHeader radio />
					{columns.map(({id, header, align, sortable}) => (
						<TableHeader key={id} align={align} sortable={sortable} sortOrder={id === sort.id ? sort.order : null}>
							{header}
						</TableHeader>
					))}
				</TableRow>
			</TableHead>
			<TableBody>
				{data.map((row) => (
					<TableRow key={row.id}>
						<TableSelectRow radio name="select" aria-label="Select row" />
						{columns.map(({id, align}) => (
							<TableCell key={id} align={align}>
								{row[id]}
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	</Layer>
);
RadioSelection.args = {
	id: 'radio-selection',
	className: 'TableStory--selection',
};

export const DefaultToolbar = (args) => {
	const [search, setSearch] = useState('');
	const filteredData = useMemo(
		() => (search ? data.filter(({name}) => name.toLowerCase().includes(search)) : data),
		[search]
	);
	return (
		<Layer className="TableStory__wrapper">
			<TableTitle title="Table" description="With default toolbar." />
			<TableToolbar>
				<TableToolbarDefault>
					<TableToolbarSearch placeholder="Filter table" onChange={setSearch} />
					<IconButton icon={faCat} />
					<IconMenu icon={faCog} arrow flipped>
						<IconMenuItem text="Option one" />
						<IconMenuItem text="Option two" />
						<IconMenuItem text="Option three" disabled />
						<IconMenuItem text="Option four" hasDivider />
					</IconMenu>
					<Button type="primary" text="Primary button" />
				</TableToolbarDefault>
			</TableToolbar>
			<Table {...args}>
				<TableHead>
					<TableRow>
						{columns.map(({id, header, align, sortable}) => (
							<TableHeader key={id} align={align} sortable={sortable} sortOrder={id === sort.id ? sort.order : null}>
								{header}
							</TableHeader>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{filteredData.map((row) => (
						<TableRow key={row.id}>
							{columns.map(({id, align}) => (
								<TableCell key={id} align={align}>
									{row[id]}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Layer>
	);
};
DefaultToolbar.args = {
	id: 'default-toolbar',
	className: 'TableStory--default',
	fixedLayout: true,
};

export const BatchActions = (args) => {
	const [search, setSearch] = useState('');
	const [selected, setSelected] = useState([]);
	const filteredData = useMemo(
		() => (search ? data.filter(({name}) => name.toLowerCase().includes(search)) : data),
		[search]
	);
	const selectedCount = selected.length;
	const someSelected = !!selectedCount;
	const selectAllChecked = selectedCount === filteredData.length;
	const selectAllIndeterminate = someSelected && !selectAllChecked;
	const handleSelectAll = useCallback(
		(event) => {
			setSelected(event.target.checked ? filteredData.map(({id}) => id) : []);
		},
		[filteredData]
	);
	const handleSelectRow = useCallback((event) => {
		const target = event.target;
		const id = target.value;
		setSelected((selected) => (target.checked ? [...selected, id] : selected.filter((s) => s !== id)));
	}, []);
	const handleBatchCancel = useCallback(() => setSelected([]), []);
	return (
		<Layer className="TableStory__wrapper">
			<TableTitle title="Table" description="With batch actions." />
			<TableToolbar>
				<TableToolbarBatch selectedCount={selectedCount} onCancel={handleBatchCancel}>
					<Button type="primary" text="Action 1" />
					<Button type="primary" text="Action 2" />
					<IconMenu icon={faCog} type="primary" arrow flipped>
						<IconMenuItem text="Batch option one" />
						<IconMenuItem text="Batch option two" />
						<IconMenuItem text="Batch option three" disabled />
						<IconMenuItem text="Batch option four" hasDivider />
					</IconMenu>
				</TableToolbarBatch>
				<TableToolbarDefault hidden={someSelected}>
					<TableToolbarSearch placeholder="Filter table" onChange={setSearch} />
					<IconButton icon={faCat} />
					<IconMenu icon={faCog} arrow flipped>
						<IconMenuItem text="Option one" />
						<IconMenuItem text="Option two" />
						<IconMenuItem text="Option three" disabled />
						<IconMenuItem text="Option four" hasDivider />
					</IconMenu>
					<Button type="primary" text="Primary button" />
				</TableToolbarDefault>
			</TableToolbar>
			<Table {...args}>
				<TableHead>
					<TableRow>
						<TableSelectAll
							checked={selectAllChecked}
							indeterminate={selectAllIndeterminate}
							aria-label="Select all rows"
							onChange={handleSelectAll}
						/>
						{columns.map(({id, header, align, sortable}) => (
							<TableHeader key={id} align={align} sortable={sortable} sortOrder={id === sort.id ? sort.order : null}>
								{header}
							</TableHeader>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{filteredData.map((row) => (
						<TableRow key={row.id} selected={selected.includes(row.id)}>
							<TableSelectRow
								name="select"
								value={row.id}
								checked={selected.includes(row.id)}
								aria-label="Select row"
								onChange={handleSelectRow}
							/>
							{columns.map(({id, align}) => (
								<TableCell key={id} align={align}>
									{row[id]}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Layer>
	);
};
BatchActions.args = {
	id: 'batch-actions',
	className: 'TableStory--selection',
};

export const InlineActions = (args) => (
	<Layer className="TableStory__wrapper">
		<TableTitle title="Table" description="With inline actions." />
		<Table {...args}>
			<TableHead>
				<TableRow>
					{columns.map(({id, header, align, sortable}) => (
						<TableHeader key={id} align={align} sortable={sortable} sortOrder={id === sort.id ? sort.order : null}>
							{header}
						</TableHeader>
					))}
					<TableHeader />
				</TableRow>
			</TableHead>
			<TableBody>
				{data.map((row) => (
					<TableRow key={row.id}>
						{columns.map(({id, align}) => (
							<TableCell key={id} align={align}>
								{row[id]}
							</TableCell>
						))}
						<TableCell>
							<Layer className="TableStory__inlineButtons">
								<IconButton icon={faEdit} />
								<IconButton icon={faTrashAlt} />
							</Layer>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	</Layer>
);
InlineActions.args = {
	id: 'inlineActions',
	className: 'TableStory--inlineActions',
	fixedLayout: true,
};

export const InlineMenu = (args) => (
	<Layer className="TableStory__wrapper">
		<TableTitle title="Table" description="With inline menu." />
		<Table {...args}>
			<TableHead>
				<TableRow>
					{columns.map(({id, header, align, sortable}) => (
						<TableHeader key={id} align={align} sortable={sortable} sortOrder={id === sort.id ? sort.order : null}>
							{header}
						</TableHeader>
					))}
					<TableHeader />
				</TableRow>
			</TableHead>
			<TableBody>
				{data.map((row) => (
					<TableRow key={row.id}>
						{columns.map(({id, align}) => (
							<TableCell key={id} align={align}>
								{row[id]}
							</TableCell>
						))}
						<TableCell>
							<IconMenu icon={faEllipsisV} flipped>
								<IconMenuItem text="Option one" />
								<IconMenuItem text="Option two" />
								<IconMenuItem text="Option three" disabled />
								<IconMenuItem text="Option four" hasDivider />
							</IconMenu>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	</Layer>
);
InlineMenu.args = {
	id: 'inlineMenu',
	className: 'TableStory--inlineMenu',
	fixedLayout: true,
};

export const WithPagination = (args) => {
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(2);
	const [pageSize, setPageSize] = useState(10);
	const filteredData = useMemo(
		() => (search ? data.filter(({name}) => name.toLowerCase().includes(search)) : data),
		[search]
	);
	return (
		<Layer className="TableStory__wrapper">
			<TableTitle title="Table" description="With pagination." />
			<TableToolbar>
				<TableToolbarDefault>
					<TableToolbarSearch placeholder="Filter table" onChange={setSearch} />
					<IconButton icon={faCat} />
					<Button type="primary" text="Primary button" />
				</TableToolbarDefault>
			</TableToolbar>
			<Table {...args}>
				<TableHead>
					<TableRow>
						{columns.map(({id, header, align, sortable}) => (
							<TableHeader key={id} align={align} sortable={sortable} sortOrder={id === sort.id ? sort.order : null}>
								{header}
							</TableHeader>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{filteredData.map((row) => (
						<TableRow key={row.id}>
							{columns.map(({id, align}) => (
								<TableCell key={id} align={align}>
									{row[id]}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Pagination
				page={page}
				pageSize={pageSize}
				pageSizes={[10, 50, 100]}
				totalItems={123}
				onPageChange={setPage}
				onPageSizeChange={setPageSize}
			/>
		</Layer>
	);
};
WithPagination.args = {
	id: 'pagination',
	className: 'TableStory--default',
	fixedLayout: true,
};
