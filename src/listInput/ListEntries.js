import React, {cloneElement, useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash-es/debounce';
import {scrollIntoView} from '@bluecat/helpers';

import SvgIcon from '../components/SvgIcon';
import timesThin from '../icons/timesThin';
import __ from '../strings';

import './ListEntries.less';

/** A list of entries. */
const ListEntries = ({id, highlightKey, list, column, getItemKey, renderItem, onRemoveClick, onHighlightClear}) => {
	const clearHighlight = useMemo(() => onHighlightClear && debounce(onHighlightClear, 1000), [onHighlightClear]);

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
		<div id={id} className="ListEntries">
			{list.map((item, i) => {
				const element = renderItem(item);
				let className = element.props.className;
				className = className ? className + ' ListEntries__name' : 'ListEntries__name';
				const itemKey = getItemKey(item, i);
				return (
					<div
						data-bcn-id="list-item"
						className={
							'ListEntries__item ' +
							(itemKey === highlightKey ? ' ListEntries__item--highlight' : '') +
							(column ? '' : ' ListEntries__gridItem')
						}
						key={itemKey}>
						<div
							data-bcn-id="remove-item"
							className="ListEntries__icon"
							role="button"
							aria-label={__('REMOVE')}
							onClick={() => onRemoveClick(item, i)}>
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
	/** Function invoked to render each list item. */
	renderItem: PropTypes.func,
	/** Function invoked when the remove button is clicked. */
	onRemoveClick: PropTypes.func,
	/** Function invoked to clear the highlight key. */
	onHighlightClear: PropTypes.func,
};

export default ListEntries;
