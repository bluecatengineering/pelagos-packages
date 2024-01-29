import {cloneElement} from 'react';
import PropTypes from 'prop-types';
import OverflowMenuHorizontal from '@carbon/icons-react/es/OverflowMenuHorizontal';

/** An item in a Breadcrumb. */
const BreadcrumbItem = ({href, children, ...props}) => (
	<li className="Breadcrumb__item">
		{href ? (
			<a href={href} title={typeof children === 'string' ? children : ''} {...props}>
				{children}
			</a>
		) : children?.type?.displayName === 'IconMenu' ? (
			cloneElement(children, {icon: OverflowMenuHorizontal})
		) : (
			children
		)}
		<span className="Breadcrumb__separator" aria-hidden="true">
			/
		</span>
	</li>
);

BreadcrumbItem.propTypes = {
	/** The href attribute for the link. If not specified, the child must be a link. */
	href: PropTypes.string,
	/** Either the text for the link if href is specified or a link element otherwise. */
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

export default BreadcrumbItem;
