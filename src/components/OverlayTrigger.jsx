import React, {cloneElement, Component} from 'react';
import PropTypes from 'prop-types';

import Overlay from './Overlay';

export default class OverlayTrigger extends Component {
	static propTypes = {
		placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
		overlay: PropTypes.element,
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
