import PropTypes from 'prop-types';
import {sum} from 'd3-array';
import {Layer} from '@bluecateng/pelagos';

import './Chart.less';
import getColorClass from './getColorClass';

const getHintValue = (d) => d[1];

const MultiHint = ({
	title,
	headerValue,
	values,
	groupIndex,
	showTotal,
	totalLabel,
	headerFormatter,
	groupFormatter,
	valueFormatter,
	getBgClass,
	variant,
	option,
}) => (
	<Layer as="ul" className="Chart Chart__hint">
		<li>
			<span>{title}</span>
			<span>{headerFormatter(headerValue)}</span>
		</li>
		{values?.map(([group, value]) => (
			<li key={group}>
				<span
					className={`Chart__hintColor ${getBgClass(group, headerValue, value, getColorClass('bg', variant, option, groupIndex.get(group)))}`}
				/>
				<span>{groupFormatter(group)}</span>
				<span>{valueFormatter(value)}</span>
			</li>
		))}
		{showTotal && (
			<li>
				<span className="Chart__hintTotal">{totalLabel}</span>
				<span>{valueFormatter(values ? sum(values, getHintValue) : 0)}</span>
			</li>
		)}
	</Layer>
);

MultiHint.propTypes = {
	title: PropTypes.string,
	headerValue: PropTypes.any,
	values: PropTypes.array,
	groupIndex: PropTypes.object,
	showTotal: PropTypes.bool,
	totalLabel: PropTypes.string,
	headerFormatter: PropTypes.func,
	groupFormatter: PropTypes.func,
	valueFormatter: PropTypes.func,
	getBgClass: PropTypes.func,
	variant: PropTypes.number,
	option: PropTypes.number,
};

export default MultiHint;
