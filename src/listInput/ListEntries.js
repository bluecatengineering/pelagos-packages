import React, {cloneElement, useCallback, useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash-es/debounce';
import {scrollIntoView} from '@bluecat/helpers';

import useButtonKeyHandler from '../hooks/useButtonKeyHandler';
import renderListItem from '../listItems/renderListItem';
import SvgIcon from '../components/SvgIcon';
import timesThin from '../icons/timesThin';
import useLiveText from '../hooks/useLiveText';
import __ from '../strings';

import './ListEntries.less';

/** A list of entries. */
const ListEntries = ({
	id,
	highlightKey,
	list,
	column,
	getItemKey,
	getItemName,
	renderItem,
	onRemoveClick,
	onHighlightClear,
}) => {
	const clearHighlight = useMemo(() => onHighlightClear && debounce(onHighlightClear, 1000), [onHighlightClear]);

	const setLiveText = useLiveText();

	const handleClick = useCallback(
		(event) => {
			const target = event.target.closest('[data-index]');
			if (target) {
				const index = +target.dataset.index;
				const item = list[index];
				setLiveText(__('OBJECT_REMOVED', {name: getItemName(item)}));
				onRemoveClick(item, index);
			}
		},
		[list, onRemoveClick, getItemName, setLiveText]
	);

	const handleKeyDown = useButtonKeyHandler();

	useEffect(() => {
		if (highlightKey) {
			const element = document.querySelector('.ListEntries__item--highlight');
			if (element) {
				scrollIntoView(element, {smooth: true, duration: 150});
			}
			clearHighlight();
		}
		return clearHighlight && clearHighlight.cancel;
	}, [highlightKey, clearHighlight]);

	return (
		<div id={id} className="ListEntries" role="list" onClick={handleClick} onKeyDown={handleKeyDown}>
			{list.map((item, i) => {
				const name = getItemName(item);
				const element = renderItem ? renderItem(item) : renderListItem(name);
				let className = element.props.className;
				className = className ? className + ' ListEntries__name' : 'ListEntries__name';
				const itemKey = getItemKey(item, i);
				return (
					<div
						key={itemKey}
						className={
							'ListEntries__item ' +
							(itemKey === highlightKey ? ' ListEntries__item--highlight' : '') +
							(column ? '' : ' ListEntries__gridItem')
						}
						role="listitem"
						data-bcn-id="list-item">
						<div
							data-bcn-id="remove-item"
							className="ListEntries__icon"
							tabIndex="0"
							role="button"
							aria-label={__('REMOVE_OBJECT', {name})}
							data-index={i}>
							<SvgIcon icon={timesThin} />
						</div>
						{cloneElement(element, {className})}
					</div>
				);
			})}
		</div>
	);
};

ListEntries.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The key of the highlighted row. */
	highlightKey: PropTypes.string,
	/** The data for the list. */
	list: PropTypes.array,
	/** Whether items are listed as columns. */
	column: PropTypes.bool,
	/** Function invoked to get each item's key. */
	getItemKey: PropTypes.func,
	/** Function invoked to get each item's name. */
	getItemName: PropTypes.func,
	/** Function invoked to render each list item. */
	renderItem: PropTypes.func,
	/** Function invoked when the remove button is clicked. */
	onRemoveClick: PropTypes.func,
	/** Function invoked to clear the highlight key. */
	onHighlightClear: PropTypes.func,
};

export default ListEntries;
