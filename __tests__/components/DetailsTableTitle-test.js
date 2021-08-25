import {shallow} from 'enzyme';

import DetailsSectionTitle from '../../src/components/DetailsSectionTitle';

jest.unmock('../../src/components/DetailsSectionTitle');

describe('DetailsSectionTitle', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<DetailsSectionTitle title="Test" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
