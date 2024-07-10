import {useCallback, useLayoutEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {t} from '@bluecateng/l10n.macro';

import moveEffect from '../functions/moveEffect';

import Dialog from './Dialog';
import Button from './Button';
import ListSelector from './ListSelector';

import './ListSelectorDialog.less';

const getListItems = () => document.getElementById('listSelector').querySelectorAll('.ListSelector__list > *');

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
	const liveRef = useRef();
	const [items, setItems] = useState(initialItems);
	const handleRestore = useCallback(() => {
		setItems(defaultItems);
		liveRef.current.textContent = t`The default settings have been restored.`;
		const m = new Map();
		for (const element of getListItems()) {
			m.set(element.dataset.key, element.getBoundingClientRect());
		}
		animationsRef.current = {m};
	}, [defaultItems, liveRef]);

	const handleSubmit = useCallback(() => onSave(items), [onSave, items]);

	useLayoutEffect(() => {
		const animations = animationsRef.current;
		if (animations) {
			animationsRef.current = null;
			const {m} = animations;
			for (const element of getListItems()) {
				moveEffect(element, m.get(element.dataset.key));
			}
		}
	});

	return (
		<Dialog title={title} size="sm" stretch>
			<div>
				<div className="sr-only" aria-live="polite" ref={liveRef} />
				<ListSelector
					id="listSelector"
					items={items}
					allItems={allItems}
					emptyText={emptyText}
					allItemsRemovedText={allItemsRemovedText}
					getLabel={getLabel}
					onChange={setItems}
				/>
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
