import {shallow} from 'enzyme';

import PageTitle from '../../src/components/PageTitle';

jest.unmock('../../src/components/PageTitle');

describe('PageTitle', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<PageTitle title="Test" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
