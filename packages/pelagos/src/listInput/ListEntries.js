import {cloneElement, useCallback, useEffect, useMemo, useRef} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash-es/debounce';
import {t} from '@bluecateng/l10n.macro';
import Close from '@carbon/icons-react/es/Close';

import renderListItem from '../listItems/renderListItem';
import scrollIntoView from '../functions/scrollIntoView';

import './ListEntries.less';

/** A list of entries. */
const ListEntries = ({
	id,
	className,
	highlightKey,
	list,
	column,
	getItemKey,
	getItemName,
	renderItem,
	onRemoveClick,
	onHighlightClear,
}) => {
	const liveRef = useRef(null);

	const clearHighlight = useMemo(() => onHighlightClear && debounce(onHighlightClear, 1000), [onHighlightClear]);

	const handleClick = useCallback(
		(event) => {
			const target = event.target.closest('[data-index]');
			if (target) {
				const index = +target.dataset.index;
				const item = list[index];
				const name = getItemName(item);
				liveRef.current.textContent = t`${name} removed`;
				onRemoveClick(item, index);
			}
		},
		[list, onRemoveClick, getItemName]
	);

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
		<>
			<div className="sr-only" aria-live="polite" ref={liveRef} />
			<ul
				id={id}
				className={`ListEntries ListEntries--${column ? 'column' : 'grid'}${className ? ` ${className}` : ''}`}
				onClick={handleClick}>
				{list.map((item, i) => {
					const name = getItemName(item);
					const element = renderItem ? renderItem(item) : renderListItem(name);
					let className = element.props.className;
					className = className ? `${className} ListEntries__name` : 'ListEntries__name';
					const itemKey = getItemKey(item, i);
					return (
						<li
							key={itemKey}
							className={`ListEntries__item${itemKey === highlightKey ? ' ListEntries__item--highlight' : ''}`}
							data-testid="list-item">
							<button
								className="ListEntries__icon"
								type="button"
								aria-label={t`Remove ${name}`}
								data-testid="remove-item"
								data-index={i}>
								<Close />
							</button>
							{cloneElement(element, {className})}
						</li>
					);
				})}
			</ul>
		</>
	);
};

ListEntries.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
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
