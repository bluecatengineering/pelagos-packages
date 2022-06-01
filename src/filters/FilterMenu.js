import {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import {t} from '@bluecat/l10n.macro';
import {faFilter} from '@fortawesome/free-solid-svg-icons';

import IconMenu from '../components/IconMenu';
import IconMenuItem from '../components/IconMenuItem';

import './FilterMenu.less';

/** A menu for adding filters. */
const FilterMenu = ({options, filters, filterEditor: FilterEditor, getOptionText, onApply}) => {
	const [filterName, setFilterName] = useState(null);

	const filteredOptions = !filters ? options : options.filter((key) => !filters[key]);

	const handleOptionClick = useCallback((event) => setFilterName(event.target.dataset.key), []);
	const handleClose = useCallback(() => setFilterName(null), []);
	const handleSave = useCallback((value) => (setFilterName(null), onApply(filterName, value)), [filterName, onApply]);

	return (
		<>
			<IconMenu
				id="filterButton"
				className={`FilterMenu${filterName ? ' FilterMenu--active' : ''}`}
				icon={faFilter}
				disabled={filteredOptions.length === 0}
				tooltipText={t`Add filter`}
				tooltipPlacement="top"
				aria-label={t`Add filter`}
			>
				{filteredOptions.map((key) => (
					<IconMenuItem key={key} text={getOptionText(key)} data-key={key} onClick={handleOptionClick} />
				))}
			</IconMenu>
			{filterName &&
				createPortal(
					<FilterEditor
						name={filterName}
						value={filters?.[filterName]}
						buttonId="filterButton"
						onClose={handleClose}
						onSave={handleSave}
					/>,
					document.body
				)}
		</>
	);
};

FilterMenu.propTypes = {
	/** The menu options. */
	options: PropTypes.array.isRequired,
	/** The current set of filters. */
	filters: PropTypes.object,
	/** The filter editor component. */
	filterEditor: PropTypes.elementType,
	/** Function returning the option text. */
	getOptionText: PropTypes.func.isRequired,
	/** Function invoked to apply changes. */
	onApply: PropTypes.func,
};

export default FilterMenu;
