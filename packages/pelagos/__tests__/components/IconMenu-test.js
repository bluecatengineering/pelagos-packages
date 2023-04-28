import {shallow} from 'enzyme';

import IconMenu from '../../src/components/IconMenu';
import MenuItem from '../../src/menu/MenuItem';
import useRandomId from '../../src/hooks/useRandomId';
import setRefs from '../../src/functions/setRefs';
import useMenuHandler from '../../src/hooks/useMenuHandler';

jest.unmock('../../src/components/IconMenu');

const anyFunction = expect.any(Function);

global.document = {scrollingElement: {}};
global.innerHeight = 400;

useRandomId.mockReturnValue('random-id');

describe('IconMenu', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			useMenuHandler.mockReturnValueOnce({});
			const wrapper = shallow(
				<IconMenu icon={{foo: 'test'}}>
					<MenuItem>one</MenuItem>
				</IconMenu>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			useMenuHandler.mockReturnValueOnce({});
			const wrapper = shallow(
				<IconMenu id="test" className="TestClass" icon={{foo: 'test'}} arrow>
					<MenuItem>one</MenuItem>
				</IconMenu>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(useRandomId.mock.calls).toEqual([['test']]);
		});

		it('renders expected elements when disabled is set', () => {
			useMenuHandler.mockReturnValueOnce({});
			const wrapper = shallow(
				<IconMenu icon={{foo: 'test'}} disabled>
					<MenuItem>one</MenuItem>
				</IconMenu>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when all items are disabled', () => {
			useMenuHandler.mockReturnValueOnce({});
			const wrapper = shallow(
				<IconMenu icon={{foo: 'test'}}>
					<MenuItem disabled>one</MenuItem>
				</IconMenu>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when expanded is true', () => {
			useMenuHandler.mockReturnValueOnce({expanded: true});
			const wrapper = shallow(
				<IconMenu icon={{foo: 'test'}}>
					<MenuItem>one</MenuItem>
					<MenuItem>two</MenuItem>
				</IconMenu>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		describe('setPopUpPosition', () => {
			it('sets the menu position', () => {
				const wrapper = {style: {}, dataset: {}, getBoundingClientRect: jest.fn().mockReturnValue({height: 100})};
				const menu = {parentNode: wrapper};
				const button = {
					parentNode: {dataset: {layer: '2'}},
					getBoundingClientRect: jest.fn().mockReturnValue({bottom: 100, left: 200}),
				};
				useMenuHandler.mockReturnValueOnce({});
				document.scrollingElement.scrollTop = 0;
				shallow(
					<IconMenu icon={{}}>
						<MenuItem>one</MenuItem>
					</IconMenu>
				);
				expect(useMenuHandler.mock.calls).toEqual([[anyFunction]]);

				useMenuHandler.mock.calls[0][0](button, menu);
				expect(wrapper.style).toEqual({top: '100px', left: '200px'});
				expect(wrapper.dataset).toEqual({layer: '2'});
			});

			it('sets the menu position when flipped is true', () => {
				const wrapper = {
					style: {},
					dataset: {},
					getBoundingClientRect: jest.fn().mockReturnValue({height: 100, width: 100}),
				};
				const menu = {parentNode: wrapper};
				const button = {
					parentNode: {dataset: {layer: '2'}},
					getBoundingClientRect: jest.fn().mockReturnValue({bottom: 100, right: 200}),
				};
				useMenuHandler.mockReturnValueOnce({});
				document.scrollingElement.scrollTop = 0;
				shallow(
					<IconMenu icon={{}} flipped>
						<MenuItem>one</MenuItem>
					</IconMenu>
				);
				expect(useMenuHandler.mock.calls).toEqual([[anyFunction]]);

				useMenuHandler.mock.calls[0][0](button, menu);
				expect(wrapper.style).toEqual({top: '100px', left: '100px'});
				expect(wrapper.dataset).toEqual({layer: '2'});
			});

			it('sets the menu position when the menu goes beyond the page height', () => {
				const wrapper = {style: {}, dataset: {}, getBoundingClientRect: jest.fn().mockReturnValue({height: 100})};
				const menu = {parentNode: wrapper};
				const button = {
					parentNode: {dataset: {layer: '2'}},
					getBoundingClientRect: jest.fn().mockReturnValue({top: 280, bottom: 300, left: 200}),
				};
				useMenuHandler.mockReturnValueOnce({});
				document.scrollingElement.scrollTop = 0;
				shallow(
					<IconMenu icon={{}}>
						<MenuItem>one</MenuItem>
					</IconMenu>
				);
				expect(useMenuHandler.mock.calls).toEqual([[anyFunction]]);

				useMenuHandler.mock.calls[0][0](button, menu);
				expect(wrapper.style).toEqual({top: '180px', left: '200px'});
				expect(wrapper.dataset).toEqual({layer: '2'});
			});

			it('sets the menu position when the menu does not fit in the page', () => {
				const wrapper = {style: {}, dataset: {}, getBoundingClientRect: jest.fn().mockReturnValue({height: 200})};
				const menu = {parentNode: wrapper};
				const button = {
					parentNode: {dataset: {layer: '2'}},
					getBoundingClientRect: jest.fn().mockReturnValue({top: 180, bottom: 200, left: 200}),
				};
				useMenuHandler.mockReturnValueOnce({});
				document.scrollingElement.scrollTop = 0;
				shallow(
					<IconMenu icon={{}}>
						<MenuItem>one</MenuItem>
					</IconMenu>
				);
				expect(useMenuHandler.mock.calls).toEqual([[anyFunction]]);

				useMenuHandler.mock.calls[0][0](button, menu);
				expect(wrapper.style).toEqual({top: '0px', left: '200px'});
				expect(wrapper.dataset).toEqual({layer: '2'});
			});

			it('sets the menu position when scrollTop is not 0', () => {
				const wrapper = {style: {}, dataset: {}, getBoundingClientRect: jest.fn().mockReturnValue({height: 100})};
				const menu = {parentNode: wrapper};
				const button = {
					parentNode: {dataset: {layer: '2'}},
					getBoundingClientRect: jest.fn().mockReturnValue({bottom: 100, left: 200}),
				};
				useMenuHandler.mockReturnValueOnce({});
				document.scrollingElement.scrollTop = 10;
				shallow(
					<IconMenu icon={{}}>
						<MenuItem>one</MenuItem>
					</IconMenu>
				);
				expect(useMenuHandler.mock.calls).toEqual([[anyFunction]]);

				useMenuHandler.mock.calls[0][0](button, menu);
				expect(wrapper.style).toEqual({top: '110px', left: '200px'});
				expect(wrapper.dataset).toEqual({layer: '2'});
			});
		});

		it('calls setRefs when ref is set', () => {
			const ref = {foo: 'test'};
			const buttonRef = {bar: 'test'};
			useMenuHandler.mockReturnValueOnce({buttonRef});
			IconMenu({children: []}, ref); // ref doesn't seem to be passed any other way
			expect(setRefs.mock.calls).toEqual([[ref, buttonRef]]);
		});
	});
});
