import {useEffect, useRef} from 'react';
import {shallow} from 'enzyme';

import CheckBox from '../../src/components/CheckBox';

jest.unmock('../../src/components/CheckBox');

describe('CheckBox', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<CheckBox id="test" label="Test" checked onChange={jest.fn()} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when clasName is set', () => {
			const wrapper = shallow(<CheckBox id="test" className="TestClass" label="Test" checked onChange={jest.fn()} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when disabled is true', () => {
			const wrapper = shallow(<CheckBox id="test" label="Test" checked disabled onChange={jest.fn()} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when error is true', () => {
			const wrapper = shallow(
				<CheckBox id="test" className="TestClass" label="Test" checked error onChange={jest.fn()} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onChange when changed', () => {
			const onChange = jest.fn();
			const event = {type: 'change'};
			const wrapper = shallow(<CheckBox className="TestClass" label="Test" checked onChange={onChange} />);
			wrapper.find('input').simulate('change', event);
			expect(onChange.mock.calls).toEqual([[event]]);
		});

		it('adds an effect which sets indeterminate', () => {
			const element = {};
			useRef.mockReturnValue({current: element});
			shallow(<CheckBox indeterminate />);
			expect(useEffect.mock.calls[0]).toEqual([expect.any(Function), [true]]);

			useEffect.mock.calls[0][0]();
			expect(element).toEqual({indeterminate: true});
		});
	});
});
