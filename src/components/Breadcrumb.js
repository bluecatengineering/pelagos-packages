import PropTypes from 'prop-types';
import {Link} from '@bluecat/redux-navigation';
import {t} from '@bluecat/l10n.macro';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';

import elementOfType from '../functions/elementOfType';

import IconButton from './IconButton';
import BreadcrumbItem from './BreadcrumbItem';
import './Breadcrumb.less';

const goBack = () => history.go(-1);

/** A page hierarchy trail. */
const Breadcrumb = ({breadcrumb, title, children}) => (
	<div className="Breadcrumb">
		<IconButton className="Breadcrumb__back" icon={faChevronLeft} aria-label={t`Back`} onClick={goBack} />
		<nav className="Breadcrumb__crumbs" aria-label={t`Breadcrumb`}>
			<ol className="Breadcrumb__list">
				{children
					? children
					: breadcrumb.map((page) => (
							<BreadcrumbItem key={page}>
								<Link page={page} />
							</BreadcrumbItem>
					  ))}
				<li className="Breadcrumb__current">{title}</li>
			</ol>
		</nav>
	</div>
);

Breadcrumb.propTypes = {
	/** The title of the current page. */
	title: PropTypes.string.isRequired,
	/** The breadcrumb items. */
	children: PropTypes.oneOfType([elementOfType(BreadcrumbItem), PropTypes.arrayOf(elementOfType(BreadcrumbItem))]),
	/** The ancestors of the current page. @deprecated use nested BreadcrumbItem instead. */
	breadcrumb: PropTypes.arrayOf(PropTypes.func),
};

export default Breadcrumb;
