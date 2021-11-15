import {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import {t} from '@bluecat/l10n.macro';
import {faFilter} from '@fortawesome/free-solid-svg-icons';

import useMenuHandler from '../hooks/useMenuHandler';
import Layer from '../components/Layer';
import IconButton from '../components/IconButton';

import './FilterMenu.less';

/** A menu for adding filters. */
const FilterMenu = ({options, filters, filterEditor: FilterEditor, getOptionText, onApply}) => {
	const buttonRef = useRef(null);
	const menuRef = useRef(null);

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
			const button = buttonRef.current;
			const {bottom, left} = button.getBoundingClientRect();

			const menu = menuRef.current;
			menu.style.top = `${bottom}px`;
			menu.style.left = `${left}px`;
			menu.dataset.layer = button.dataset.layer;
		}
	}, [menuVisible]);

	return (
		<Layer className="FilterMenu" ref={buttonRef}>
			<IconButton
				id="filterButton"
				className="FilterMenu__button"
				icon={faFilter}
				disabled={filteredOptions.length === 0}
				tooltipText={t`Add filter`}
				tooltipPlacement="top"
				aria-label={t`Add filter`}
				aria-controls={menuVisible ? 'filterMenu' : null}
				aria-haspopup="true"
				aria-expanded={menuVisible}
				aria-activedescendant={current === -1 ? null : `filterMenu-${filteredOptions[current]}`}
				{...buttonProps}
			/>
			{menuVisible &&
				createPortal(
					<div id="filterMenu" className="FilterMenu__menu" role="menu" {...listProps} ref={menuRef}>
						{filteredOptions.map((key, index) => (
							<div
								key={key}
								id={`filterMenu-${key}`}
								className={`FilterMenu__option${current === index ? ' FilterMenu__option--current' : ''}`}
								role="menuitem"
								data-index={index}
							>
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
		</Layer>
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
