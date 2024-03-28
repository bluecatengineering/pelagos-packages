import {shallow} from 'enzyme';

import Toggle from '../../src/components/Toggle';

jest.unmock('../../src/components/Toggle');

describe('Toggle', () => {
	describe('rendering', () => {
		const onChange = jest.fn();
		const getSideLabel = jest.fn().mockReturnValue('getSideLabel');
		it('renders expected elements', () => {
			const wrapper = shallow(
				<Toggle
					id="test"
					className="TestClass"
					aria-label="Test"
					checked
					onChange={onChange}
					getSideLabel={getSideLabel}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is not set', () => {
			const wrapper = shallow(
				<Toggle id="test" aria-label="Test" checked onChange={onChange} getSideLabel={getSideLabel} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when disabled is true', () => {
			const wrapper = shallow(
				<Toggle
					id="test"
					className="TestClass"
					aria-label="Test"
					checked
					disabled
					onChange={onChange}
					getSideLabel={getSideLabel}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onChange when clicked', () => {
			const onChange = jest.fn();
			const getSideLabel = jest.fn();
			const wrapper = shallow(
				<Toggle className="TestClass" aria-label="Test" checked onChange={onChange} getSideLabel={getSideLabel} />
			);
			wrapper.find('button').simulate('click');
			expect(onChange).toHaveBeenCalled();
			expect(getSideLabel).toHaveBeenCalled();
		});
	});
});
