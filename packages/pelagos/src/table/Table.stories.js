import {Fragment, useCallback, useMemo, useState} from 'react';
import Model from '@carbon/icons-react/es/Model';
import Settings from '@carbon/icons-react/es/Settings';
import Edit from '@carbon/icons-react/es/Edit';
import TrashCan from '@carbon/icons-react/es/TrashCan';

import Button from '../components/Button';
import IconButton from '../components/IconButton';
import IconMenu from '../components/IconMenu';
import Layer from '../components/Layer';
import Pagination from '../components/Pagination';
import MenuItem from '../menu/MenuItem';
import MenuItemDivider from '../menu/MenuItemDivider';
import loremIpsumShort from '../../stories/LoremIpsumShort';

import Table from './Table';
import TableBody from './TableBody';
import TableCell from './TableCell';
import TableEmpty from './TableEmpty';
import TableHead from './TableHead';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import TableScrollWrapper from './TableScrollWrapper';
import TableSelectAll from './TableSelectAll';
import TableSelectRow from './TableSelectRow';
import TableTitle from './TableTitle';
import TableToolbar from './TableToolbar';
import TableToolbarBatch from './TableToolbarBatch';
import TableToolbarDefault from './TableToolbarDefault';
import TableToolbarSearch from './TableToolbarSearch';
import TableExpandHeader from './TableExpandHeader';
import TableExpandRow from './TableExpandRow';
import TableExpandableRow from './TableExpandableRow';

import './Table.stories.less';

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

