import PropTypes from 'prop-types';
import {t} from '@bluecat/l10n.macro';

import './BlockHeader.less';

const BlockHeader = ({header, configured}) => (
	<div className="BlockHeader">
		{header}
		<div className={'BlockHeader__indicator' + (configured ? ' BlockHeader--configured' : '')}>
			{configured ? t`(configured)` : t`(optional)`}
		</div>
	</div>
);

BlockHeader.propTypes = {
	header: PropTypes.string,
	configured: PropTypes.bool,
};

export default BlockHeader;
