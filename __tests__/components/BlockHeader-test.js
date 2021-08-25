import {shallow} from 'enzyme';

import BlockHeader from '../../src/components/BlockHeader';

jest.unmock('../../src/components/BlockHeader');

describe('BlockHeader', () => {
	describe('rendering', () => {
		it('renders expected elements when configured is false', () => {
			const wrapper = shallow(<BlockHeader />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when configured is true', () => {
			const wrapper = shallow(<BlockHeader configured={true} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