export const ScrollWrapper = {
	parameters: {layout: 'fullscreen'},
	args: {
		id: 'default',
		className: 'TableStory--scroll',
		stickyHeader: true,
		fixedLayout: true,
	},
	render: (args) => (
		<Layer className="TableStory__wrapperScroll">
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
	),
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
					<TableHeader radio aria-label="Select" />
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
					<TableToolbarSearch value={search} placeholder="Filter table" onChange={setSearch} />
					<IconButton icon={Model} aria-label="Example action" />
					<IconMenu icon={Settings} arrow flipped aria-label="Example menu">
						<MenuItem>Option one</MenuItem>
						<MenuItem>Option two</MenuItem>
						<MenuItem disabled>Option three</MenuItem>
						<MenuItemDivider />
						<MenuItem>Option four</MenuItem>
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
					<IconMenu icon={Settings} type="primary" arrow flipped>
						<MenuItem>Batch option one</MenuItem>
						<MenuItem>Batch option two</MenuItem>
						<MenuItem disabled>Batch option three</MenuItem>
						<MenuItemDivider />
						<MenuItem>Batch option four</MenuItem>
					</IconMenu>
				</TableToolbarBatch>
				<TableToolbarDefault hidden={someSelected}>
					<TableToolbarSearch value={search} placeholder="Filter table" onChange={setSearch} />
					<IconButton icon={Model} aria-label="Example action" />
					<IconMenu icon={Settings} arrow flipped aria-label="Example menu">
						<MenuItem>Option one</MenuItem>
						<MenuItem>Option two</MenuItem>
						<MenuItem disabled>Option three</MenuItem>
						<MenuItemDivider />
						<MenuItem>Option four</MenuItem>
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
					<TableHeader aria-label="Actions" />
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
							<div className="TableStory__inlineButtons">
								<IconButton icon={Edit} aria-label="Edit" />
								<IconButton icon={TrashCan} aria-label="Delete" />
							</div>
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
					<TableHeader aria-label="Actions" />
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
							<IconMenu flipped aria-label="Example menu">
								<MenuItem>Option one</MenuItem>
								<MenuItem>Option two</MenuItem>
								<MenuItem disabled>Option three</MenuItem>
								<MenuItemDivider />
								<MenuItem>Option four</MenuItem>
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

const initialExpanded = {
	1: true,
	2: false,
	3: false,
	4: false,
	5: false,
	6: false,
};

export const WithExpansion = {
	args: {
		id: 'expandable',
		className: 'TableStory--expandable',
		fixedLayout: true,
	},
	render: (args) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks -- story
		const [expanded, setExpanded] = useState(initialExpanded);

		// eslint-disable-next-line react-hooks/rules-of-hooks -- story
		const handleExpand = useCallback(
			(event) => {
				const rowId = event.target.closest('tr').dataset.id;
				setExpanded({...expanded, [rowId]: !expanded[rowId]});
			},
			[expanded]
		);

		return (
			<Layer className="TableStory__wrapper">
				<TableTitle title="Table" description="With expansion." />
				<Table {...args}>
					<TableHead>
						<TableRow>
							<TableExpandHeader aria-label="Expansion" />
							{columns.map(({id, header, align, sortable}) => (
								<TableHeader key={id} align={align} sortable={sortable} sortOrder={id === sort.id ? sort.order : null}>
									{header}
								</TableHeader>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((row) => (
							<Fragment key={row.id}>
								<TableExpandRow
									expanded={expanded[row.id]}
									aria-controls={`expandable-${row.id}`}
									data-id={row.id}
									onExpand={handleExpand}>
									{columns.map(({id, align}) => (
										<TableCell key={id} align={align}>
											{row[id]}
										</TableCell>
									))}
								</TableExpandRow>
								<TableExpandableRow id={`expandable-${row.id}`} colSpan={columns.length + 1}>
									<h6>Expandable content</h6>
									<div>{loremIpsumShort}</div>
								</TableExpandableRow>
							</Fragment>
						))}
					</TableBody>
				</Table>
			</Layer>
		);
	},
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
					<TableToolbarSearch value={search} placeholder="Filter table" onChange={setSearch} />
					<IconButton icon={Model} aria-label="Example action" />
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

export const ForFigma = {
	argTypes: {
		headers: {control: 'text', description: 'Column headers, comma separated'},
		rows: {control: {type: 'number', min: 0, max: 1000}, description: 'Number of rows'},
		cellText: {control: 'text', description: 'Text of generated cells'},
		selection: {control: 'select', options: ['none', 'checkbox', 'radio'], description: 'Type of selection'},
		actions: {control: 'select', options: ['none', 'icons', 'menu'], description: 'Type of actions'},
		className: {table: {disable: true}},
		stickyHeader: {table: {disable: true}},
		fixedLayout: {table: {disable: true}},
		children: {table: {disable: true}},
	},
	args: {
		headers: 'Foo, Bar, Baz',
		rows: 10,
		cellText: 'Lorem ipsum',
		selection: 'none',
		actions: 'none',
		rowMode: 'line',
	},
	render: ({headers, rows, cellText, selection, actions, rowMode}) => {
		const headerList = headers.split(',').map((s) => s.trim());
		return (
			<Layer className="TableStory__wrapper">
				<Table className="TableStory--figma" rowMode={rowMode}>
					<TableHead>
						<TableRow>
							{selection === 'checkbox' ? (
								<TableSelectAll aria-label="Select all rows" />
							) : selection === 'radio' ? (
								<TableHeader radio />
							) : null}
							{headerList.map((header) => (
								<TableHeader key={header} className="TableStory__header">
									{header}
								</TableHeader>
							))}
							{actions === 'none' ? null : <TableHeader className={`TableStory__${actions}`} />}
						</TableRow>
					</TableHead>
					<TableBody>
						{Array.from({length: rows}).map((row) => (
							<TableRow key={row}>
								{selection === 'none' ? null : (
									<TableSelectRow radio={selection === 'radio'} name="select" aria-label="Select row" />
								)}
								{headerList.map((header) => (
									<TableCell key={header}>{cellText}</TableCell>
								))}
								{actions === 'none' ? null : (
									<TableCell>
										{actions === 'icons' ? (
											<div className="TableStory__inlineButtons">
												<IconButton icon={Edit} />
												<IconButton icon={TrashCan} />
											</div>
										) : (
											<IconMenu flipped>
												<MenuItem>Option one</MenuItem>
											</IconMenu>
										)}
									</TableCell>
								)}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Layer>
		);
	},
};
