import {useCallback, useState} from 'react';
import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';
import {t} from '@bluecat/l10n.macro';

import Layer from '../components/Layer';
import ScrollBox from '../components/ScrollBox';
import SvgIcon from '../components/SvgIcon';
import timesThin from '../icons/timesThin';

import './FilterList.less';

/** Displays a list of filters. */
const FilterList = ({filters, excludedKeys, filterEditor: FilterEditor, getFilterTitle, getValues, onApply}) => {
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
		<Layer className="FilterList">
			<ScrollBox trackId="filterListTrack">
				<div className="FilterList__items" onClick={handleClick}>
					{filters &&
						Object.entries(filters).map(([key, v]) =>
							!excludedKeys.includes(key)
								? do {
										const name = getFilterTitle(key);
										<div key={key} className="FilterList__item">
											<button
												id={`filter-${key}`}
												className="FilterList__button"
												type="button"
												aria-haspopup="dialog"
												aria-expanded={key === filterName}
												aria-controls={key === filterName ? 'filterListDropDown' : null}
												data-kind="item"
												data-key={key}
											>
												<span className="FilterList__filterTitle">{name}</span>
												{getValues(key, v)}
											</button>
											<button
												id={`filter-${key}-remove`}
												className="FilterList__remove"
												type="button"
												aria-label={t`Remove ${name}`}
												data-kind="remove"
												data-key={key}
											>
												<SvgIcon icon={timesThin} />
											</button>
										</div>;
								  }
								: null
						)}
				</div>
			</ScrollBox>
			{filterName &&
				createPortal(
					<FilterEditor
						name={filterName}
						value={filters[filterName]}
						buttonId={`filter-${filterName}`}
						trackId="filterListTrack"
						onClose={handleClose}
						onSave={handleSave}
					/>,
					document.body
				)}
		</Layer>
	);
};

FilterList.propTypes = {
	/** The filters to display. */
	filters: PropTypes.object,
	/** The filter keys to exclude. */
	excludedKeys: PropTypes.array,
	/** The editor component. */
	filterEditor: PropTypes.elementType,
	/** Function returning the filter title. */
	getFilterTitle: PropTypes.func,
	/** Function returning the filter values. */
	getValues: PropTypes.func,
	/** Function invoked to apply changes. */
	onApply: PropTypes.func,
};

FilterList.defaultProps = {
	excludedKeys: [],
};

export default FilterList;
