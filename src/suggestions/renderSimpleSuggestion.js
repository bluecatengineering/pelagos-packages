import {t} from '@bluecat/l10n.macro';

import {Suggestion} from './Suggestion';

// eslint-disable-next-line react/display-name,react/prop-types
export default ({name}) => <Suggestion name={name} description={t`member`} />;
