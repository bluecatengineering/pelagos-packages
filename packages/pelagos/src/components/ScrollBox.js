import {useCallback, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import ChevronLeft from '@carbon/icons-react/es/ChevronLeft';
import ChevronRight from '@carbon/icons-react/es/ChevronRight';

import addResizeObserver from '../functions/addResizeObserver';

import IconButton from './IconButton';
import './ScrollBox.less';

const preventDefault = (event) => event.preventDefault();

const showChevrons = (track, onResize) => {
	const rect = track.getBoundingClientRect(); // the observer rectangle is incomplete
	const classList = track.parentNode.classList;
	const overflow = rect.width < track.firstChild.scrollWidth;
	if (overflow) {
		classList.add('ScrollBox--overflow');
	} else {
		classList.remove('ScrollBox--overflow');
	}
	if (onResize) onResize(track, rect, overflow);
};

/** Allows to scroll a nested component. */
const ScrollBox = ({className, trackId, children, onResize}) => {
	const trackRef = useRef(null);

	const handleClickLeft = useCallback(() => (trackRef.current.scrollLeft += -160), []);
	const handleClickRight = useCallback(() => (trackRef.current.scrollLeft += 160), []);

	useEffect(() => addResizeObserver(trackRef.current, () => showChevrons(trackRef.current, onResize)), [onResize]);
	useEffect(() => {
		showChevrons(trackRef.current, onResize);
	});

	return (
		<div className={`ScrollBox${className ? ` ${className}` : ''}`}>
			<IconButton
				className="ScrollBox__btn"
				icon={ChevronLeft}
				tabIndex="-1"
				aria-hidden="true"
				onMouseDown={preventDefault}
				onClick={handleClickLeft}
			/>
			<div id={trackId} className="ScrollBox__track" ref={trackRef}>
				{children}
			</div>
			<IconButton
				className="ScrollBox__btn"
				icon={ChevronRight}
				tabIndex="-1"
				aria-hidden="true"
				onMouseDown={preventDefault}
				onClick={handleClickRight}
			/>
		</div>
	);
};

ScrollBox.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The ID for the track element. */
	trackId: PropTypes.string,
	/** The nested element. */
	children: PropTypes.element,
	/** Function invoked when the element is resized. */
	onResize: PropTypes.func,
};

export default ScrollBox;
