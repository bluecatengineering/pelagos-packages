import PropTypes from 'prop-types';

import './DetailsSectionTitle.less';

const DetailsSectionTitle = ({title}) => <div className="DetailsSectionTitle">{title}</div>;

DetailsSectionTitle.propTypes = {
	title: PropTypes.string,
};

export default DetailsSectionTitle;
