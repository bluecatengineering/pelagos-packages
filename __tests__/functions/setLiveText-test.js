import setLiveText from '../../src/functions/setLiveText';

jest.unmock('../../src/functions/setLiveText');

const getElementById = jest.fn();
const createElement = jest.fn();
const appendChild = jest.fn();
global.document = {getElementById, createElement, body: {appendChild}};

describe('setLiveText', () => {
	it('sets text on a live element', () => {
		const element = Object.create({
			setAttribute(qualifiedName, value) {
				this[qualifiedName] = value;
			},
		});
		getElementById.mockReturnValue(null);
		createElement.mockReturnValue(element);
		setLiveText('Test1');
		expect(element).toMatchSnapshot();
	});

	it('sets text on a live element when the element already exists', () => {
		const element = {};
		getElementById.mockReturnValue(element);
		setLiveText('Test2');
		expect(element).toMatchSnapshot();
	});
});
