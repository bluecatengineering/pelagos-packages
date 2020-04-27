import React from 'react';
import {shallow} from 'enzyme';

import Button from '../../src/components/Button';
import useTooltip from '../../src/hooks/useTooltip';

jest.unmock('../../src/components/Button');

describe('Button', () => {
	describe('rendering', () => {
		it('renders expected elements when onClick is not specified', () => {
			const wrapper = shallow(<Button id="test" text="Test" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when onClick is specified', () => {
			const wrapper = shallow(<Button id="test" text="Test" onClick={jest.fn()} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(<Button id="test" text="Test" className="testClass" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when size is small', () => {
			const wrapper = shallow(<Button id="test" text="Test" size="small" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when active is true', () => {
			const wrapper = shallow(<Button id="test" text="Test" active />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when disabled is true', () => {
			const wrapper = shallow(<Button id="test" text="Test" disabled />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when both size is small and disabled is true', () => {
			const wrapper = shallow(<Button id="test" text="Test" size="small" disabled />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when disabled is true and className is set', () => {
			const wrapper = shallow(<Button id="test" text="Test" disabled className="testClass" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when tooltipText is set', () => {
			const wrapper = shallow(<Button id="test" text="Test" tooltipText="Tooltip" />);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(useTooltip.mock.calls).toEqual([['Tooltip', 'top']]);
		});
	});

	describe('behaviour', () => {
		it('calls onClick when the button is clicked', () => {
			const onClick = jest.fn();
			const wrapper = shallow(<Button id="test" text="Test" onClick={onClick} />);
			wrapper.simulate('click');
			expect(onClick).toHaveBeenCalled();
		});

		it('does not call onClick when the button is clicked if disabled is true', () => {
			const onClick = jest.fn();
			const wrapper = shallow(<Button id="test" text="Test" disabled onClick={onClick} />);
			wrapper.simulate('click');
			expect(onClick).not.toHaveBeenCalled();
		});

		it('calls onFocus when the button receives the focus', () => {
			const onFocus = jest.fn();
			const wrapper = shallow(<Button id="test" text="Test" onFocus={onFocus} />);
			wrapper.simulate('focus');
			expect(onFocus).toHaveBeenCalled();
		});

		it('calls onBlur when the button loses the focus', () => {
			const onBlur = jest.fn();
			const wrapper = shallow(<Button id="test" text="Test" onBlur={onBlur} />);
			wrapper.simulate('blur');
			expect(onBlur).toHaveBeenCalled();
		});
	});
});
