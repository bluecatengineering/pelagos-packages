import PropTypes from 'prop-types';
import {t} from '@bluecateng/l10n.macro';

import elementOfType from '../functions/elementOfType';

import BreadcrumbItem from './BreadcrumbItem';
import './Breadcrumb.less';

/** A page hierarchy trail. */
const Breadcrumb = ({title, children}) => (
	<div className="Breadcrumb">
		<nav className="Breadcrumb__crumbs" aria-label={t`Breadcrumb`}>
			<ol className="Breadcrumb__list">
				{children}
				{title && <li className="Breadcrumb__current">{title}</li>}
			</ol>
		</nav>
	</div>
);

Breadcrumb.propTypes = {
	/** The title of the current page. */
	title: PropTypes.string,
	/** The breadcrumb items. */
	children: PropTypes.oneOfType([elementOfType(BreadcrumbItem), PropTypes.arrayOf(elementOfType(BreadcrumbItem))])
		.isRequired,
};

export default Breadcrumb;
