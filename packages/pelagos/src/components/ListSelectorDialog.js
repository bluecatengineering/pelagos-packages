import {useCallback, useLayoutEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {t} from '@bluecateng/l10n.macro';
import ArrowLeft from '@carbon/icons-react/es/ArrowLeft';
import ArrowRight from '@carbon/icons-react/es/ArrowRight';
import Draggable from '@carbon/icons-react/es/Draggable';

import moveListItem from '../functions/moveListItem';
import slideUpEffect from '../functions/slideUpEffect';
import slideDownEffect from '../functions/slideDownEffect';
import moveEffect from '../functions/moveEffect';
import useReorder from '../hooks/useReorder';

import Dialog from './Dialog';
import Label from './Label';
import Button from './Button';

import './ListSelectorDialog.less';

const collator = new Intl.Collator(undefined, {sensitivity: 'base'});

/** A dialog to select a subset of items from a list. */
const ListSelectorDialog = ({
	title,
	emptyText,
	allItemsRemovedText,
	saveText,
	items: initialItems,
	allItems,
	defaultItems,
	getLabel,
	onClose,
	onSave,
}) => {
	const animationsRef = useRef();
	const [items, setItems] = useState(initialItems);
	const availableItems = useMemo(
		() =>
			allItems
				.filter((key) => !items.includes(key))
				.map((key) => ({key, label: getLabel(key)}))
				.sort((a, b) => collator.compare(a.label, b.label)),
		[allItems, items, getLabel]
	);

	const getElementName = useCallback((element) => getLabel(items[+element.dataset.index]), [items, getLabel]);
	const updateList = useCallback((fromIndex, toIndex) => setItems(moveListItem(items, fromIndex, toIndex)), [items]);
	const [reorderRef, liveRef] = useReorder(
		'.ListSelectorDialog__entry',
		'.ListSelectorDialog__name',
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
				const r = parentNode.getBoundingClientRect();
				animationsRef.current = {t: 1, r, i: `item-${addedKey}`, u: parentNode.nextSibling};
				setItems((items) => [...items, addedKey]);
				const name = getLabel(addedKey);
				liveRef.current.textContent = t`${name} added`;
			}
		},
		[getLabel, liveRef]
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
					t: 1,
					r,
					i: `item-${removedKey}`,
					u: parentNode.nextSibling,
					d: nextItem && document.getElementById(`item-${nextItem.key}`).parentNode,
				};
				setItems((items) => {
					liveRef.current.textContent =
						items.length === 1 ? t`${name} removed. ${allItemsRemovedText}` : t`${name} removed`;
					return items.filter((key) => key !== removedKey);
				});
			}
		},
		[allItemsRemovedText, availableItems, getLabel, liveRef]
	);

	const handleRestore = useCallback(() => {
		setItems(defaultItems);
		liveRef.current.textContent = t`The default settings have been restored.`;
		const m = new Map();
		for (const element of document.querySelectorAll('.ListSelectorDialog__list > *')) {
			m.set(element.dataset.key, element.getBoundingClientRect());
		}
		animationsRef.current = {t: 2, m};
	}, [defaultItems, liveRef]);

	const handleSubmit = useCallback(() => onSave(items), [onSave, items]);

	useLayoutEffect(() => {
		const animations = animationsRef.current;
		if (animations) {
			animationsRef.current = null;
			switch (animations.t) {
				case 1: {
					const {i, r, u, d} = animations;
					if (u) {
						slideUpEffect(u);
					}
					if (d) {
						slideDownEffect(d);
					}
					moveEffect(document.getElementById(i).parentNode, r);
					break;
				}
				case 2: {
					const {m} = animations;
					for (const element of document.querySelectorAll('.ListSelectorDialog__list > *')) {
						moveEffect(element, m.get(element.dataset.key));
					}
					break;
				}
			}
		}
	});

	return (
		<Dialog title={title} size="sm" stretch>
			<div>
				<div id="item-reorder-operation" className="sr-only">
					{t`Press space bar to reorder`}
				</div>
				<div className="sr-only" aria-live="assertive" ref={liveRef} />
				<div className="ListSelectorDialog__lists">
					<div className="ListSelectorDialog__column">
						<Label id="ListSelectorDialogAvailable" text={t`Available`} />
						<div
							className="ListSelectorDialog__list"
							role="list"
							aria-labelledby="ListSelectorDialogAvailable"
							onClick={handleAddItem}>
							{availableItems.map(({key, label}) => {
								const labelId = `item-${key}`;
								return (
									<div
										key={key}
										className="ListSelectorDialog__available"
										role="listitem"
										aria-labelledby={labelId}
										data-key={key}>
										<div id={labelId}>{label}</div>
										<button className="ListSelectorDialog__add" type="button" aria-label={t`Add ${label}`}>
											<ArrowRight />
										</button>
									</div>
								);
							})}
						</div>
					</div>
					<div className="ListSelectorDialog__column">
						<Label id="ListSelectorDialogSelected" text={t`Selected`} />
						<div
							className="ListSelectorDialog__list"
							role="list"
							aria-labelledby="ListSelectorDialogSelected"
							ref={reorderRef}
							onClick={handleRemoveItem}>
							{items.map((key, index) => {
								const name = getLabel(key);
								const labelId = `item-${key}`;
								return (
									<div
										key={key}
										className="ListSelectorDialog__entry"
										tabIndex="0"
										role="listitem"
										aria-labelledby={labelId}
										aria-describedby="item-reorder-operation"
										data-key={key}
										data-index={index}>
										<button className="ListSelectorDialog__remove" type="button" aria-label={t`Remove ${name}`}>
											<ArrowLeft />
										</button>
										<div id={labelId} className="ListSelectorDialog__name draggable">
											<span className="ListSelectorDialog__text">{name}</span>
											<Draggable className="ListSelectorDialog__grip" />
										</div>
									</div>
								);
							})}
							{!items.length && <div className="ListSelectorDialog__empty">{emptyText}</div>}
						</div>
					</div>
				</div>
				{defaultItems && (
					<div className="ListSelectorDialog__buttons">
						<Button text={t`Restore defaults`} size="small" onClick={handleRestore} />
					</div>
				)}
			</div>
			<div>
				<Button id="closeDialogBtn" text={t`Cancel`} onClick={onClose} />
				<Button id="saveItemsBtn" text={saveText} type="primary" disabled={!items.length} onClick={handleSubmit} />
			</div>
		</Dialog>
	);
};

ListSelectorDialog.propTypes = {
	/** The dialog title. */
	title: PropTypes.string,
	/** The text to display when no items are selected. */
	emptyText: PropTypes.string,
	/** The text to announce when all items are removed. */
	allItemsRemovedText: PropTypes.string,
	/** The text to display in the save button. */
	saveText: PropTypes.string,
	/** The current items. */
	items: PropTypes.arrayOf(PropTypes.string),
	/** All items which can be selected. */
	allItems: PropTypes.arrayOf(PropTypes.string),
	/** The default items. */
	defaultItems: PropTypes.arrayOf(PropTypes.string),
	/** Function returning the item label. */
	getLabel: PropTypes.func,
	/** Function invoked when the close button is clicked. */
	onClose: PropTypes.func,
	/** Function invoked when the save button is clicked. */
	onSave: PropTypes.func,
};

export default ListSelectorDialog;
