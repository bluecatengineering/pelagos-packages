import PropTypes from 'prop-types';

/** An item in a Breadcrumb. */
const BreadcrumbItem = ({href, children, ...props}) => (
	<li className="Breadcrumb__item">
		{href ? (
			<a href={href} {...props}>
				{children}
			</a>
		) : (
			children
		)}
		<span className="Breadcrumb__separator" aria-hidden="true">
			-
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
