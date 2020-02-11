import React from 'react';
import {shallow} from 'enzyme';

import RadioGroup from '../../src/components/RadioGroup';

jest.unmock('../../src/components/RadioGroup');

const options = ['foo', 'bar', 'baz'];
const renderLabel = v => v.toUpperCase();

describe('RadioGroup', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<RadioGroup id="test" value="foo" options={options} renderLabel={renderLabel} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls setValue when a radio button is changed', () => {
			const setValue = jest.fn();
			const wrapper = shallow(
				<RadioGroup id="test" value="foo" options={options} renderLabel={renderLabel} setValue={setValue} />
			);
			wrapper.find('#test-bar').simulate('change', {target: {dataset: {value: 'bar'}}});
			expect(setValue.mock.calls).toEqual([['bar']]);
		});

		it('calls setValue when the left key is pressed', () => {
			const setValue = jest.fn();
			const focus = jest.fn();
			const wrapper = shallow(
				<RadioGroup id="test" value="bar" options={options} renderLabel={renderLabel} setValue={setValue} />
			);
			wrapper.find('#test').simulate('keydown', {keyCode: 37, currentTarget: {childNodes: [{focus}]}});
			expect(setValue.mock.calls).toEqual([['foo']]);
			expect(focus).toHaveBeenCalledTimes(1);
		});

		it('calls setValue when the up key is pressed on the first option', () => {
			const setValue = jest.fn();
			const focus = jest.fn();
			const wrapper = shallow(
				<RadioGroup id="test" value="foo" options={options} renderLabel={renderLabel} setValue={setValue} />
			);
			wrapper.find('#test').simulate('keydown', {keyCode: 38, currentTarget: {childNodes: [{}, {}, {focus}]}});
			expect(setValue.mock.calls).toEqual([['baz']]);
			expect(focus).toHaveBeenCalledTimes(1);
		});

		it('calls setValue when the right key is pressed', () => {
			const setValue = jest.fn();
			const focus = jest.fn();
			const wrapper = shallow(
				<RadioGroup id="test" value="bar" options={options} renderLabel={renderLabel} setValue={setValue} />
			);
			wrapper.find('#test').simulate('keydown', {keyCode: 39, currentTarget: {childNodes: [{}, {}, {focus}]}});
			expect(setValue.mock.calls).toEqual([['baz']]);
			expect(focus).toHaveBeenCalledTimes(1);
		});

		it('calls setValue when the down key is pressed on the last option', () => {
			const setValue = jest.fn();
			const focus = jest.fn();
			const wrapper = shallow(
				<RadioGroup id="test" value="baz" options={options} renderLabel={renderLabel} setValue={setValue} />
			);
			wrapper.find('#test').simulate('keydown', {keyCode: 40, currentTarget: {childNodes: [{focus}]}});
			expect(setValue.mock.calls).toEqual([['foo']]);
			expect(focus).toHaveBeenCalledTimes(1);
		});

		it('does not call setValue when other key is pressed', () => {
			const setValue = jest.fn();
			const wrapper = shallow(
				<RadioGroup id="test" value="baz" options={options} renderLabel={renderLabel} setValue={setValue} />
			);
			wrapper.find('#test').simulate('keydown', {keyCode: 32});
			expect(setValue).not.toHaveBeenCalled();
		});
	});
});
