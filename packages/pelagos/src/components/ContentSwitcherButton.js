import PropTypes from 'prop-types';

/** A button inside a ContentSwitcher. */
const ContentSwitcherButton = ({className, text, selected, ...props}) => (
	<button
		{...props}
		className={`ContentSwitcher__button${className ? ` ${className}` : ''}`}
		role="tab"
		aria-selected={selected}>
		{text}
	</button>
);

ContentSwitcherButton.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The text to display. */
	text: PropTypes.string,
	/** Whether the button is selected, set by ContentSwitcher. */
	selected: PropTypes.bool,
};

export default ContentSwitcherButton;
