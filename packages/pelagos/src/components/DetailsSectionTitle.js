import PropTypes from 'prop-types';

/** @deprecated use <h5> instead. */
const DetailsSectionTitle = ({title}) => <h5 className="DetailsSectionTitle">{title}</h5>;

DetailsSectionTitle.propTypes = {
	title: PropTypes.string,
};

export default DetailsSectionTitle;
