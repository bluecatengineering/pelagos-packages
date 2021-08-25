import PropTypes from 'prop-types';

import './PageTitle.less';

/** The page title. */
const PageTitle = ({title}) => (
	<div id="pageTitle" className="PageTitle" role="heading" aria-level="1">
		{title}
	</div>
);

PageTitle.propTypes = {
	/** The title. */
	title: PropTypes.string.isRequired,
};

export default PageTitle;
