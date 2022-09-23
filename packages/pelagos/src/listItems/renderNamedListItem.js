import ListItem from './ListItem';

/**
 * Renders a list item.
 * @param {{id: string, name: string}} item the item to render.
 * @param {string} [className] the class name(s).
 * @returns {JSX.Element}
 */
// eslint-disable-next-line react/display-name,react/prop-types
export default (item, className) => (
	<ListItem
		key={item.id}
		item={item.name || item.id}
		className={(className ? className : '') + (item.name ? '' : ' ListItem--unresolved')}
	/>
);
