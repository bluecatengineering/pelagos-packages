import PropTypes from 'prop-types';

import LoadingGradient from './LoadingGradient';

const LoadingGrid = ({gradientId}) => (
	<g className="Chart__shimmerLines" stroke={`url('#${gradientId}')`}>
		<LoadingGradient id={gradientId} className="Chart__loadingLines" />
		<rect className="Chart__skeletonBackdrop" width="100%" height="100%" />
		<g />
		<g />
	</g>
);

LoadingGrid.propTypes = {
	gradientId: PropTypes.string,
};

export default LoadingGrid;
