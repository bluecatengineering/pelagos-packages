import {shallow} from 'enzyme';

import DetailsListItem from '../../src/components/DetailsListItem';

jest.unmock('../../src/components/DetailsListItem');

describe('DetailsListItem', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<DetailsListItem>Test</DetailsListItem>);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(
				<DetailsListItem id="test" className="TestClass">
					Test
				</DetailsListItem>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
