import {useCallback, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {getPageTitle} from '@bluecat/redux-navigation';
import {select, t} from '@bluecat/l10n.macro';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

import Breadcrumb from './Breadcrumb';
import ConfirmDialog from './ConfirmDialog';
import DataTable from './DataTable';
import EditorDetailsPanel from './EditorDetailsPanel';
import ModalSpinner from './ModalSpinner';
import SearchField from './SearchField';
import IconButton from './IconButton';
import DefaultDetailsButtons from './DefaultDetailsButtons';

import './EditorTable.less';

const renderDetails = (id, item, Details, DetailButtons, showButtons, disableDelete, onClose, onEdit, onDelete) => (
	<EditorDetailsPanel id={`${id}-details`} item={item} onClose={onClose}>
		<Details item={item} />
		{DetailButtons ? (
			<DetailButtons item={item} />
		) : showButtons && showButtons(item) ? (
			<DefaultDetailsButtons
				item={item}
				disableDelete={disableDelete && disableDelete(item)}
				onEdit={onEdit}
				onDelete={onDelete}
			/>
		) : null}
	</EditorDetailsPanel>
);

/** @deprecated this component is application specific. */
const EditorTable = ({
	id,
	className,
	appTitle,
	breadcrumb,
	page,
	defaultSort,
	titleName,
	singularName,
	pluralName,
	filterHint,
	metadata,
	itemsById,
	loading,
	busy,
	canEdit,
	highlightId,
	selectedId,
	getRowId,
	filter,
	externalFilter,
	buttons,
	controls,
	details,
	detailButtons,
	dialog,
	showDetailsButtons,
	disableDelete,
	onAddClick,
	onHighlightClear,
	onRowClick,
	onDetailsClose,
	onRequestEdit,
	onDelete,
}) => {
	const [filterText, setFilterText] = useState('');
	const [itemToDelete, setItemToDelete] = useState(null);

	const pageTitle = getPageTitle(page);
	const title = useMemo(
		() => (selectedId ? `${itemsById[selectedId].name} - ${pageTitle}` : pageTitle),
		[pageTitle, itemsById, selectedId]
	);
	document.title = `${title} - ${appTitle}`;

	const items = useMemo(() => {
		const tmp = Object.values(itemsById);
		const f0 = filterText ? filter(filterText) : null;
		const f1 = externalFilter ? (f0 ? (...args) => externalFilter(...args) && f0(...args) : externalFilter) : f0;
		return f1 ? tmp.filter(f1) : tmp;
	}, [itemsById, filter, externalFilter, filterText]);

	const handleRowClick = useCallback((row) => onRowClick({query: {id: getRowId(row)}}), [getRowId, onRowClick]);

	const disabled = loading || !canEdit;
	const tooltipText = loading
		? t`Retrieving ${pluralName}...`
		: canEdit
		? t`Create a new ${singularName}.`
		: t`Only an administrator can perform this action.`;

	const handleDeleteClose = useCallback(() => setItemToDelete(null), []);
	const handleDeleteConfirm = useCallback(
		() => onDelete(itemToDelete).then(({error}) => (error ? null : setItemToDelete(null))),
		[itemToDelete, onDelete]
	);

	if (itemToDelete) {
		const name = itemToDelete.name;
		dialog = (
			<ConfirmDialog
				title={t`Delete ${singularName} "${name}"?`}
				body={t`Deleting this ${singularName} will remove it permanently.`}
				confirmText={t`Delete ${titleName}`}
				onClose={handleDeleteClose}
				onConfirm={handleDeleteConfirm}
			/>
		);
	}

	return (
		<div id={id + '-content'} className={`EditorTable ${className}`}>
			<Breadcrumb breadcrumb={breadcrumb} title={pageTitle} />

			<main className={'EditorTable__main' + (selectedId ? ' EditorTable--narrow' : '')} aria-labelledby="pageTitle">
				<h1>{pageTitle}</h1>

				<div className="EditorTable__buttons">
					{canEdit && (
						<>
							<IconButton
								id="addBtn"
								type="primary"
								icon={faPlus}
								aria-label={t`Add`}
								tooltipText={tooltipText}
								tooltipPlacement="top"
								disabled={disabled}
								onClick={onAddClick}
							/>
							{buttons}
						</>
					)}
					<SearchField
						className="EditorTable__filter"
						placeholder={filterHint}
						aria-label={t`Filter`}
						onChange={setFilterText}
					/>
				</div>

				{controls}

				<DataTable
					id={id}
					defaultSort={defaultSort}
					metadata={metadata}
					data={!loading ? items : []}
					columns={selectedId ? [0, 1] : null}
					fetchingNextPage={loading}
					highlightId={highlightId}
					selectedId={selectedId}
					getRowId={getRowId}
					emptyTableText={
						filterText
							? t`There are no ${pluralName} that match your filter.`
							: t`No ${pluralName} have been created. ${select(canEdit, {
									true: 'To create one click the Add button.',
									other: '',
							  })}`
					}
					onHighlightClear={onHighlightClear}
					onRowClick={handleRowClick}
				/>
			</main>

			{selectedId &&
				renderDetails(
					id,
					itemsById[selectedId],
					details,
					detailButtons,
					showDetailsButtons,
					disableDelete,
					onDetailsClose,
					onRequestEdit,
					onDelete ? setItemToDelete : null
				)}

			{dialog}

			{busy && <ModalSpinner id={id + '-spinner'} />}
		</div>
	);
};

EditorTable.propTypes = {
	/** The component id. */
	id: PropTypes.string.isRequired,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The application title. */
	appTitle: PropTypes.string,
	/** The page breadcrumb. */
	breadcrumb: PropTypes.arrayOf(PropTypes.func).isRequired,
	/** The current page. */
	page: PropTypes.func.isRequired,
	/** The parameters of the default sort. */
	defaultSort: PropTypes.shape({columnId: PropTypes.string, order: PropTypes.string}),
	/** The name of the item type in title case. */
	titleName: PropTypes.string,
	/** The name of the item type in singular. */
	singularName: PropTypes.string,
	/** The name of the item type in plural. */
	pluralName: PropTypes.string,
	/** The hint for the filter. */
	filterHint: PropTypes.string,
	/** The attributes of the table columns. */
	metadata: PropTypes.array,
	/** The items to display by id. */
	itemsById: PropTypes.object,
	/** Whether the data is loading. */
	loading: PropTypes.bool,
	/** Whether the UI is busy. */
	busy: PropTypes.bool,
	/** Whether the current user can edit items. */
	canEdit: PropTypes.bool,
	/** The ID of the item to highlight. */
	highlightId: PropTypes.string,
	/** The ID of the selected item. */
	selectedId: PropTypes.string,
	/** Function to get the row id. */
	getRowId: PropTypes.func.isRequired,
	/** Function to filter items. */
	filter: PropTypes.func,
	/** Function to apply additional filters. */
	externalFilter: PropTypes.func,
	/** Additional buttons. */
	buttons: PropTypes.arrayOf(PropTypes.element),
	/** Additional controls. */
	controls: PropTypes.element,
	/** Component used to display item details. */
	details: PropTypes.elementType,
	/** Component used to display detail panel buttons, if specified overrides default buttons. */
	detailButtons: PropTypes.elementType,
	/** Dialog to display over the table. */
	dialog: PropTypes.element,
	/** Function which returns whether the detail buttons should be displayed. */
	showDetailsButtons: PropTypes.func,
	/** Function which returns whether the delete button should be disabled. */
	disableDelete: PropTypes.func,
	/** Function invoked when the add button is clicked. */
	onAddClick: PropTypes.func,
	/** Function invoked when the highlight is be cleared. */
	onHighlightClear: PropTypes.func,
	/** Function invoked when a given row is clicked. */
	onRowClick: PropTypes.func,
	/** Function invoked when the details are closed. */
	onDetailsClose: PropTypes.func,
	/** Function invoked when the edit button is clicked. */
	onRequestEdit: PropTypes.func,
	/** Function invoked when an item is deleted. */
	onDelete: PropTypes.func,
};

export default EditorTable;
