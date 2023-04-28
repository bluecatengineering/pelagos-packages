import PropTypes from 'prop-types';
import {t} from '@bluecateng/l10n.macro';

import Layer from '../components/Layer';
import MenuArrow from '../components/MenuArrow';
import SvgIcon from '../components/SvgIcon';
import xmarkThin from '../icons/xmarkThin';

import './FilterChip.less';

/** Represents a filter category and the selected filter values.  */
const FilterChip = ({id, name, children, onEditClick, onRemoveClick, ...props}) => (
	<Layer {...props} as="li" className="FilterChip">
		<button id={id} className="FilterChip__button" type="button" aria-haspopup="dialog" onClick={onEditClick}>
			<span className="FilterChip__title">{name}</span>
			<span className="FilterChip__values">{children}</span>
			<MenuArrow />
		</button>
		<button
			id={`${id}-remove`}
			className="FilterChip__remove"
			type="button"
			aria-label={t`Remove ${name} filter`}
			onClick={onRemoveClick}>
			<SvgIcon icon={xmarkThin} />
		</button>
	</Layer>
);

FilterChip.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The category name. */
	name: PropTypes.string,
	/** The filter values. */
	children: PropTypes.node,
	/** Function invoked when the chip is clicked. */
	onEditClick: PropTypes.func,
	/** Function invoked when the remove button is clicked. */
	onRemoveClick: PropTypes.func,
};

export default FilterChip;
