'use strict';

const REACT_ELEMENT_TYPE = Symbol.for('react.element');

class Component {
	constructor(props) {
		this.props = props;
	}

	setState(state) {
		this.state = {...this.state, ...state};
	}
}

class PureComponent extends Component {
	constructor(props) {
		super(props);
		this.isPureReactComponent = true;
	}
}

class Fragment {}
Fragment.displayName = 'React.Fragment';

class Consumer {}
Consumer.displayName = 'Context.Consumer';

class Provider {}
Provider.displayName = 'Context.Provider';

class Portal {}
Portal.displayName = 'React.Portal';

const cloneElement = (element, props) => ({...element, props: {...element.props, ...props}});

const createContext = () => ({Consumer, Provider});

const createPortal = (element, container) => jsx(Portal, {container, children: element});

const forwardRef = (component) => component;

const jsx = (type, props, key) => {
	const typeType = typeof type;
	if (typeType !== 'string' && typeType !== 'function') {
		throw new Error(`The element type must be either a string or a function, got ${typeType}`);
	}

	delete props.ref;

	if (typeof type === 'function' && type.defaultProps) {
		props = {...type.defaultProps, ...props};
	}

	return {type, props, key, $$typeof: REACT_ELEMENT_TYPE};
};

const memo = (component) => {
	component.displayName = `Memo(${component.displayName || component.name})`;
	return component;
};

const unstable_batchedUpdates = (fn) => fn();

module.exports = {
	REACT_ELEMENT_TYPE,
	Component,
	PureComponent,
	Fragment,
	cloneElement,
	createContext,
	createPortal,
	forwardRef,
	jsx,
	jsxs: jsx,
	memo,
	unstable_batchedUpdates,
};
