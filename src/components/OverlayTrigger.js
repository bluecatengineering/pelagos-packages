import React, {cloneElement, Component} from 'react';
import PropTypes from 'prop-types';

import Overlay from './Overlay';

/** An overlay setup. */
export default class OverlayTrigger extends Component {
	static propTypes = {
		/** The placement of the overlay. */
		placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
		/** The element as overlay. */
		overlay: PropTypes.element,
		/** The children elements. */
		children: PropTypes.any,
	};

	state = {show: false};

	show = () => this.setState({show: true});
	hide = () => this.setState({show: false});

	render() {
		const {placement, overlay, children} = this.props;
		const show = overlay && this.state.show;
		return (
			<>
				{cloneElement(children, {
					'aria-describedby': show ? overlay.props.id : undefined,
					onMouseEnter: this.show,
					onMouseLeave: this.hide,
					onFocus: this.show,
					onBlur: this.hide,
				})}
				<Overlay show={show} placement={placement} target={this}>
					{overlay}
				</Overlay>
			</>
		);
	}
}
