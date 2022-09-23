import {shallow} from 'enzyme';

import SelectArrow from '../../src/components/SelectArrow';

jest.unmock('../../src/components/SelectArrow');

describe('SelectArrow', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<SelectArrow className="TestClass" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
