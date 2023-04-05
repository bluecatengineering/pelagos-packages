import {cloneElement, useMemo} from 'react';
import PropTypes from 'prop-types';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons';

import addClassName from '../functions/addClassName';
import cloneWithClassName from '../functions/cloneWithClassName';
import useCollapse from '../hooks/useCollapse';

import SvgIcon from './SvgIcon';
import './Collapsible.less';

/** A collapsible container. */
const Collapsible = ({id, className, open, children, onHeaderClick}) => {
	id = useMemo(() => id || 'e' + ('' + Math.random()).slice(2), [id]);
	const headerId = id + '-header';
	const contentId = id + '-content';
	const headerElement = cloneWithClassName(children[0], 'Collapsible__title');
	const contentElement = children[1];
	return (
		<div id={id} className={`Collapsible${className ? ` ${className}` : ''}`}>
			<button
				id={headerId}
				className="Collapsible__header"
				type="button"
				aria-expanded={open}
				aria-controls={contentId}
				onClick={onHeaderClick}>
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
	/** The child components. */
	children: PropTypes.arrayOf(PropTypes.element).isRequired,
	/** Function invoked when the header is clicked. */
	onHeaderClick: PropTypes.func,
};

export default Collapsible;
