import {cloneElement, useMemo} from 'react';
import PropTypes from 'prop-types';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons';

import addClassName from '../functions/addClassName';
import cloneWithClassName from '../functions/cloneWithClassName';
import useCollapse from '../hooks/useCollapse';

import SvgIcon from './SvgIcon';
import './Collapsible.less';

/** A collapsible container. */
const Collapsible = ({id, className, open, header, level, children, onHeaderClick}) => {
	id = useMemo(() => id || 'e' + ('' + Math.random()).substr(2), [id]);
	const headerId = id + '-header';
	const contentId = id + '-content';
	let headerElement, contentElement;
	if (Array.isArray(children)) {
		headerElement = cloneWithClassName(children[0], 'Collapsible__title');
		contentElement = children[1];
	} else {
		headerElement = <div className={`Collapsible__title Collapsible--l${level}`}>{header}</div>;
		contentElement = children;
	}
	return (
		<div id={id} className={`Collapsible${className ? ` ${className}` : ''}`}>
			<button
				id={headerId}
				className="Collapsible__header"
				type="button"
				aria-expanded={open}
				aria-controls={contentId}
				onClick={onHeaderClick}
			>
				{headerElement}
				<SvgIcon className={`Collapsible__arrow${open ? ' Collapsible__arrow--open' : ''}`} icon={faAngleDown} />
			</button>
			{cloneElement(contentElement, {
				id: contentId,
				className: addClassName(contentElement, 'Collapsible__body'),
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
	/** The component header. @deprecated use a nested h[2-6] instead. */
	header: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	/** The font size level. @deprecated use a nested h[2-6] instead. */
	level: PropTypes.oneOf(['1', '2', '3', '4', '5']),
	/** The child components. */
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]).isRequired,
	/** Function invoked when the header is clicked. */
	onHeaderClick: PropTypes.func,
};
Collapsible.defaultProps = {
	level: '1',
};

export default Collapsible;
