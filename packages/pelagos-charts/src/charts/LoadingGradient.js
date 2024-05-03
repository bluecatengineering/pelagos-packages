import PropTypes from 'prop-types';

const list = [
	[0, 'stop-bg'],
	[0.125, 'stop-fg'],
	[0.25, 'stop-bg'],
];

const LoadingGradient = ({id, className}) => (
	<defs>
		<linearGradient id={id} className={className} gradientUnits="userSpaceOnUse">
			{list.map(([offset, className]) => (
				<stop key={offset} className={className} offset={offset}>
					<animate
						attributeName="offset"
						dur="3s"
						repeatCount="indefinite"
						from={offset}
						to={offset + 0.75}
						calcMode="spline"
						keyTimes="0;1"
						keySplines=".5 0 .5 1"
					/>
				</stop>
			))}
		</linearGradient>
	</defs>
);

LoadingGradient.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
};

export default LoadingGradient;
