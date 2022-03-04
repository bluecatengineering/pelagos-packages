import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash-es/throttle';
import stableSort from 'stable';
import {buildHighlighter, scrollToItem, smoothScroll} from '@bluecat/helpers';
import {faSort, faSortDown, faSortUp} from '@fortawesome/free-solid-svg-icons';

import SvgIcon from './SvgIcon';
import Spinner from './Spinner';
import './DataTable.less';

const getRow = (element, index) => element.firstChild.tBodies[0].childNodes[index];

const sortData = (data, metadata, dataSort, defaultSortColumnId) => {
	if (!dataSort) {
		return data;
	}

	const sortColumnId = dataSort.columnId;
	const sortIndex = metadata.findIndex((m) => m.id === sortColumnId);

	const secondarySortIndex = metadata.findIndex((m) => m.id === defaultSortColumnId);

	const primarySortComparator = metadata[sortIndex].sortComparator.bind(metadata[sortIndex]);
	const secondarySortComparator =
		sortIndex !== secondarySortIndex
			? metadata[secondarySortIndex].sortComparator.bind(metadata[secondarySortIndex])
			: null;
	const sortOrderModifier = dataSort.order === 'a' ? 1 : -1;

	return stableSort(data, (a, b) => {
		let sortValue = primarySortComparator(a, b) * sortOrderModifier;
		if (sortValue === 0 && secondarySortComparator) {
			sortValue = secondarySortComparator(a, b);
		}
		return sortValue;
	});
};

const mapColumns = (metadata, columns, f) => (columns ? columns.map((c) => f(metadata[c])) : metadata.map(f));

const renderHeaders = (metadata, columns, dataSort) =>
	mapColumns(metadata, columns, ({id, sortable, style, header}) => {
		if (!sortable) {
			return (
				<th key={id} style={style}>
					{header}
				</th>
			);
		}

		const sortOrder = dataSort && dataSort.columnId === id ? dataSort.order : null;
		const ariaSort = sortOrder === 'a' ? 'ascending' : sortOrder === 'd' ? 'descending' : 'none';
		return (
			<th key={id} aria-sort={ariaSort}>
				<button
					className={`DataTable__sort${sortOrder ? ' DataTable__sort--active' : ''}`}
					type="button"
					data-column={id}
				>
					<div className="DataTable__sortLabel" style={style}>
						{header}
					</div>
					<SvgIcon
						className="DataTable__sortIcon"
						icon={sortOrder === 'a' ? faSortUp : sortOrder === 'd' ? faSortDown : faSort}
					/>
				</button>
			</th>
		);
	});

const renderRows = (data, metadata, columns, selectedId, highlightId, focused, getRowId) =>
	data.map((row, rowIndex) => {
		const rowId = getRowId(row, rowIndex);
		return (
			<tr
				key={rowIndex}
				id={rowId}
				className={rowId === highlightId ? 'DataTable--highlight' : ''}
				tabIndex={focused === rowIndex ? 0 : -1}
				aria-selected={selectedId === rowId}
				data-index={rowIndex}
			>
				{mapColumns(metadata, columns, ({id, style, hoverValue, className, value}) => (
					<td
						key={id}
						style={style}
						title={hoverValue ? value(row, rowIndex) : ''}
						className={className ? className(row, rowIndex) : null}
					>
						{value(row, rowIndex)}
					</td>
				))}
			</tr>
		);
	});

/**
 * A scrollable table.
 *
 * This component has no intrinsic size. For a correct display the container should be sized appropriately.
 */
