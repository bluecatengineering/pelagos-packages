import {shallow} from 'enzyme';

import DetailEntry from '../../src/components/DetailEntry';

jest.unmock('../../src/components/DetailEntry');

describe('DetailEntry', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<DetailEntry
					id="test"
					className="TestClass"
					label="Test Label"
					value="test value"
					valueClass="TestValueClass"
					valueTitle="TestValueTitle"
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when children are specified', () => {
			const wrapper = shallow(
				<DetailEntry id="test" className="TestClass" label="Test Label" value="test value" valueClass="TestValueClass">
					Test Children
				</DetailEntry>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when direction is row', () => {
			const wrapper = shallow(
				<DetailEntry
					id="test"
					className="TestClass"
					label="Test Label"
					value="test value"
					direction="row"
					valueClass="TestValueClass"
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className and valueClass are not set', () => {
			const wrapper = shallow(<DetailEntry id="test" label="Test Label" value="test value" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
