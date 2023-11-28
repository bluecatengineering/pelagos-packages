import {shallow} from 'enzyme';

import ProgressBar from '../../src/components/ProgressBar';
import useRandomId from '../../src/hooks/useRandomId';

jest.unmock('../../src/components/ProgressBar');

useRandomId.mockReturnValue('random-id');

describe('ProgressBar', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<ProgressBar label="Test label" value={20} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(
				<ProgressBar id="test" className="TestClass" label="Test label" helperText="Test helper" value={20} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(useRandomId.mock.calls).toEqual([['test']]);
		});

		it('renders expected elements when value is not set', () => {
			const wrapper = shallow(<ProgressBar label="Test label" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when status is finished', () => {
			const wrapper = shallow(<ProgressBar label="Test label" value={20} status="finished" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when status is error', () => {
			const wrapper = shallow(<ProgressBar label="Test label" value={20} status="error" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
