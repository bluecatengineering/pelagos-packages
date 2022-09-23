import {shallow} from 'enzyme';

import DetailsGrid from '../../src/components/DetailsGrid';

jest.unmock('../../src/components/DetailsGrid');

describe('DetailsGrid', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<DetailsGrid className="TestClass">Foo</DetailsGrid>);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
