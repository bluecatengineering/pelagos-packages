import Suggestion from './Suggestion';

/**
 * Renders a suggestion.
 * @param {{name: string, description: string}} suggestion the suggestion.
 * @returns {JSX.Element}
 */
// eslint-disable-next-line react/display-name,react/prop-types -- false positive, this is not a component
export default ({name, description}) => <Suggestion name={name} description={description} />;
