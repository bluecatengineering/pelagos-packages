import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash-es/throttle';
import stableSort from 'stable';
import {buildHighlighter} from '@bluecat/helpers';
import {faSort, faSortDown, faSortUp, faSpinner} from '@fortawesome/free-solid-svg-icons';

import SvgIcon from './SvgIcon';
import './DataTable.less';

const sortData = (dataSort, defaultSortColumnId, {data, metadata}) => {
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
	const sortOrderModifier = dataSort.order === 'asc' ? 1 : -1;

	return stableSort(data, (a, b) => {
		let sortValue = primarySortComparator(a, b) * sortOrderModifier;
		if (sortValue === 0 && secondarySortComparator) {
			sortValue = secondarySortComparator(a, b);
		}
		return sortValue;
	});
};

const renderHeaders = (dataSort, metadata, onClick) =>
	metadata.map(col => {
		const sortOrder = dataSort && dataSort.columnId === col.id ? dataSort.order : null;
		const style = {
			...col.style,
			width: col.width,
		};
		return (
			<th key={col.id} style={style} className="DataTable__th" onClick={col.sortable ? () => onClick(col) : null}>
				<span>
					{col.header}
					{col.sortable && (
						<SvgIcon
							className={'DataTable__sort' + (sortOrder ? ' DataTable__sort--active' : '')}
							icon={sortOrder === 'asc' ? faSortDown : sortOrder === 'desc' ? faSortUp : faSort}
						/>
					)}
				</span>
			</th>
		);
	});

const renderRows = (data, {metadata, selectedId, highlightId, getRowId, onRowClick}) =>
	data.map((row, rowIndex) => {
		const rowId = getRowId(row);
		const className =
			'DataTable__row' +
			(rowId === highlightId ? ' DataTable__row--highlight' : '') +
			(onRowClick ? ' DataTable__row--clickable' : '') +
			(selectedId === rowId ? ' DataTable__row--selected' : '');

		return (
			<tr
				className={className}
				id={rowId}
				key={rowIndex}
				onClick={onRowClick ? event => (event.nativeEvent.stopImmediatePropagation(), onRowClick(row, event)) : null}>
				{metadata.map(col => (
					<td
						key={col.id}
						style={{
							...col.style,
							width: col.width,
						}}
						title={col.hoverValue ? col.value(row, rowIndex) : ''}
						className={'DataTable__td' + (col.className ? ' ' + col.className(row, rowIndex) : '')}>
						{col.value(row, rowIndex)}
					</td>
				))}
			</tr>
		);
	});

export default class DataTable extends Component {
	static propTypes = {
		componentId: PropTypes.string,
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
		requestNextDataPage: PropTypes.func,
		requestPrevDataPage: PropTypes.func,
		isFetchingPrevDataPage: PropTypes.bool,
		isFetchingNextDataPage: PropTypes.bool,
		highlightId: PropTypes.string,
		selectedId: PropTypes.string,
		getRowId: PropTypes.func.isRequired,
		onHighlightClear: PropTypes.func,
		emptyTableText: PropTypes.string,
		onRowClick: PropTypes.func,
	};

	constructor(props) {
		super(props);

		this.isLoadingNextData = false;
		this.isLoadingPrevData = false;

		this.tableBody = createRef();
		this.highlightRow = buildHighlighter(false);
		this.defaultSortColumnId = this.props.defaultSort ? this.props.defaultSort.columnId : null;

		this.state = {
			dataSort: this.props.defaultSort,
		};
	}

	componentDidMount() {
		if (this.props.requestNextDataPage && this.props.requestPrevDataPage) {
			this.tableBody.current.addEventListener(
				'scroll',
				this.handleScroll,
				/Trident\//.test(navigator.userAgent) ? false : {passive: true}
			);
		}

		const highlightId = this.props.highlightId;
		if (highlightId) {
			this.highlightRow(highlightId, this.props.onHighlightClear);
		}
	}

	componentDidUpdate() {
		const data = this.props.data;
		const addedCount = this.props.addedCount;
		if (data.length === addedCount) {
			return;
		}

		const tableBody = this.tableBody.current;
		if (this.isLoadingNextData && !this.props.isFetchingNextDataPage) {
			tableBody.scrollTop =
				(tableBody.scrollHeight / data.length) * (data.length - addedCount) - tableBody.clientHeight;
			this.isLoadingNextData = false;
		} else if (this.isLoadingPrevData && !this.props.isFetchingPrevDataPage) {
			tableBody.scrollTop = (tableBody.scrollHeight / data.length) * addedCount;
			this.isLoadingPrevData = false;
		}
	}

	componentWillUnmount() {
		this.tableBody.current.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll = throttle(() => {
		if (this.props.isFetchingNextDataPage || this.props.isFetchingPrevDataPage || this.props.data.length === 0) {
			return;
		}

		const tableBody = this.tableBody.current;
		if (Math.ceil(tableBody.clientHeight + tableBody.scrollTop + 75) >= tableBody.scrollHeight) {
			this.isLoadingNextData = this.props.requestNextDataPage();
			this.isLoadingPrevData = false;
		} else if (tableBody.scrollTop <= 75) {
			this.isLoadingPrevData = this.props.requestPrevDataPage();
			this.isLoadingNextData = false;
		}
	}, 500);

	updateSortColumn = column => {
		let dataSort = this.state.dataSort;
		if (dataSort && dataSort.columnId === column.id) {
			dataSort.order = dataSort.order === 'asc' ? 'desc' : 'asc';
		} else {
			dataSort = {
				order: 'asc',
				columnId: column.id,
			};
		}

		this.setState({
			dataSort,
		});
	};

	render() {
		const {
			componentId,
			className,
			metadata,
			data,
			isFetchingPrevDataPage,
			isFetchingNextDataPage,
			emptyTableText,
		} = this.props;
		const showLoadingSpinner = isFetchingNextDataPage && (!data || data.length === 0);
		const displayTableMessage = !showLoadingSpinner && emptyTableText && (!data || data.length === 0);

		const headers = renderHeaders(this.state.dataSort, metadata, this.updateSortColumn);
		return (
			<div className={'DataTable' + (className ? ' ' + className : '')} data-bcn-id={componentId}>
				<div data-bcn-id="table-header" className="DataTable__header">
					<table className="DataTable__table">
						<thead>
							<tr>{headers}</tr>
						</thead>
					</table>
				</div>
				<div data-bcn-id="table-body" className="DataTable__body" ref={this.tableBody}>
					{!displayTableMessage ? (
						<>
							{isFetchingPrevDataPage && (
								<div data-bcn-id="spinner-datatable-prev" className="DataTable__spinner">
									<SvgIcon icon={faSpinner} animation="spin" />
								</div>
							)}
							<table className="DataTable__table" data-bcn-id="datatable-table">
								<thead className="DataTable__printHeader">
									<tr>{headers}</tr>
								</thead>
								<tbody>
									{renderRows(sortData(this.state.dataSort, this.defaultSortColumnId, this.props), this.props)}
								</tbody>
							</table>
							{isFetchingNextDataPage && (
								<div
									data-bcn-id="spinner-datatable-next"
									className={showLoadingSpinner ? 'DataTable__loadingSpinner' : 'DataTable__spinner'}>
									<SvgIcon icon={faSpinner} animation="spin" />
								</div>
							)}
						</>
					) : (
						<div data-bcn-id="table-message" className="DataTable__message">
							{emptyTableText}
						</div>
					)}
				</div>
			</div>
		);
	}
}
