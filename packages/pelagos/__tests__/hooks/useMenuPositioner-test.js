import useMenuPositioner from '../../src/hooks/useMenuPositioner';

jest.unmock('../../src/hooks/useMenuPositioner');

global.document = {scrollingElement: {}};
global.innerHeight = 400;

describe('useMenuPositioner', () => {
	it('sets the menu position', () => {
		const popUp = {style: {}, getBoundingClientRect: jest.fn().mockReturnValue({height: 100})};
		const menu = {parentNode: popUp};
		const button = {
			getBoundingClientRect: jest.fn().mockReturnValue({bottom: 100, left: 200}),
		};
		document.scrollingElement.scrollTop = 0;

		useMenuPositioner()(button, menu);
		expect(popUp.style).toEqual({top: '100px', left: '200px'});
	});

	it('sets the menu position when flipped is true', () => {
		const popUp = {style: {}, getBoundingClientRect: jest.fn().mockReturnValue({height: 100, width: 100})};
		const menu = {parentNode: popUp};
		const button = {
			getBoundingClientRect: jest.fn().mockReturnValue({bottom: 100, right: 200}),
		};
		document.scrollingElement.scrollTop = 0;

		useMenuPositioner(true)(button, menu);
		expect(popUp.style).toEqual({top: '100px', left: '100px'});
	});

	it('sets the menu position when the menu goes beyond the page height', () => {
		const popUp = {style: {}, getBoundingClientRect: jest.fn().mockReturnValue({height: 100})};
		const menu = {parentNode: popUp};
		const button = {
			getBoundingClientRect: jest.fn().mockReturnValue({top: 280, bottom: 300, left: 200}),
		};
		document.scrollingElement.scrollTop = 0;

		useMenuPositioner()(button, menu);
		expect(popUp.style).toEqual({top: '180px', left: '200px'});
	});

	it('sets the menu position when the menu does not fit in the page', () => {
		const popUp = {style: {}, getBoundingClientRect: jest.fn().mockReturnValue({height: 200})};
		const menu = {parentNode: popUp};
		const button = {
			getBoundingClientRect: jest.fn().mockReturnValue({top: 180, bottom: 200, left: 200}),
		};
		document.scrollingElement.scrollTop = 0;

		useMenuPositioner()(button, menu);
		expect(popUp.style).toEqual({top: '0px', left: '200px'});
	});

	it('sets the menu position when scrollTop is not 0', () => {
		const popUp = {style: {}, getBoundingClientRect: jest.fn().mockReturnValue({height: 100})};
		const menu = {parentNode: popUp};
		const button = {
			getBoundingClientRect: jest.fn().mockReturnValue({bottom: 100, left: 200}),
		};
		document.scrollingElement.scrollTop = 10;

		useMenuPositioner()(button, menu);
		expect(popUp.style).toEqual({top: '110px', left: '200px'});
	});
});
