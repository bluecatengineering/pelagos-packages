import ListItem from './ListItem';

/**
 * Renders a list item.
 * @param {string} item the item to render.
 * @param {string} [className] the class name(s).
 * @returns {JSX.Element}
 */
// eslint-disable-next-line react/display-name,react/prop-types
export default (item, className) => <ListItem key={item} item={item} className={className} />;
