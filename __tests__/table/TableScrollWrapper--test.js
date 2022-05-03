import {shallow} from 'enzyme';

import TableScrollWrapper from '../../src/table/TableScrollWrapper';

jest.unmock('../../src/table/TableScrollWrapper');

describe('TableScrollWrapper', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<TableScrollWrapper id="test">body</TableScrollWrapper>);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(
				<TableScrollWrapper id="test" className="TestClass">
					body
				</TableScrollWrapper>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
