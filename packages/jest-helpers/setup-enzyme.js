'use strict';

const {configure, EnzymeAdapter} = require('enzyme');

const {REACT_ELEMENT_TYPE} = require('./mock-react');

const handlerNames = {
	blur: 'onBlur',
	change: 'onChange',
	click: 'onClick',
	focus: 'onFocus',
	focusout: 'onfocusout',
	keydown: 'onKeyDown',
	keyup: 'onKeyUp',
	mousedown: 'onMouseDown',
	mousemove: 'onMouseMove',
	mouseout: 'onMouseOut',
	mouseover: 'onMouseOver',
	mouseup: 'onMouseUp',
	paste: 'onPaste',
	submit: 'onSubmit',
};

const shallow = (el) => {
	if (!el) {
		return null;
	}
	if (Array.isArray(el)) {
		return el.map(shallow);
	}
	if (typeof el !== 'object') {
		return el;
	}
	const children = el.props && el.props.children;
	return {
		nodeType: 'host',
		type: el.type,
		props: el.props,
		rendered: Array.isArray(children) ? children.flatMap(shallow) : children ? shallow(children) : null,
	};
};

const updateInstance = (node, props, instance) => {
	while (node.props !== props || node.state !== instance.state) {
		const {props: prevProps, state: prevState} = node;
		node.props = instance.props = props;
		node.state = instance.state;
		node.rendered = shallow(instance.render());
		if (instance.componentDidUpdate) {
			instance.componentDidUpdate(prevProps, prevState);
		}
	}
};

class ShallowRenderer {
	render({type, props}) {
		const node = this._node;
		const instance = node && node.instance;
		if (instance) {
			updateInstance(node, props, instance);
		} else {
			this._node =
				typeof type === 'string'
					? shallow({type, props})
					: type.prototype && type.prototype.render
					? this._renderClass(type, props)
					: {nodeType: 'function', type, props, rendered: shallow(type(props))};
		}
	}

	getNode() {
		const node = this._node;
		const instance = node && node.instance;
		if (instance) {
			updateInstance(node, node.props, instance);
		}
		return node;
	}

	simulateEvent(node, event, ...args) {
		const name = handlerNames[event];
		if (!name) {
			throw new Error(`Unknown event ${event}`);
		}
		const handler = node.props[name];
		if (typeof handler !== 'function') {
			throw new Error(
				handler ? `Handler for event ${event} is not a function` : `Handler not found for event ${event}`
			);
		}
		handler(...args);
	}

	batchedUpdates(fn) {
		fn();
	}

	_renderClass(type, props) {
		const instance = new type(props);
		return {nodeType: 'class', type, props, instance, state: instance.state, rendered: shallow(instance.render())};
	}
}

class Adapter extends EnzymeAdapter {
	constructor() {
		super();

		this.options = {
			lifecycles: {
				componentDidUpdate: {},
			},
		};
	}

	isValidElement(el) {
		return el && el.$$typeof === REACT_ELEMENT_TYPE;
	}

	createRenderer({mode}) {
		if (mode === 'shallow') {
			return new ShallowRenderer();
		}
		throw new Error(`"${mode}" rendering is not supported`);
	}

	nodeToElement(node) {
		return node && {type: node.type, props: node.props, $$typeof: REACT_ELEMENT_TYPE};
	}

	createElement(type, props) {
		return {type, props, $$typeof: REACT_ELEMENT_TYPE};
	}
}

configure({adapter: new Adapter()});
