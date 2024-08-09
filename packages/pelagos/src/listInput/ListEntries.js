import {t} from '@bluecateng/l10n.macro';
import Close from '@carbon/icons-react/es/Close';
import Draggable from '@carbon/icons-react/es/Draggable';
import debounce from 'lodash-es/debounce';
import PropTypes from 'prop-types';
import {useCallback, useEffect, useMemo} from 'react';

import Layer from '../components/Layer';
import moveListItem from '../functions/moveListItem';
import scrollIntoView from '../functions/scrollIntoView';
import useReorder from '../hooks/useReorder';
import renderListItem from '../listItems/renderListItem';

import './ListEntries.less';

/** A list of entries. */
const ListEntries = ({
	id,
	className,
	highlightKey,
	list,
	reorderable,
	column,
	getItemKey,
	getItemName,
	renderItem,
	onReorder = moveListItem,
	onRemoveClick,
	onHighlightClear,
}) => {
	const getElementName = useCallback((element) => getItemName(list[+element.dataset.index]), [list, getItemName]);
	const updateList = useCallback((fromIndex, toIndex) => onReorder(list, fromIndex, toIndex), [list, onReorder]);
	const [reorderRef, liveRef] = useReorder(
		'.ListEntries__item',
		'.ListEntries__name',
		list.length,
		getElementName,
		updateList
	);

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
		[list, getItemName, liveRef, onRemoveClick]
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

	const operationId = `${id}-operation`;
	return (
		<>
			<div className="sr-only" aria-live="polite" ref={liveRef} />
			{reorderable && (
				<div id={operationId} className="sr-only">
					{t`Press space bar to reorder`}
				</div>
			)}
			<ul
				ref={reorderRef}
				id={id}
				className={`ListEntries ListEntries--${column || reorderable ? 'column' : 'grid'}${className ? ` ${className}` : ''}`}
				onClick={handleClick}>
				{list.map((item, i) => {
					const name = getItemName(item);
					const element = renderItem ? renderItem(item) : renderListItem(name);
					const itemKey = getItemKey(item, i);
					return (
						<Layer
							key={itemKey}
							as="li"
							className={`ListEntries__item${itemKey === highlightKey ? ' ListEntries__item--highlight' : ''}`}
							tabIndex={reorderable ? 0 : undefined}
							aria-describedby={reorderable ? operationId : undefined}
							data-testid="list-item">
							<div className={`ListEntries__name${reorderable ? ' draggable' : ''}`}>
								{reorderable && <Draggable className="ListEntries__grip" />}
								{element}
							</div>
							<button
								className="ListEntries__icon"
								type="button"
								aria-label={t`Remove ${name}`}
								data-testid="remove-item"
								data-index={i}>
								<Close />
							</button>
						</Layer>
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
	/** Whether items are reorderable. */
	reorderable: PropTypes.bool,
	/** Whether items are listed as columns. */
	column: PropTypes.bool,
	/** Function invoked to get each item's key. Defaults to true if reorderable */
	getItemKey: PropTypes.func,
	/** Function invoked to get each item's name. */
	getItemName: PropTypes.func,
	/** Function invoked to render each list item. */
	renderItem: PropTypes.func,
	/** Function invoked when an item is reordered. */
	onReorder: PropTypes.func,
	/** Function invoked when the remove button is clicked. */
	onRemoveClick: PropTypes.func,
	/** Function invoked to clear the highlight key. */
	onHighlightClear: PropTypes.func,
};

export default ListEntries;
