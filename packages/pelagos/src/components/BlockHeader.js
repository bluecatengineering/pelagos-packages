import PropTypes from 'prop-types';
import {t} from '@bluecateng/l10n.macro';

import './BlockHeader.less';

/** Header for a form section, usually as a Collapsible title. */
const BlockHeader = ({className, header, configured}) => (
	<h2 className={`BlockHeader${className ? ` ${className}` : ''}`}>
		{header}
		<span className={`BlockHeader__indicator${configured ? ' BlockHeader--configured' : ''}`}>
			{configured ? t`(configured)` : t`(optional)`}
		</span>
	</h2>
);

BlockHeader.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The header text. */
	header: PropTypes.string,
	/** Whether the value has been configured. */
	configured: PropTypes.bool,
};

export default BlockHeader;
