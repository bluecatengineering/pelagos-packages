import moveEffect from '../../src/functions/moveEffect';

jest.unmock('../../src/functions/moveEffect');

const appendChild = jest.fn();
const removeChild = jest.fn();

global.document = {body: {appendChild, removeChild}};

describe('moveEffect', () => {
	it('calls animate', () => {
		let callback;
		const add = jest.fn();
		const animate = jest.fn().mockReturnValue({finished: {then: (f) => (callback = f)}});
		const clone = {style: {}, classList: {add}, animate};
		const element = {
			style: {},
			getBoundingClientRect: () => ({left: 60, top: 50, width: 100, height: 30}),
			cloneNode: () => clone,
		};
		moveEffect(element, {left: 110, top: 120});
		expect(clone.style).toEqual({left: '60px', top: '50px', width: '100px', height: '30px'});
		expect(appendChild.mock.calls).toEqual([[clone]]);
		expect(element.style).toEqual({opacity: '0'});
		expect(animate.mock.calls).toEqual([
			[{transform: ['translate(50px,70px)', 'translate(0,0)']}, {duration: 250, easing: 'ease-out'}],
		]);

		callback();
		expect(removeChild.mock.calls).toEqual([[clone]]);
		expect(element.style).toEqual({opacity: ''});
	});
});
