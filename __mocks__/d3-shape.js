const lineValues = Object.assign(jest.fn(), {
	context: jest.fn().mockReturnThis(),
	curve: jest.fn().mockReturnThis(),
	defined: jest.fn().mockReturnThis(),
	x: jest.fn().mockReturnThis(),
	y: jest.fn().mockReturnThis(),
});

export const line = jest.fn().mockReturnValue(lineValues);

const arcFn = jest.fn();
export const arc = jest.fn().mockReturnValue(
	Object.assign(arcFn, {
		innerRadius: jest.fn().mockReturnThis(),
		outerRadius: jest.fn().mockReturnThis(),
		context: jest.fn().mockReturnThis(),
	})
);

const pieFn = jest.fn();
export const pie = jest.fn().mockReturnValue(
	Object.assign(pieFn, {
		value: jest.fn().mockReturnThis(),
		padAngle: jest.fn().mockReturnThis(),
	})
);

export const stackOffsetNone = 'stackOffsetNone';
export const stackOrderNone = 'stackOrderNone';

const stackFn = Object.assign(jest.fn(), {
	keys: jest.fn().mockReturnThis(),
	value: jest.fn().mockReturnThis(),
	order: jest.fn().mockReturnThis(),
	offset: jest.fn().mockReturnThis(),
});
export const stack = jest.fn().mockReturnValue(stackFn);
