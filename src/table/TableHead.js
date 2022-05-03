import {forwardRef} from 'react';
import PropTypes from 'prop-types';

import elementOfType from '../functions/elementOfType';

import TableRow from './TableRow';

/** Head element for a table component. */
const TableHead = forwardRef(({children, ...props}, ref) => (
	<thead {...props} ref={ref}>
		{children}
	</thead>
));

TableHead.displayName = 'TableHead';

TableHead.propTypes = {
	/** The child elements. */
	children: PropTypes.oneOfType([elementOfType(TableRow), PropTypes.arrayOf(elementOfType(TableRow))]),
};

export default TableHead;
