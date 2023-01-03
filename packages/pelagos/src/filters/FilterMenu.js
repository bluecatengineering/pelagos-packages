import {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import {t} from '@bluecateng/l10n.macro';
import {faFilter} from '@fortawesome/free-solid-svg-icons';

import IconMenu from '../components/IconMenu';
import IconMenuItem from '../components/IconMenuItem';

import FilterEditor from './FilterEditor';
import './FilterMenu.less';

/** A menu for adding filters. */
const FilterMenu = ({flipped, options, filters, getOptionText, getEditor, onApply}) => {
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
				flipped={flipped}
				tooltipText={t`Add filter`}
				tooltipPlacement="top"
				aria-label={t`Add filter`}>
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
						getLabel={getOptionText}
						getEditor={getEditor}
						onClose={handleClose}
						onSave={handleSave}
					/>,
					document.body
				)}
		</>
	);
};

FilterMenu.propTypes = {
	/** Whether the menu alignment should be flipped. */
	flipped: PropTypes.bool,
	/** The menu options. */
	options: PropTypes.array.isRequired,
	/** The current set of filters. */
	filters: PropTypes.object,
	/** Function returning the option text. */
	getOptionText: PropTypes.func.isRequired,
	/** Function returning the filter editor. */
	getEditor: PropTypes.func,
	/** Function invoked to apply changes. */
	onApply: PropTypes.func,
};

export default FilterMenu;
