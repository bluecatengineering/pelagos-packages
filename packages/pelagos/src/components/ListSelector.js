import {forwardRef, useCallback, useLayoutEffect, useMemo, useRef} from 'react';
import PropTypes from 'prop-types';
import {t} from '@bluecateng/l10n.macro';
import ArrowRight from '@carbon/icons-react/es/ArrowRight';
import ArrowLeft from '@carbon/icons-react/es/ArrowLeft';
import Draggable from '@carbon/icons-react/es/Draggable';

import moveListItem from '../functions/moveListItem';
import slideUpEffect from '../functions/slideUpEffect';
import slideDownEffect from '../functions/slideDownEffect';
import moveEffect from '../functions/moveEffect';
import useReorder from '../hooks/useReorder';
import useRandomId from '../hooks/useRandomId';

import Label from './Label';
import Layer from './Layer';

import './ListSelector.less';

const collator = new Intl.Collator(undefined, {sensitivity: 'base'});

/** A component to select a subset of items from a list. */
const ListSelector = forwardRef(
	({id, className, items, allItems, emptyText, allItemsRemovedText, getLabel, onChange}, ref) => {
		id = useRandomId(id);
		const animationsRef = useRef(null);
		const availableItems = useMemo(
			() =>
				allItems
					.filter((key) => !items.includes(key))
					.map((key) => ({key, label: getLabel(key)}))
					.sort((a, b) => collator.compare(a.label, b.label)),
			[allItems, items, getLabel]
		);

		const getElementName = useCallback((element) => getLabel(items[+element.dataset.index]), [items, getLabel]);
		const updateList = useCallback(
			(fromIndex, toIndex) => onChange(moveListItem(items, fromIndex, toIndex)),
			[items, onChange]
		);
		const [reorderRef, liveRef] = useReorder(
			'.ListSelector__entry',
			'.ListSelector__name',
			items.length,
			getElementName,
			updateList
		);

		const handleAddItem = useCallback(
			(event) => {
				const target = event.target.closest('button');
				if (target) {
					const parentNode = target.parentNode;
					const addedKey = parentNode.dataset.key;
					const name = getLabel(addedKey);
					const r = parentNode.getBoundingClientRect();
					animationsRef.current = {r, i: `item-${addedKey}`, u: parentNode.nextSibling, m: t`${name} added`};
					onChange([...items, addedKey]);
				}
			},
			[getLabel, items, onChange]
		);

		const handleRemoveItem = useCallback(
			(event) => {
				const target = event.target.closest('button');
				if (target) {
					const parentNode = target.parentNode;
					const removedKey = parentNode.dataset.key;
					const name = getLabel(removedKey);
					const nextItem = availableItems.find((item) => collator.compare(name, item.label) < 0);
					const r = parentNode.getBoundingClientRect();
					animationsRef.current = {
						r,
						i: `item-${removedKey}`,
						u: parentNode.nextSibling,
						d: nextItem && document.getElementById(`item-${nextItem.key}`).parentNode,
						m: items.length === 1 ? t`${name} removed. ${allItemsRemovedText}` : t`${name} removed`,
					};
					onChange(items.filter((key) => key !== removedKey));
				}
			},
			[allItemsRemovedText, availableItems, getLabel, items, onChange]
		);

		useLayoutEffect(() => {
			const animations = animationsRef.current;
			if (animations) {
				animationsRef.current = null;
				const {i, r, u, d, m} = animations;
				if (u) {
					slideUpEffect(u);
				}
				if (d) {
					slideDownEffect(d);
				}
				const label = document.getElementById(i);
				moveEffect(label.parentNode, r);
				if (label.previousSibling) {
					label.previousSibling.focus();
				} else {
					label.nextSibling.focus();
				}
				liveRef.current.textContent = m;
			}
		});

		const availableId = `${id}-available`;
		const selectedId = `${id}-selected`;
		const operationId = `${id}-operation`;
		return (
			<div id={id} className={`ListSelector${className ? ` ${className}` : ''}`} ref={ref}>
				<div className="sr-only" aria-live="polite" ref={liveRef} />
				<div id={operationId} className="sr-only">
					{t`Press space bar to reorder`}
				</div>
				<div className="ListSelector__column">
					<Label id={selectedId} text={t`Selected`} />
					<div
						className="ListSelector__list"
						role="list"
						aria-labelledby={selectedId}
						ref={reorderRef}
						onClick={handleRemoveItem}>
						{items.map((key, index) => {
							const name = getLabel(key);
							const labelId = `item-${key}`;
							return (
								<Layer
									key={key}
									className="ListSelector__entry"
									tabIndex="0"
									role="listitem"
									aria-labelledby={labelId}
									aria-describedby={operationId}
									data-key={key}
									data-index={index}>
									<div id={labelId} className="ListSelector__name draggable">
										<Draggable className="ListSelector__grip" />
										<span className="ListSelector__text" title={name}>
											{name}
										</span>
									</div>
									<button className="ListSelector__remove" type="button" aria-label={t`Remove ${name}`}>
										<ArrowRight />
									</button>
								</Layer>
							);
						})}
						{!items.length && <div className="ListSelector__empty">{emptyText}</div>}
					</div>
				</div>
				<div className="ListSelector__column">
					<Label id={availableId} text={t`Available`} />
					<div className="ListSelector__list" role="list" aria-labelledby={availableId} onClick={handleAddItem}>
						{availableItems.map(({key, label}) => {
							const labelId = `item-${key}`;
							return (
								<Layer
									key={key}
									className="ListSelector__available"
									role="listitem"
									aria-labelledby={labelId}
									data-key={key}>
									<button className="ListSelector__add" type="button" aria-label={t`Add ${label}`}>
										<ArrowLeft />
									</button>
									<span id={labelId} className="ListSelector__text" title={label}>
										{label}
									</span>
								</Layer>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
);

ListSelector.displayName = 'ListSelector';

ListSelector.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The current items. */
	items: PropTypes.arrayOf(PropTypes.string).isRequired,
	/** All items which can be selected. */
	allItems: PropTypes.arrayOf(PropTypes.string).isRequired,
	/** The text to display when no items are selected. */
	emptyText: PropTypes.string,
	/** The text to announce when all items are removed. */
	allItemsRemovedText: PropTypes.string.isRequired,
	/** Function returning the item label. */
	getLabel: PropTypes.func.isRequired,
	/** Function invoked when the list changes. */
	onChange: PropTypes.func,
};

export default ListSelector;
