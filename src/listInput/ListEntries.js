import React, {cloneElement, useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash-es/debounce';
import {scrollIntoView} from '@bluecat/helpers';

import SvgIcon from '../components/SvgIcon';
import timesThin from '../icons/timesThin';
import __ from '../strings';

import './ListEntries.less';

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
	id: PropTypes.string,
	highlightKey: PropTypes.string,
	list: PropTypes.array,
	column: PropTypes.bool,
	getItemKey: PropTypes.func,
	renderItem: PropTypes.func,
	onRemoveClick: PropTypes.func,
	onHighlightClear: PropTypes.func,
};

export default ListEntries;
