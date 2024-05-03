import PropTypes from 'prop-types';
import {Layer} from '@bluecateng/pelagos';

import getColorClass from './getColorClass';

const SingleHint = ({
	bottomTitle,
	bottomValue,
	bottomFormatter,
	leftTitle,
	leftValue,
	leftFormatter,
	groupLabel,
	group,
	groupFormatter,
	groupIndex,
	variant,
	option,
	getBgClass,
}) => (
	<Layer as="ul" className="Chart Chart__hint">
		<li>
			<span>{bottomTitle || 'x'}</span>
			<span>{bottomFormatter(bottomValue)}</span>
		</li>
		<li>
			<span>{leftTitle || 'y'}</span>
			<span>{leftFormatter(leftValue)}</span>
		</li>
		{group && (
			<li>
				<span
					className={`Chart__hintColor ${getBgClass(
						group,
						bottomValue,
						leftValue,
						getColorClass('bg', variant, option, groupIndex.get(group))
					)}`}
				/>
				<span>{groupLabel}</span>
				<span>{groupFormatter(group)}</span>
			</li>
		)}
	</Layer>
);

SingleHint.propTypes = {
	bottomTitle: PropTypes.string,
	bottomValue: PropTypes.any,
	bottomFormatter: PropTypes.func,
	leftTitle: PropTypes.string,
	leftValue: PropTypes.any,
	leftFormatter: PropTypes.func,
	groupLabel: PropTypes.string,
	group: PropTypes.any,
	groupFormatter: PropTypes.func,
	groupIndex: PropTypes.object,
	variant: PropTypes.number,
	option: PropTypes.number,
	getBgClass: PropTypes.func,
};

export default SingleHint;
