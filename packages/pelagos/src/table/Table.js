import {forwardRef} from 'react';
import PropTypes from 'prop-types';

import elementOfType from '../functions/elementOfType';

import TableHead from './TableHead';
import TableBody from './TableBody';

import './Table.less';

/** Basic table component. */
const Table = forwardRef(({className, rowMode, stickyHeader, fixedLayout, children, ...props}, ref) => (
	<table
		{...props}
		className={`Table Table--${rowMode}${stickyHeader ? ' Table--sticky' : ''}${fixedLayout ? ' Table--fixed' : ''}${
			className ? ` ${className}` : ''
		}`}
		ref={ref}
	>
		{children}
	</table>
));

Table.displayName = 'Table';

const headOrBody = PropTypes.oneOfType([elementOfType(TableHead), elementOfType(TableBody)]);

Table.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The mode rows are displayed. */
	rowMode: PropTypes.oneOf(['line', 'zebra']),
	/** Whether to enable sticky headers. */
	stickyHeader: PropTypes.bool,
	/** Whether to enable fixed layout. */
	fixedLayout: PropTypes.bool,
	/** The child elements. */
	children: PropTypes.oneOfType([headOrBody, PropTypes.arrayOf(headOrBody)]),
};

Table.defaultProps = {
	rowMode: 'line',
};

export default Table;
