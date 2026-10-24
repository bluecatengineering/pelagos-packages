const asArray = (children) => (Array.isArray(children) ? children : Array.of(children));

// Like React, toArray flattens the children and drops the ones that render nothing.
const isRendered = (child) => child !== null && child !== undefined && typeof child !== 'boolean';

module.exports = {
	...jest.requireActual('react'),
	useState: jest.fn((v) => [typeof v === 'function' ? v() : v, jest.fn()]),
	useCallback: (fn) => fn,
	useContext: jest.fn(),
	useEffect: jest.fn(),
	useLayoutEffect: jest.fn(),
	useMemo: jest.fn((f) => f()),
	useReducer: jest.fn((reducer, initial) => [initial, jest.fn()]),
	useRef: jest.fn((current) => ({current})),
	Children: {
		toArray(children) {
			return asArray(children).flat(Infinity).filter(isRendered);
		},
		map(children, fn) {
			return asArray(children).map(fn);
		},
	},
};
