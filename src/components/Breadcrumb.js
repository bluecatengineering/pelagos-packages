import PropTypes from 'prop-types';
import {Link} from '@bluecat/redux-navigation';
import {t} from '@bluecat/l10n.macro';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';

import IconButton from './IconButton';
import './Breadcrumb.less';

const goBack = () => history.go(-1);

/** A page hierarchy trail. */
const Breadcrumb = ({breadcrumb, title}) => (
	<div className="Breadcrumb">
		<IconButton className="Breadcrumb__back" icon={faChevronLeft} aria-label={t`Back`} onClick={goBack} />
		<nav className="Breadcrumb__crumbs" aria-label={t`Breadcrumb`}>
			<ol className="Breadcrumb__list">
				{breadcrumb.map((page) => (
					<li key={page} className="Breadcrumb__link">
						<Link page={page} />
					</li>
				))}
				<li className="Breadcrumb__current">{title}</li>
			</ol>
		</nav>
	</div>
);

Breadcrumb.propTypes = {
	/** The ancestors of the current page. */
	breadcrumb: PropTypes.arrayOf(PropTypes.func).isRequired,
	/** The title of the current page. */
	title: PropTypes.string.isRequired,
};

export default Breadcrumb;
