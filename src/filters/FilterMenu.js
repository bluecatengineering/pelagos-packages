import {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import {t} from '@bluecat/l10n.macro';
import {faFilter} from '@fortawesome/free-solid-svg-icons';

import useMenuHandler from '../hooks/useMenuHandler';
import useTooltip from '../hooks/useTooltip';
import SvgIcon from '../components/SvgIcon';

import './FilterMenu.less';

/** A menu for adding filters. */
const FilterMenu = ({options, filters, filterEditor: FilterEditor, getOptionText, onApply}) => {
	const [menuVisible, setMenuVisible] = useState(false);
	const [filterName, setFilterName] = useState(null);

	const filteredOptions = !filters ? options : options.filter((key) => !filters[key]);

	const handleClose = useCallback(() => setFilterName(null), []);
	const handleSave = useCallback((value) => (setFilterName(null), onApply(filterName, value)), [filterName, onApply]);

	const {current, buttonProps, listProps} = useMenuHandler(menuVisible, setMenuVisible, filteredOptions, {
		getItemText: getOptionText,
		onItemSelected: setFilterName,
	});

	useEffect(() => {
		if (menuVisible) {
			const button = document.getElementById('filterButton');
			const {bottom, left} = button.getBoundingClientRect();

			const menu = document.getElementById('filterMenu');
			menu.style.display = '';
			menu.style.top = `${bottom + 3}px`;
			menu.style.left = `${left}px`;
		}
	}, [menuVisible]);

	return (
		<div className="FilterMenu">
			<div
				id="filterButton"
				className="FilterMenu__button"
				role="button"
				aria-label={t`Add filter`}
				aria-controls={menuVisible ? 'filterMenu' : null}
				aria-haspopup="true"
				aria-expanded={menuVisible}
				aria-activedescendant={current === -1 ? null : `filterMenu-${filteredOptions[current]}`}
				tabIndex="0"
				ref={useTooltip(t`Add filter`, 'top')}
				{...buttonProps}>
				<SvgIcon icon={faFilter} />
			</div>
			{menuVisible &&
				createPortal(
					<div id="filterMenu" className="FilterMenu__menu" role="menu" {...listProps} style={{display: 'none'}}>
						{filteredOptions.map((key, index) => (
							<div
								key={key}
								id={`filterMenu-${key}`}
								className={`FilterMenu__option${current === index ? ' FilterMenu__option--current' : ''}`}
								role="menuitem"
								data-index={index}>
								{getOptionText(key)}
							</div>
						))}
					</div>,
					document.body
				)}
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
		</div>
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
