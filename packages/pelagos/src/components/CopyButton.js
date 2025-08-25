import {useCallback, useRef} from 'react';
import PropTypes from 'prop-types';
import {t} from '@bluecateng/l10n.macro';
import Copy from '@carbon/icons-react/es/Copy';

import useTooltipBase from '../hooks/useTooltipBase';
import copyToClipboard from '../functions/copyToClipboard';

import SvgIcon from './SvgIcon';
import './CopyButton.less';

/** Button to copy data to the clipboard. */
const CopyButton = ({id, className, data, icon, tooltipText, tooltipPlacement = 'right', disabled}) => {
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
	return disabled ? (
		<span
			id={id}
			className={`CopyButton${className ? ` ${className}` : ''}`}
			aria-label={t`Copy`}
			ref={targetRef}
			aria-disabled="true"
			onMouseEnter={show}
			onMouseLeave={hide}>
			<SvgIcon icon={icon || Copy} />
		</span>
	) : (
		<button
			id={id}
			className={`CopyButton${className ? ` ${className}` : ''}`}
			type="button"
			aria-label={t`Copy`}
			ref={targetRef}
			onMouseEnter={show}
			onMouseLeave={hide}
			onFocus={show}
			onBlur={hide}
			onClick={handleClick}>
			<SvgIcon icon={icon || Copy} />
		</button>
	);
};

CopyButton.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The data to copy to the clipboard. */
	data: PropTypes.string.isRequired,
	/** The object representing the icon. (using FontAwesome, etc.) */
	icon: PropTypes.oneOfType([PropTypes.object, PropTypes.elementType]),
	/** The tooltip text to display. */
	tooltipText: PropTypes.string,
	/** The placement of the tooltip relative to the button. */
	tooltipPlacement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
	/** Whether the button is disabled. */
	disabled: PropTypes.bool,
};

export default CopyButton;
