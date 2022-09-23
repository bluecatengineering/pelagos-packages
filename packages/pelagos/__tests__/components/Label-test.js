import {shallow} from 'enzyme';

import Label from '../../src/components/Label';

jest.unmock('../../src/components/Label');

describe('Label', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<Label text="Test" htmlFor="test-id" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
