import {shallow} from 'enzyme';

import ButtonMenu from '../../src/menu/ButtonMenu';
import useRandomId from '../../src/hooks/useRandomId';
import useMenuHandler from '../../src/hooks/useMenuHandler';
import useLayer from '../../src/hooks/useLayer';

jest.unmock('../../src/menu/ButtonMenu');

global.document = {body: 'body'};

useRandomId.mockReturnValue('random-id');

describe('ButtonMenu', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			useMenuHandler.mockReturnValueOnce({});
			const wrapper = shallow(
				<ButtonMenu text="Test">
					<li />
				</ButtonMenu>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			useMenuHandler.mockReturnValueOnce({});
			const wrapper = shallow(
				<ButtonMenu id="test" className="TestClass" text="Test" disabled flipped>
					<li />
				</ButtonMenu>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(useRandomId.mock.calls).toEqual([['test']]);
		});

		it('renders expected elements when expanded is true', () => {
			useMenuHandler.mockReturnValueOnce({expanded: true});
			useLayer.mockReturnValue(1);
			const wrapper = shallow(
				<ButtonMenu text="Test">
					<li />
				</ButtonMenu>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
