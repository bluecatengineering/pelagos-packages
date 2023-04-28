import ListItem from './ListItem';

/**
 * Renders a list item.
 * @param {{id: string, name: string}} item the item to render.
 * @param {string} [className] the class name(s).
 * @returns {JSX.Element}
 */
// eslint-disable-next-line react/display-name -- false positive, this is not a component
export default (item, className) => (
	<ListItem key={item.id} className={className} item={item.name || item.id} unresolved={!item.name} />
);
