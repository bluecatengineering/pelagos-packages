import {shallow} from 'enzyme';

import TableScrollWrapper from '../../src/table/TableScrollWrapper';

jest.unmock('../../src/table/TableScrollWrapper');

describe('TableScrollWrapper', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<TableScrollWrapper id="test">body</TableScrollWrapper>);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(
				<TableScrollWrapper id="test" className="TestClass" direction="both">
					body
				</TableScrollWrapper>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
