import {useCallback, useState} from 'react';
import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';
import {t} from '@bluecateng/l10n.macro';
import Close from '@carbon/icons-react/es/Close';

import Layer from '../components/Layer';
import ScrollBox from '../components/ScrollBox';
import MenuArrow from '../components/MenuArrow';

import FilterEditor from './LegacyFilterEditor';
import './FilterList.less';

const renderEntry = (filterName, key, v, getFilterTitle, getValues) => {
	const name = getFilterTitle(key);
	return (
		<Layer key={key} as="li" className="FilterList__item">
			<button
				id={`filter-${key}`}
				className="FilterList__button"
				type="button"
				aria-haspopup="dialog"
				aria-expanded={key === filterName}
				aria-controls={key === filterName ? 'filterListDropDown' : null}
				data-kind="item"
				data-key={key}>
				<span className="FilterList__filterTitle">{name}</span>
				{getValues(key, v)}
				<MenuArrow />
			</button>
			<button
				id={`filter-${key}-remove`}
				className="FilterList__remove"
				type="button"
				aria-label={t`Remove ${name} filter`}
				data-kind="remove"
				data-key={key}>
				<Close />
			</button>
		</Layer>
	);
};

/** @deprecated use FilterArea instead. */
const FilterList = ({className, filters, excludedKeys = [], getFilterTitle, getValues, getEditor, onApply}) => {
	const [filterName, setFilterName] = useState(null);

	const handleClose = useCallback(() => setFilterName(null), []);
	const handleSave = useCallback((value) => (setFilterName(null), onApply(filterName, value)), [filterName, onApply]);

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
					setFilterName(item.dataset.key);
				}
			}
		},
		[onApply]
	);

	return (
		<>
			<div className={`FilterList${className ? ` ${className}` : ''}`}>
				<ScrollBox trackId="filterListTrack">
					<ul className="FilterList__items" onClick={handleClick}>
						{filters &&
							Object.entries(filters).map(([key, v]) =>
								!excludedKeys.includes(key) ? renderEntry(filterName, key, v, getFilterTitle, getValues) : null
							)}
					</ul>
				</ScrollBox>
			</div>
			{filterName &&
				createPortal(
					<FilterEditor
						name={filterName}
						value={filters[filterName]}
						buttonId={`filter-${filterName}`}
						trackId="filterListTrack"
						getLabel={getFilterTitle}
						getEditor={getEditor}
						onClose={handleClose}
						onSave={handleSave}
					/>,
					document.body
				)}
		</>
	);
};

FilterList.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The filters to display. */
	filters: PropTypes.object,
	/** The filter keys to exclude. */
	excludedKeys: PropTypes.array,
	/** Function returning the filter title. */
	getFilterTitle: PropTypes.func,
	/** Function returning the filter values. */
	getValues: PropTypes.func,
	/** Function returning the filter editor. */
	getEditor: PropTypes.func,
	/** Function invoked to apply changes. */
	onApply: PropTypes.func,
};

export default FilterList;
