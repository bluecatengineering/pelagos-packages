import {shallow} from 'enzyme';

import DetailEntry from '../../src/components/DetailEntry';
import useRandomId from '../../src/hooks/useRandomId';

jest.unmock('../../src/components/DetailEntry');

useRandomId.mockReturnValue('random-id');

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
			expect(useRandomId.mock.calls).toEqual([['test']]);
		});

		it('renders expected elements when infoText is set', () => {
			const wrapper = shallow(
				<DetailEntry id="test" label="Test Label" infoText="Test info" infoTextPlacement="bottom" value="test value" />
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
