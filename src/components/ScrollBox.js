import {useCallback, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {t} from '@bluecat/l10n.macro';
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';

import handleButtonKeyDown from '../functions/handleButtonKeyDown';
import addResizeObserver from '../functions/addResizeObserver';

import SvgIcon from './SvgIcon';
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
		const track = trackRef.current;
		showChevrons(track, onResize);
	});

	return (
		<div className={`ScrollBox${className ? ` ${className}` : ''}`}>
			<div
				className="ScrollBox__btn"
				tabIndex="0"
				role="button"
				aria-label={t`Scroll left`}
				onMouseDown={preventDefault}
				onClick={handleClickLeft}
				onKeyDown={handleButtonKeyDown}>
				<SvgIcon icon={faChevronLeft} />
			</div>
			<div id={trackId} className="ScrollBox__track" ref={trackRef}>
				{children}
			</div>
			<div
				className="ScrollBox__btn"
				tabIndex="0"
				role="button"
				aria-label={t`Scroll right`}
				onMouseDown={preventDefault}
				onClick={handleClickRight}
				onKeyDown={handleButtonKeyDown}>
				<SvgIcon icon={faChevronRight} />
			</div>
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
