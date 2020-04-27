module.exports = {
	...jest.requireActual('react'),
	useState: jest.fn((v) => [v, jest.fn()]),
	useCallback: (fn) => fn,
	useContext: jest.fn(),
	useEffect: jest.fn(),
	useMemo: jest.fn((f) => f()),
	useRef: jest.fn((current) => ({current})),
};
