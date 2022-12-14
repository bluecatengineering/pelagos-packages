import elementOfType from '../../src/functions/elementOfType';

jest.unmock('../../src/functions/elementOfType');

describe('elementOfType', () => {
	it('returns null when the property type matches', () => {
		expect(elementOfType('foo')({bar: {type: 'foo'}}, 'bar')).toBeNull();
		expect(elementOfType('foo').isRequired({bar: {type: 'foo'}}, 'bar')).toBeNull();
	});

	it('returns null when the property is null or undefined', () => {
		expect(elementOfType('foo')({bar: null}, 'bar')).toBeNull();
		expect(elementOfType('foo')({}, 'bar')).toBeNull();
	});

	it('returns an error when the property type does not match', () => {
		expect(elementOfType('foo')({bar: {type: 'baz'}}, 'bar', 'Test', 'prop')).toEqual(
			new Error('Invalid prop `bar` of type `baz` supplied to `Test`, expected instance of `foo`.')
		);
	});

	it('returns an error when the property type does not match and fullKey is passed', () => {
		expect(elementOfType('foo')({bar: {type: 'baz'}}, 'bar', 'Test', 'prop', 'fullKey')).toEqual(
			new Error('Invalid prop `fullKey` of type `baz` supplied to `Test`, expected instance of `foo`.')
		);
	});

	it('returns an error when the property type does not match and value is a string', () => {
		expect(elementOfType('foo')({bar: 'baz'}, 'bar', 'Test', 'prop')).toEqual(
			new Error('Invalid prop `bar` of type `string` supplied to `Test`, expected instance of `foo`.')
		);
	});

	it('returns an error when the property type does not match and type is a function', () => {
		const type = () => null;
		const other = () => null;
		expect(elementOfType(type)({bar: {type: other}}, 'bar', 'Test', 'prop')).toEqual(
			new Error('Invalid prop `bar` of type `other` supplied to `Test`, expected instance of `type`.')
		);
	});

	it('returns an error when the property type does not match and type is a function with displayName', () => {
		const type = () => null;
		const other = () => null;
		type.displayName = 'Type';
		other.displayName = 'Other';
		expect(elementOfType(type)({bar: {type: other}}, 'bar', 'Test', 'prop')).toEqual(
			new Error('Invalid prop `bar` of type `Other` supplied to `Test`, expected instance of `Type`.')
		);
	});

	it('returns an error when the property is required and the value is null', () => {
		expect(elementOfType('foo').isRequired({bar: null}, 'bar', 'Test', 'prop')).toEqual(
			new Error('The prop `bar` is marked as required in `Test`, but its value is `null`.')
		);
	});

	it('returns an error when the property is required and the value is undefined', () => {
		expect(elementOfType('foo').isRequired({}, 'bar', 'Test', 'prop')).toEqual(
			new Error('The prop `bar` is marked as required in `Test`, but its value is `undefined`.')
		);
	});

	it('returns null in production mode', () => {
		process.env.NODE_ENV = 'production';
		expect(elementOfType('foo')({bar: {type: 'baz'}}, 'bar', 'Test', 'prop')).toBeNull();
	});
});
