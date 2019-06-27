import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash-es/throttle';
import stableSort from 'stable';
import {buildHighlighter, smoothScroll, scrollToItem} from '@bluecat/helpers';
import {faSort, faSortDown, faSortUp} from '@fortawesome/free-solid-svg-icons';

import SvgIcon from './SvgIcon';
import Spinner from './Spinner';
import './DataTable.less';

const getRow = (element, index) => element.querySelector('table').tBodies[0].children[index];

const sortData = (data, metadata, dataSort, defaultSortColumnId) => {
	if (!dataSort) {
		return data;
	}

	const sortColumnId = dataSort.columnId;
	const sortIndex = metadata.findIndex(m => m.id === sortColumnId);

	const secondarySortIndex = metadata.findIndex(m => m.id === defaultSortColumnId);

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

const renderHeaders = (metadata, dataSort, onClick) =>
	metadata.map(col => {
		const sortOrder = dataSort && dataSort.columnId === col.id ? dataSort.order : null;
		const ariaSort = !col.sortable ? null : sortOrder === 'a' ? 'ascending' : sortOrder === 'd' ? 'descending' : 'none';
		return (
			<th
				key={col.id}
				style={{...col.style, width: col.width}}
				className="DataTable__th"
				aria-sort={ariaSort}
				onClick={col.sortable ? () => onClick(col) : null}>
				<span>
					{col.header}
					{col.sortable && (
						<SvgIcon
							className={'DataTable__sort' + (sortOrder ? ' DataTable__sort--active' : '')}
							icon={sortOrder === 'a' ? faSortDown : sortOrder === 'd' ? faSortUp : faSort}
						/>
					)}
				</span>
			</th>
		);
	});

const renderRows = (data, metadata, selectedId, highlightId, focused, getRowId, onRowClick) =>
	data.map((row, rowIndex) => {
		const rowId = getRowId(row);
		const className =
			'DataTable__row' +
			(rowId === highlightId ? ' DataTable__row--highlight' : '') +
			(onRowClick ? ' DataTable__row--clickable' : '') +
			(focused === rowIndex ? ' DataTable__row--focused' : '');

		return (
			<tr key={rowIndex} id={rowId} className={className} aria-selected={selectedId === rowId} data-index={rowIndex}>
				{metadata.map(col => (
					<td
						key={col.id}
						style={{...col.style, width: col.width}}
						title={col.hoverValue ? col.value(row, rowIndex) : ''}
						className={'DataTable__td' + (col.className ? ' ' + col.className(row, rowIndex) : '')}>
						{col.value(row, rowIndex)}
					</td>
				))}
			</tr>
		);
	});

const DataTable = ({
	id,
	className,
	metadata,
	data,
	defaultSort,
	addedCount,
	emptyTableText,
	highlightId,
	selectedId,
	isFetchingPrevDataPage,
	isFetchingNextDataPage,
	getRowId,
	requestNextDataPage,
	requestPrevDataPage,
	onHighlightClear,
	onRowClick,
}) => {
	const [dataSort, setDataSort] = useState(defaultSort);
	const [focused, setFocused] = useState(-1);

	const tableBody = useRef(null);
	const isLoadingNextData = useRef(false);
	const isLoadingPrevData = useRef(false);
	const defaultSortColumnId = useRef(defaultSort ? defaultSort.columnId : null);

	const sortedData = useMemo(() => sortData(data, metadata, dataSort, defaultSortColumnId.current), [
		data,
		metadata,
		dataSort,
	]);

	const updateFocused = useCallback(index => {
		setFocused(index);
		const element = tableBody.current;
		scrollToItem(element, getRow(element, index));
	}, []);

	const updateSortColumn = useCallback(
		column =>
			setDataSort(
				dataSort && dataSort.columnId === column.id
					? {...dataSort, order: dataSort.order === 'a' ? 'd' : 'a'}
					: {columnId: column.id, order: 'a'}
			),
		[dataSort]
	);

	const handleScroll = useCallback(
		throttle(() => {
			if (isFetchingNextDataPage || isFetchingPrevDataPage || data.length === 0) {
				return;
			}

			const element = tableBody.current;
			if (element.clientHeight + element.scrollTop + 75 >= element.scrollHeight) {
				isLoadingNextData.current = requestNextDataPage();
				isLoadingPrevData.current = false;
			} else if (element.scrollTop <= 75) {
				isLoadingPrevData.current = requestPrevDataPage();
				isLoadingNextData.current = false;
			}
		}, 500),
		[data, isFetchingNextDataPage, isFetchingPrevDataPage]
	);

	const clearFocus = useCallback(() => setFocused(-1), []);

	const handleMouseOver = useCallback(event => {
		const element = event.target.closest('.DataTable__row');
		if (element) {
			setFocused(+element.dataset.index);
		}
	}, []);

	const handleClick = useCallback(
		event => {
			const element = event.target.closest('.DataTable__row');
			if (element) {
				event.preventDefault();
				event.nativeEvent.stopImmediatePropagation();
				tableBody.current.focus();
				onRowClick(sortedData[+element.dataset.index]);
			}
		},
		[sortedData, onRowClick]
	);

	const handleFocus = useCallback(() => {
		if (focused === -1) {
			const index = selectedId ? sortedData.findIndex(item => getRowId(item) === selectedId) : 0;
			setFocused(index);
			const element = tableBody.current;
			scrollToItem(element, getRow(element, index));
		}
	}, [focused, sortedData, selectedId, getRowId]);

	const handleKeyDown = useCallback(
		event => {
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
						const element = tableBody.current;
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
						break;
					}
					case 34: {
						// page down
						event.preventDefault();
						event.nativeEvent.stopImmediatePropagation();
						let i;
						const element = tableBody.current;
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
		event => {
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
		if (requestNextDataPage && requestPrevDataPage) {
			tableBody.current.addEventListener(
				'scroll',
				handleScroll,
				/Trident\//.test(navigator.userAgent) ? false : {passive: true}
			);
			return () => tableBody.current.removeEventListener('scroll', handleScroll);
		}
		return undefined;
	}, [requestNextDataPage, requestPrevDataPage, handleScroll]);

	useEffect(() => {
		if (highlightId) {
			buildHighlighter(false)(highlightId, onHighlightClear);
		}
	}, []);

	useEffect(() => {
		if (data.length === addedCount) {
			return;
		}

		const element = tableBody.current;
		if (isLoadingNextData.current && !isFetchingNextDataPage) {
			element.scrollTop = (element.scrollHeight / data.length) * (data.length - addedCount) - element.clientHeight;
			isLoadingNextData.current = false;
			if (focused !== -1) {
				setFocused(focused - addedCount);
			}
		} else if (isLoadingPrevData.current && !isFetchingPrevDataPage) {
			element.scrollTop = (element.scrollHeight / data.length) * addedCount;
			isLoadingPrevData.current = false;
			if (focused !== -1) {
				setFocused(focused + addedCount);
			}
		}
	});

	const showLoadingSpinner = isFetchingNextDataPage && (!data || data.length === 0);
	const displayTableMessage = !showLoadingSpinner && emptyTableText && (!data || data.length === 0);

	const headers = renderHeaders(metadata, dataSort, updateSortColumn);
	return (
		<div id={id} className={'DataTable' + (className ? ' ' + className : '')}>
			<div id={id + '-tableHeader'} className="DataTable__header">
				<table className="DataTable__table">
					<thead>
						<tr>{headers}</tr>
					</thead>
				</table>
			</div>
			<div id={id + '-tableBody'} className="DataTable__body" ref={tableBody}>
				{!displayTableMessage ? (
					<>
						{isFetchingPrevDataPage && (
							<div id={id + '-prevSpinner'} className="DataTable__spinner">
								<Spinner size="tiny" />
							</div>
						)}
						<table
							id={id + '-table'}
							className="DataTable__table"
							tabIndex="0"
							role="grid"
							aria-activedescendant={focused === -1 ? null : getRowId(sortedData[focused])}
							onMouseOver={handleMouseOver}
							onMouseOut={clearFocus}
							onClick={onRowClick ? handleClick : null}
							onFocus={handleFocus}
							onBlur={clearFocus}
							onKeyDown={handleKeyDown}
							onKeyUp={onRowClick ? handleKeyUp : null}>
							<thead className="DataTable__printHeader">
								<tr>{headers}</tr>
							</thead>
							<tbody>{renderRows(sortedData, metadata, selectedId, highlightId, focused, getRowId, onRowClick)}</tbody>
						</table>
						{isFetchingNextDataPage && (
							<div
								id={id + 'nextSpinner'}
								className={showLoadingSpinner ? 'DataTable__loadingSpinner' : 'DataTable__spinner'}>
								<Spinner size={showLoadingSpinner ? 'large' : 'tiny'} />
							</div>
						)}
					</>
				) : (
					<div id={id + '-tableMessage'} className="DataTable__message">
						{emptyTableText}
					</div>
				)}
			</div>
		</div>
	);
};

DataTable.propTypes = {
	id: PropTypes.string.isRequired,
	className: PropTypes.string,
	metadata: PropTypes.arrayOf(
		PropTypes.shape({
			header: PropTypes.string.isRequired,
			value: PropTypes.func.isRequired,
			width: PropTypes.string.isRequired,
			style: PropTypes.object,
			sortComparator: PropTypes.func,
		})
	).isRequired,
	data: PropTypes.array.isRequired,
	defaultSort: PropTypes.shape({
		columnId: PropTypes.string,
		order: PropTypes.string,
	}),
	addedCount: PropTypes.number.isRequired,
	emptyTableText: PropTypes.string,
	highlightId: PropTypes.string,
	selectedId: PropTypes.string,
	isFetchingPrevDataPage: PropTypes.bool,
	isFetchingNextDataPage: PropTypes.bool,
	getRowId: PropTypes.func.isRequired,
	requestNextDataPage: PropTypes.func,
	requestPrevDataPage: PropTypes.func,
	onHighlightClear: PropTypes.func,
	onRowClick: PropTypes.func,
};

export default DataTable;
