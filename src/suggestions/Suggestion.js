import PropTypes from 'prop-types';

import './Suggestion.less';

/** A suggestion. */
export const Suggestion = ({className, name, description, ...props}) => (
	<div {...props} className={'Suggestion' + (className ? ' ' + className : '')}>
		<div>{name}</div>
		<div className="Suggestion__description">{description}</div>
	</div>
);

Suggestion.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The name. */
	name: PropTypes.string,
	/** The description. */
	description: PropTypes.string,
};

export default Suggestion;
