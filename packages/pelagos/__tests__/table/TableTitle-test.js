import {shallow} from 'enzyme';

import TableTitle from '../../src/table/TableTitle';

jest.unmock('../../src/table/TableTitle');

describe('TableTitle', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<TableTitle id="test" title="Test title" description="Test description" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
