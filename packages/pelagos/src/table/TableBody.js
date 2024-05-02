import PropTypes from 'prop-types';

/** Body element for a table component. */
const TableBody = ({children, ...props}) => <tbody {...props}>{children}</tbody>;

TableBody.propTypes = {
	/** The child elements. */
	children: PropTypes.node,
};

export default TableBody;
