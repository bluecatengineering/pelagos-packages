import {useContext} from 'react';
import {shallow} from 'enzyme';

import Layer from '../../src/components/Layer';

jest.unmock('../../src/components/Layer');

describe('Layer', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			useContext.mockReturnValue(1);
			const wrapper = shallow(<Layer>child</Layer>);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when previous layer is 3', () => {
			useContext.mockReturnValue(3);
			const wrapper = shallow(<Layer>child</Layer>);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
