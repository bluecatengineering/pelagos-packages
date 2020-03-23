import {cloneElement, Component} from 'react';
import {createPortal, findDOMNode} from 'react-dom';
import PropTypes from 'prop-types';
import pick from 'lodash-es/pick';

import './Overlay.less';

const PROPS = ['positionLeft', 'positionTop', 'arrowOffsetLeft', 'arrowOffsetTop'];

const getOffset = (position, size, windowSize) =>
	position < 0 ? -position : position + size > windowSize ? windowSize - position - size : 0;

const addClassName = (child) => (child.props.className ? child.props.className + ' ' : '') + 'Overlay';

export default class Overlay extends Component {
	static propTypes = {
		show: PropTypes.bool,
		placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
		target: PropTypes.any,
		children: PropTypes.element,
	};

	state = {
		positionLeft: 0,
		positionTop: 0,
		arrowOffsetLeft: null,
		arrowOffsetTop: null,
		visible: false,
	};

	componentDidMount() {
		if (this.props.show) {
			this.updatePosition();
		}
	}

	componentWillUnmount() {
		if (this.timer) {
			clearTimeout(this.timer);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.show && (!prevProps.show || (!prevProps.target && this.props.target))) {
			this.updatePosition();
		}

		if (this.state.visible) {
			if (!prevState.visible) {
				this.getNode().classList.add('Overlay--visible');
			} else if (!this.props.show) {
				this.getNode().classList.remove('Overlay--visible');
				this.timer = setTimeout(() => ((this.timer = null), this.setState({visible: false})), 300);
			}
		}
	}

	getNode() {
		// The child is dynamic, there's no other way to get the node
		// eslint-disable-next-line react/no-find-dom-node
		return findDOMNode(this);
	}

	updatePosition() {
		const target = this.props.target;
		if (target) {
			// eslint-disable-next-line react/no-find-dom-node
			const rt = findDOMNode(target).getBoundingClientRect();
			const {width: childWidth, height: childHeight} = this.getNode().getBoundingClientRect();
			const placement = this.props.placement;

			let positionLeft, positionTop, arrowOffsetLeft, arrowOffsetTop;
			if (placement === 'left' || placement === 'right') {
				positionTop = rt.top + (rt.height - childHeight) / 2;
				positionLeft = rt.left + (placement === 'left' ? -childWidth : rt.width);
				const offset = getOffset(positionTop, childHeight, window.innerHeight);
				positionTop += offset;
				arrowOffsetTop = 50 * (1 - (2 * offset) / childHeight) + '%';
			} else {
				positionLeft = rt.left + (rt.width - childWidth) / 2;
				positionTop = rt.top + (placement === 'top' ? -childHeight : rt.height);
				const offset = getOffset(positionLeft, childWidth, window.innerWidth);
				positionLeft += offset;
				arrowOffsetLeft = 50 * (1 - (2 * offset) / childWidth) + '%';
			}
			this.setState({positionLeft, positionTop, arrowOffsetLeft, arrowOffsetTop, visible: true});
		}
	}

	render() {
		return this.props.show || this.state.visible
			? createPortal(
					cloneElement(this.props.children, {
						...pick(this.state, PROPS),
						className: addClassName(this.props.children),
						placement: this.props.placement,
					}),
					document.body
			  )
			: null;
	}
}
