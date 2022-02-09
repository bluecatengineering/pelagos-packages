import {useCallback, useRef} from 'react';
import PropTypes from 'prop-types';
import {faCopy} from '@fortawesome/free-regular-svg-icons';
import {t} from '@bluecat/l10n.macro';

import useTooltipBase from '../hooks/useTooltipBase';
import copyToClipboard from '../functions/copyToClipboard';

import SvgIcon from './SvgIcon';
import './CopyButton.less';

/** Button to copy data to the clipboard. */
const CopyButton = ({id, className, data, tooltipText, tooltipPlacement}) => {
	const targetRef = useRef(null);
	const [showTooltip, hide] = useTooltipBase();
	const show = useCallback(
		() => showTooltip(tooltipText, tooltipPlacement, targetRef.current),
		[tooltipText, tooltipPlacement, showTooltip]
	);
	const showTmp = useCallback(
		(tmpText) => {
			showTooltip(tmpText, tooltipPlacement, targetRef.current);
			setTimeout(hide, 5000);
		},
		[tooltipPlacement, showTooltip, hide]
	);
	const handleClick = useCallback(
		() =>
			copyToClipboard(data)
				.then(() => showTmp(t`Copied`))
				.catch(({message}) => showTmp(t`Copy failed: ${message}`)),
		[data, showTmp]
	);
	return (
		<button
			id={id}
			className={`CopyButton${className ? ` ${className}` : ''}`}
			aria-label={t`Copy`}
			ref={targetRef}
			onMouseEnter={show}
			onMouseLeave={hide}
			onFocus={show}
			onBlur={hide}
			onClick={handleClick}
		>
			<SvgIcon icon={faCopy} />
		</button>
	);
};

CopyButton.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The data to copy to the clipboard. */
	data: PropTypes.string,
	/** The tooltip text to display. */
	tooltipText: PropTypes.string,
	/** The placement of the tooltip relative to the button. */
	tooltipPlacement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
};

CopyButton.defaultProps = {
	tooltipPlacement: 'right',
};

export default CopyButton;
