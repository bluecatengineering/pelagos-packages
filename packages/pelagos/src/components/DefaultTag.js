import {cloneElement} from 'react';
import PropTypes from 'prop-types';

import useTooltip from '../hooks/useTooltip';

// Each default tag needs its own tooltip, useTooltip can only handle one element
const DefaultTag = ({className, tag, disabled, tooltipText, renderTag}) =>
	cloneElement(renderTag(tag, disabled, true, null, useTooltip(tooltipText, 'top')), {className});

DefaultTag.propTypes = {
	className: PropTypes.string,
	tag: PropTypes.any,
	disabled: PropTypes.bool,
	tooltipText: PropTypes.string,
	renderTag: PropTypes.func.isRequired,
};

export default DefaultTag;
