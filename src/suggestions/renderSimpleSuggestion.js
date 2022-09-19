import {t} from '@bluecat/l10n.macro';

import {Suggestion} from './Suggestion';

/**
 * Renders a simple suggestion.
 * @param {{name: string}} suggestion the suggestion.
 * @returns {JSX.Element}
 */
// eslint-disable-next-line react/display-name,react/prop-types
export default ({name}) => <Suggestion name={name} description={t`member`} />;
