import PropTypes from 'prop-types';

import elementOfType from '../functions/elementOfType';

import TableRow from './TableRow';

/** Body element for a table component. */
const TableBody = ({children, ...props}) => <tbody {...props}>{children}</tbody>;

TableBody.propTypes = {
	/** The child elements. */
	children: PropTypes.oneOfType([elementOfType(TableRow), PropTypes.arrayOf(elementOfType(TableRow))]),
};

export default TableBody;
