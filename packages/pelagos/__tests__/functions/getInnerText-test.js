import getInnerText from '../../src/functions/getInnerText';

jest.unmock('../../src/functions/getInnerText');

describe('getInnerText', () => {
	it('returns expected text when node is a string', () => {
		expect(getInnerText('foo')).toBe('foo');
	});

	it('returns expected text when node is a number', () => {
		expect(getInnerText(42)).toBe('42');
	});

	it('returns expected text when node is an element', () => {
		expect(getInnerText(<div>foo</div>)).toBe('foo');
	});

	it('returns expected text when node is an element with several children', () => {
		expect(
			getInnerText(
				<div>
					<span>foo</span>
					<span>bar</span>
				</div>
			)
		).toBe('foobar');
	});

	it('returns expected text when node is 0', () => {
		expect(getInnerText(0)).toBe('0');
		expect(getInnerText(['Item ', 0])).toBe('Item 0');
	});

	it('returns expected text when node is null', () => {
		expect(getInnerText(null)).toBe('');
	});

	it('returns expected text when node is falsy', () => {
		expect(getInnerText(false)).toBe('');
		expect(getInnerText(null)).toBe('');
		expect(getInnerText(undefined)).toBe('');
	});

	it('returns expected text when node is an empty element', () => {
		expect(getInnerText(<div />)).toBe('');
	});

	it('returns expected text when node is malformed', () => {
		expect(getInnerText({})).toBe('');
		expect(getInnerText(true)).toBe('');
	});
});
