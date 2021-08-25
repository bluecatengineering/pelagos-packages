import {cloneElement, useMemo} from 'react';
import PropTypes from 'prop-types';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';

import handleButtonKeyDown from '../functions/handleButtonKeyDown';
import useCollapse from '../hooks/useCollapse';

import SvgIcon from './SvgIcon';
import './Collapsible.less';

/** A collapsible container. */
const Collapsible = ({id, className, open, header, level, children, onHeaderClick}) => {
	id = useMemo(() => id || 'e' + ('' + Math.random()).substr(2), [id]);
	const headerId = id + '-header';
	const contentId = id + '-content';
	return (
		<div id={id} className={`Collapsible${className ? ` ${className}` : ''}`}>
			<div
				id={headerId}
				className={`Collapsible__header Collapsible--l${level}`}
				tabIndex={0}
				role="button"
				aria-expanded={open}
				aria-controls={contentId}
				onClick={onHeaderClick}
				onKeyDown={handleButtonKeyDown}>
				<span className="Collapsible__arrowBox">
					<SvgIcon className={`Collapsible__arrow${open ? ' Collapsible__arrow--open' : ''}`} icon={faAngleRight} />
				</span>
				{header}
			</div>
			{cloneElement(children, {
				id: contentId,
				className: `${children.props.className ? children.props.className + ' ' : ''}Collapsible__body`,
				role: 'region',
				'aria-labelledby': headerId,
				ref: useCollapse(open),
			})}
		</div>
	);
};

Collapsible.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** Whether the child component is displayed. */
	open: PropTypes.bool,
	/** The component header. */
	header: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	/** The font size level. */
	level: PropTypes.oneOf(['1', '2', '3', '4', '5']),
	/** The child component. */
	children: PropTypes.element,
	/** Function invoked when the header is clicked. */
	onHeaderClick: PropTypes.func,
};
Collapsible.defaultProps = {
	level: '1',
};

export default Collapsible;
