import {forwardRef} from 'react';
import PropTypes from 'prop-types';

/** Title for a table. */
const TableTitle = forwardRef(({id, title, description}, ref) => (
	<div className="Table__title" ref={ref}>
		<h2 id={id}>{title}</h2>
		<div className="Table__description">{description}</div>
	</div>
));

TableTitle.displayName = 'TableTitle';

TableTitle.propTypes = {
	/** The title element id. */
	id: PropTypes.string,
	/** The title. */
	title: PropTypes.node,
	/** The description. */
	description: PropTypes.node,
};

export default TableTitle;
