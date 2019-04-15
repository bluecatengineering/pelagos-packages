import React from 'react';
import {shallow} from 'enzyme';

import Dialog from '../../src/components/Dialog';
import Button from '../../src/components/Button';

jest.unmock('../../src/components/Dialog');

describe('Dialog', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<Dialog id="test-dialog" componentId="test-dialog" title="Test">
					<div className="TestClass">This is a test</div>
					<div>
						<Button componentId="a" text="A" />
					</div>
				</Dialog>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when child has no className', () => {
			const wrapper = shallow(
				<Dialog componentId="test-dialog" title="Test">
					<div>This is a test</div>
					<div>
						<Button componentId="a" text="A" />
					</div>
				</Dialog>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when onSubmit is set', () => {
			const wrapper = shallow(
				<Dialog componentId="test-dialog" title="Test" onSubmit={jest.fn()}>
					<div className="TestClass">This is a test</div>
					<div>
						<Button componentId="a" text="A" />
					</div>
				</Dialog>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls stopImmediatePropagation when the component is clicked', () => {
			const stopImmediatePropagation = jest.fn();
			const event = {nativeEvent: {stopImmediatePropagation}};
			const wrapper = shallow(
				<Dialog componentId="test" title="Test">
					<div />
					<div />
				</Dialog>
			);
			wrapper.simulate('click', event);
			expect(stopImmediatePropagation.mock.calls).toEqual([[]]);
		});

		it('calls onSubmit when the form is submitted', () => {
			const onSubmit = jest.fn();
			const event = {preventDefault: jest.fn()};
			const wrapper = shallow(
				<Dialog componentId="test" title="Test" onSubmit={onSubmit}>
					<div />
					<div />
				</Dialog>
			);
			wrapper.find('form').simulate('submit', event);
			expect(onSubmit).toHaveBeenCalledTimes(1);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
		});
	});
});
