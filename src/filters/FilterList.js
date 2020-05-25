import React, {useCallback, useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';

import handleButtonKeyDown from '../functions/handleButtonKeyDown';
import addResizeObserver from '../functions/addResizeObserver';
import SvgIcon from '../components/SvgIcon';
import timesThin from '../icons/timesThin';
import __ from '../strings';

import './FilterList.less';

const showChevrons = (filterList, {width}) => {
	if (width < filterList.firstChild.scrollWidth) {
		filterList.previousSibling.classList.add('FilterList__scrollLeft--visible');
		filterList.nextSibling.classList.add('FilterList__scrollRight--visible');
	} else {
		filterList.previousSibling.classList.remove('FilterList__scrollLeft--visible');
		filterList.nextSibling.classList.remove('FilterList__scrollRight--visible');
	}
};

/** Displays a list of filters. */
const FilterList = ({filters, excludedKeys, filterEditor: FilterEditor, getFilterTitle, getValues, onApply}) => {
	const filterRef = useRef(null);
	const [filter, setFilter] = useState(null);
	const handleClickLeft = useCallback(() => (filterRef.current.scrollLeft += -100), []);
	const handleClickRight = useCallback(() => (filterRef.current.scrollLeft += 100), []);

	const handleClose = useCallback(() => setFilter(null), []);
	const handleSave = useCallback((values) => (setFilter(null), onApply(filter, values)), [filter, onApply]);

	const handleClick = useCallback(
		(event) => {
			const target = event.target;
			const remove = target.closest('[data-kind="remove"]');
			if (remove) {
				event.stopPropagation();
				onApply(remove.dataset.key, null);
			} else {
				const item = target.closest('[data-kind="item"]');
				if (item) {
					event.stopPropagation();
					setFilter(item.dataset.key);
				}
			}
		},
		[onApply]
	);

	useEffect(() => addResizeObserver(filterRef.current, (rect) => showChevrons(filterRef.current, rect)), []);
	useEffect(() => {
		const filterList = filterRef.current;
		showChevrons(filterList, filterList.getBoundingClientRect());
	});

	return (
		<div className="FilterList">
			<div
				className="FilterList__scrollLeft"
				tabIndex="0"
				role="button"
				aria-label={__('SCROLL_LEFT')}
				onClick={handleClickLeft}
				onKeyDown={handleButtonKeyDown}>
				<SvgIcon icon={faChevronLeft} />
			</div>
			<div id="filterListTrack" className="FilterList__track" ref={filterRef}>
				<div className="FilterList__items" onClick={handleClick} onKeyDown={handleButtonKeyDown}>
					{filters &&
						Object.entries(filters).map(([key, v]) =>
							!excludedKeys.includes(key) ? (
								<div
									key={key}
									id={`filter-${key}`}
									className="FilterList__item"
									tabIndex="0"
									role="button"
									aria-haspopup="dialog"
									aria-expanded={key === filter}
									aria-controls={key === filter ? 'filterListDropDown' : null}
									data-kind="item"
									data-key={key}>
									<span className="FilterList__filterTitle">{getFilterTitle(key)}</span>
									{getValues(key, v)}
									<span
										id={`filter-${key}-remove`}
										className="FilterList__remove"
										tabIndex="0"
										role="button"
										aria-label={__('REMOVE_OBJECT', {name: getFilterTitle(key)})}
										data-kind="remove"
										data-key={key}>
										<SvgIcon icon={timesThin} />
									</span>
								</div>
							) : null
						)}
				</div>
			</div>
			<div
				className="FilterList__scrollRight"
				tabIndex="0"
				role="button"
				aria-label={__('SCROLL_RIGHT')}
				onClick={handleClickRight}
				onKeyDown={handleButtonKeyDown}>
				<SvgIcon icon={faChevronRight} />
			</div>
			{filter &&
				createPortal(
					<FilterEditor
						filter={filter}
						filters={filters}
						buttonId={`filter-${filter}`}
						trackId="filterListTrack"
						onClose={handleClose}
						onSave={handleSave}
					/>,
					document.body
				)}
		</div>
	);
};

FilterList.propTypes = {
	/** The filters to display. */
	filters: PropTypes.object,
	/** The filter keys to exclude. */
	excludedKeys: PropTypes.array,
	/** The editor component. */
	filterEditor: PropTypes.elementType,
	/** Function returning the filter title. */
	getFilterTitle: PropTypes.func,
	/** Function returning the filter values. */
	getValues: PropTypes.func,
	/** Function invoked to apply changes. */
	onApply: PropTypes.func,
};

FilterList.defaultProps = {
	excludedKeys: [],
};

export default FilterList;
