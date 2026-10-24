import {shallow} from 'enzyme';

import EditorGrid from '../../src/components/EditorGrid';

jest.unmock('../../src/components/EditorGrid');

describe('EditorGrid', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<EditorGrid id="test" className="TestClass">
					<div />
				</EditorGrid>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is not set', () => {
			const wrapper = shallow(
				<EditorGrid>
					<div />
				</EditorGrid>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