const DataTable = ({
	id,
	className,
	metadata,
	columns,
	defaultSort,
	rowMode,
	data,
	addedCount,
	emptyTableText,
	highlightId,
	selectedId,
	fetchingPrevPage,
	fetchingNextPage,
	getRowId,
	requestNextPage,
	requestPrevPage,
	onHighlightClear,
	onRowClick,
}) => {
	const [dataSort, setDataSort] = useState(defaultSort);

	const containerRef = useRef(null);
	const isLoadingNextData = useRef(false);
	const isLoadingPrevData = useRef(false);
	const defaultSortColumnId = useRef(defaultSort ? defaultSort.columnId : null);

	const sortedData = useMemo(
		() => sortData(data, metadata, dataSort, defaultSortColumnId.current),
		[data, metadata, dataSort]
	);

	const [focused, setFocused] = useState(() => {
		if (selectedId) {
			const index = sortedData.findIndex((item, index) => getRowId(item, index) === selectedId);
			if (index !== -1) {
				return index;
			}
		}
		return onRowClick ? 0 : -1;
	});

	const updateFocused = useCallback((index) => {
		setFocused(index);
		const container = containerRef.current;
		const element = getRow(container, index);
		const headerHeight = container.firstChild.tHead.clientHeight;
		scrollToItem(container, element, {headerHeight});
		element.focus();
	}, []);

	const updateSortColumn = useCallback(
		(columnId) =>
			setDataSort((dataSort) =>
				dataSort && dataSort.columnId === columnId
					? {...dataSort, order: dataSort.order === 'a' ? 'd' : 'a'}
					: {columnId, order: 'a'}
			),
		[]
	);

	const handleScroll = useMemo(
		() =>
			throttle(() => {
				if (fetchingNextPage || fetchingPrevPage || data.length === 0) {
					return;
				}

				const element = containerRef.current;
				if (element.clientHeight + element.scrollTop + 75 >= element.scrollHeight) {
					isLoadingNextData.current = requestNextPage();
					isLoadingPrevData.current = false;
				} else if (element.scrollTop <= 75) {
					isLoadingPrevData.current = requestPrevPage();
					isLoadingNextData.current = false;
				}
			}, 500),
		[data, fetchingNextPage, fetchingPrevPage, requestNextPage, requestPrevPage]
	);

	const handleHeaderClick = useCallback(
		(event) => {
			const sort = event.target.closest('.DataTable__sort');
			if (sort) {
				updateSortColumn(sort.dataset.column);
			}
		},
		[updateSortColumn]
	);

	const handleMouseDown = useCallback((event) => {
		const element = event.target.closest('tr');
		if (element) {
			setFocused(+element.dataset.index);
		}
	}, []);

	const handleClick = useCallback(
		(event) => {
			const element = event.target.closest('tr');
			if (element) {
				event.preventDefault();
				event.nativeEvent.stopImmediatePropagation();
				onRowClick(sortedData[+element.dataset.index]);
			}
		},
		[sortedData, onRowClick]
	);

	const handleKeyDown = useCallback(
		(event) => {
			if (!event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey) {
				switch (event.keyCode) {
					case 13: // enter
					case 32: // space
						event.preventDefault();
						event.nativeEvent.stopImmediatePropagation();
						break;
					case 33: {
						// page up
						event.preventDefault();
						event.nativeEvent.stopImmediatePropagation();
						let i;
						const element = containerRef.current;
						const listHeight = element.clientHeight;
						const scrollTop = element.scrollTop;
						if (scrollTop > 0) {
							const rowHeight = getRow(element, 0).offsetHeight;
							const count = Math.floor(listHeight / rowHeight);
							i = Math.max(0, focused - count);
							const offset = Math.max(-rowHeight * count, -scrollTop);
							smoothScroll(element, scrollTop, offset, 150);
						} else {
							i = 0;
						}
						setFocused(i);
						getRow(element, i).focus();
						break;
					}
					case 34: {
						// page down
						event.preventDefault();
						event.nativeEvent.stopImmediatePropagation();
						let i;
						const element = containerRef.current;
						const listHeight = element.clientHeight;
						const scrollTop = element.scrollTop;
						const scrollMax = element.scrollHeight - listHeight;
						if (scrollTop < scrollMax) {
							const rowHeight = getRow(element, 0).offsetHeight;
							const count = Math.floor(listHeight / rowHeight);
							i = Math.min(sortedData.length - 1, focused + count);
							const offset = Math.min(rowHeight * count, scrollMax - scrollTop);
							smoothScroll(element, scrollTop, offset, 150);
						} else {
							i = sortedData.length - 1;
						}
						setFocused(i);
						getRow(element, i).focus();
						break;
					}
					case 35: // end
						event.preventDefault();
						event.nativeEvent.stopImmediatePropagation();
						updateFocused(sortedData.length - 1);
						break;
					case 36: // home
						event.preventDefault();
						event.nativeEvent.stopImmediatePropagation();
						updateFocused(0);
						break;
					case 38: // up
						event.preventDefault();
						event.nativeEvent.stopImmediatePropagation();
						if (focused > 0) {
							updateFocused(focused - 1);
						}
						break;
					case 40: // down
						event.preventDefault();
						event.nativeEvent.stopImmediatePropagation();
						if (focused < sortedData.length - 1) {
							updateFocused(focused + 1);
						}
						break;
				}
			}
		},
		[focused, sortedData, updateFocused]
	);

	const handleKeyUp = useCallback(
		(event) => {
			if (!event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey) {
				switch (event.keyCode) {
					case 13: // enter
					case 32: // space
						event.preventDefault();
						event.nativeEvent.stopImmediatePropagation();
						onRowClick(sortedData[focused]);
						break;
				}
			}
		},
		[focused, sortedData, onRowClick]
	);

	useEffect(() => {
		if (requestNextPage && requestPrevPage) {
			const element = containerRef.current;
			element.addEventListener('scroll', handleScroll, /Trident\//.test(navigator.userAgent) ? false : {passive: true});
			return () => element.removeEventListener('scroll', handleScroll);
		}
		return undefined;
	}, [requestNextPage, requestPrevPage, handleScroll]);

	useEffect(() => {
		if (highlightId) {
			buildHighlighter(false)(highlightId, onHighlightClear);
		}
	}, [highlightId, onHighlightClear]);

	useEffect(() => {
		if (isLoadingNextData.current && !fetchingNextPage) {
			const element = containerRef.current;
			const headerHeight = element.firstChild.tHead.clientHeight;
			element.scrollTop =
				((element.scrollHeight - headerHeight) / data.length) * (data.length - addedCount) -
				element.clientHeight +
				headerHeight;
			isLoadingNextData.current = false;
			if (focused !== -1) {
				setFocused(Math.max(0, focused - addedCount));
			}
		} else if (isLoadingPrevData.current && !fetchingPrevPage) {
			const element = containerRef.current;
			const headerHeight = element.firstChild.tHead.clientHeight;
			element.scrollTop = ((element.scrollHeight - headerHeight) / data.length) * addedCount;
			isLoadingPrevData.current = false;
			if (focused !== -1) {
				setFocused(Math.min(data.length - 1, focused + addedCount));
			}
		}
	}, [data, addedCount, fetchingNextPage, fetchingPrevPage, focused]);

	const columnCount = columns?.length ?? metadata.length;
	const empty = data.length === 0;
	return (
		<div id={id} className={`DataTable${className ? ` ${className}` : ''}`} tabIndex="-1" ref={containerRef}>
			<table
				id={`${id}-table`}
				className={`DataTable__table DataTable--${rowMode}${onRowClick ? ' DataTable--clickable' : ''}`}
				role="grid"
			>
				<colgroup>
					{mapColumns(metadata, columns, ({id, width}) => (
						<col key={id} width={width} />
					))}
				</colgroup>
				<thead onClick={handleHeaderClick}>
					<tr>{renderHeaders(metadata, columns, dataSort)}</tr>
				</thead>
				<tbody
					onMouseDown={onRowClick ? handleMouseDown : null}
					onClick={onRowClick ? handleClick : null}
					onKeyDown={onRowClick && !empty ? handleKeyDown : null}
					onKeyUp={onRowClick && !empty ? handleKeyUp : null}
				>
					{!empty && [
						fetchingPrevPage && (
							<tr>
								<td className="DataTable__spinner" colSpan={columnCount}>
									<Spinner size="tiny" />
								</td>
							</tr>
						),
						renderRows(sortedData, metadata, columns, selectedId, highlightId, focused, getRowId),
						fetchingNextPage && (
							<tr>
								<td className="DataTable__spinner" colSpan={columnCount}>
									<Spinner size="tiny" />
								</td>
							</tr>
						),
					]}
				</tbody>
			</table>
			{empty &&
				(fetchingNextPage ? (
					<Spinner id={`${id}-loading`} size="large" />
				) : emptyTableText ? (
					<div id={`${id}-tableMessage`} className="DataTable__message">
						{emptyTableText}
					</div>
				) : null)}
		</div>
	);
};

DataTable.propTypes = {
	/** The component id. */
	id: PropTypes.string.isRequired,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The attributes of the table columns. */
	metadata: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			header: PropTypes.any.isRequired,
			value: PropTypes.func.isRequired,
			width: PropTypes.string.isRequired,
			className: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
			hoverValue: PropTypes.bool,
			style: PropTypes.object,
			sortable: PropTypes.bool,
			sortComparator: PropTypes.func,
		})
	).isRequired,
	/** The indices of the columns to display. */
	columns: PropTypes.array,
	/** The parameters of the default sort. */
	defaultSort: PropTypes.shape({
		columnId: PropTypes.string,
		order: PropTypes.string,
	}),
	/** The mode rows are displayed. */
	rowMode: PropTypes.oneOf(['line', 'zebra']),
	/** The data to display. */
	data: PropTypes.array.isRequired,
	/** The number of rows added in most recent update. */
	addedCount: PropTypes.number,
	/** The message to display when the table is empty. */
	emptyTableText: PropTypes.string,
	/** The id of the highlighted row. */
	highlightId: PropTypes.string,
	/** The id of the selected row. */
	selectedId: PropTypes.string,
	/** Whether the previous page is being retrieved. */
	fetchingPrevPage: PropTypes.bool,
	/** Whether the next page is being retrieved. */
	fetchingNextPage: PropTypes.bool,
	/** Function to get the row id. */
	getRowId: PropTypes.func.isRequired,
	/** Function to request previous page of data. */
	requestPrevPage: PropTypes.func,
	/** Function to request next page of data. */
	requestNextPage: PropTypes.func,
	/** Function invoked to clear highlight. */
	onHighlightClear: PropTypes.func,
	/** Function invoked when a given row is clicked. */
	onRowClick: PropTypes.func,
};

DataTable.defaultProps = {
	rowMode: 'line',
};

export default DataTable;
