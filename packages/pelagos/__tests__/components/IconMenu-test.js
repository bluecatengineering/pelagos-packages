import {shallow} from 'enzyme';

import IconMenu from '../../src/components/IconMenu';
import MenuItem from '../../src/menu/MenuItem';
import useRandomId from '../../src/hooks/useRandomId';
import useMenuHandler from '../../src/hooks/useMenuHandler';
import useLayer from '../../src/hooks/useLayer';

jest.unmock('../../src/components/IconMenu');

global.document = {body: 'body'};

useRandomId.mockReturnValue('random-id');

describe('IconMenu', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			useMenuHandler.mockReturnValueOnce({});
			const wrapper = shallow(
				<IconMenu>
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
			useLayer.mockReturnValue(1);
			const wrapper = shallow(
				<IconMenu icon={{foo: 'test'}}>
					<MenuItem>one</MenuItem>
					<MenuItem>two</MenuItem>
				</IconMenu>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
