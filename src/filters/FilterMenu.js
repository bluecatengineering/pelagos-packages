import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import {faFilter} from '@fortawesome/free-solid-svg-icons';

import useMenuHandler from '../hooks/useMenuHandler';
import SvgIcon from '../components/SvgIcon';
import __ from '../strings';

import './FilterMenu.less';

/** A menu for adding filters. */
const FilterMenu = ({options, filters, filterEditor: FilterEditor, getOptionText, onApply}) => {
	const [menuVisible, setMenuVisible] = useState(false);
	const [filter, setFilter] = useState(null);

	const filteredOptions = !filters ? options : options.filter((key) => !filters[key] || !filters[key].length);

	const handleClose = useCallback(() => setFilter(null), []);
	const handleSave = useCallback((values) => (setFilter(null), onApply(filter, values)), [filter, onApply]);

	const links = useMemo(
		() =>
			filteredOptions.map((key) => ({
				key,
				text: getOptionText(key),
				handler: () => setFilter(key),
			})),
		[filteredOptions, getOptionText]
	);

	const {current, buttonProps, listProps} = useMenuHandler(menuVisible, setMenuVisible, links);

	useEffect(() => {
		if (menuVisible) {
			const button = document.getElementById('filterButton');
			const {top, left} = button.getBoundingClientRect();

			const menu = document.getElementById('filterMenu');
			menu.style.display = '';
			menu.style.top = top + 32 + 'px';
			menu.style.left = left + 'px';
		}
	}, [menuVisible]);

	return (
		<div className="FilterMenu">
			<div
				id="filterButton"
				className="FilterMenu__button"
				role="button"
				aria-label={__('FILTERS')}
				aria-controls={menuVisible ? 'filterMenu' : null}
				aria-haspopup="true"
				aria-expanded={menuVisible}
				aria-activedescendant={current === -1 ? null : `filterMenu-${links[current].key}`}
				tabIndex="0"
				{...buttonProps}>
				<SvgIcon icon={faFilter} />
			</div>
			{menuVisible &&
				createPortal(
					<div id="filterMenu" className="FilterMenu__menu" role="menu" {...listProps} style={{display: 'none'}}>
						{links.map(({key, text}, index) => (
							<div
								key={key}
								id={`filterMenu-${key}`}
								className={`FilterMenu__option${current === index ? ' FilterMenu__option--current' : ''}`}
								role="menuitem"
								data-index={index}>
								{text}
							</div>
						))}
					</div>,
					document.body
				)}
			{filter &&
				createPortal(
					<FilterEditor
						filter={filter}
						filters={filters}
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
