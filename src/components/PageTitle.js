import PropTypes from 'prop-types';

/** @deprecated use <h1> instead. */
const PageTitle = ({title}) => (
	<h1 id="pageTitle" className="PageTitle">
		{title}
	</h1>
);

PageTitle.propTypes = {
	/** The title. */
	title: PropTypes.string.isRequired,
};

export default PageTitle;
