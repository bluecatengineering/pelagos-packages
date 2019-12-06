import React from 'react';
import PropTypes from 'prop-types';

import './Suggestion.less';

export const Suggestion = ({name, description, className, ...props}) => (
	<div {...props} className={'Suggestion' + (className ? ' ' + className : '')}>
		<div>{name}</div>
		<div className="Suggestion__description">{description}</div>
	</div>
);

Suggestion.propTypes = {
	name: PropTypes.string,
	description: PropTypes.string,
	className: PropTypes.string,
};

export default Suggestion;
