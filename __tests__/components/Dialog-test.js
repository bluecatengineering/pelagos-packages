import {useEffect} from 'react';
import {shallow} from 'enzyme';
import {createFocusTrap} from 'focus-trap';

import Dialog from '../../src/components/Dialog';
import Button from '../../src/components/Button';

jest.unmock('../../src/components/Dialog');

describe('Dialog', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<Dialog id="test-dialog" className="TestClass" title="Test">
					<div className="TestClass">This is a test</div>
					<div>
						<Button id="a" text="A" />
					</div>
				</Dialog>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when child has no className', () => {
			const wrapper = shallow(
				<Dialog id="test-dialog" title="Test">
					<div>This is a test</div>
					<div>
						<Button id="a" text="A" />
					</div>
				</Dialog>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when onSubmit is set', () => {
			const wrapper = shallow(
				<Dialog id="test-dialog" title="Test" onSubmit={jest.fn()}>
					<div className="TestClass">This is a test</div>
					<div>
						<Button id="a" text="A" />
					</div>
				</Dialog>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onSubmit when the form is submitted', () => {
			const onSubmit = jest.fn();
			const event = {preventDefault: jest.fn()};
			const wrapper = shallow(
				<Dialog id="test" title="Test" onSubmit={onSubmit}>
					<div />
					<div />
				</Dialog>
			);
			wrapper.find('form').simulate('submit', event);
			expect(onSubmit).toHaveBeenCalledTimes(1);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
		});

		it('activates and deactivates focus trap when appropriate', () => {
			const previousActive = document.activeElement;
			const trap = {activate: jest.fn(), deactivate: jest.fn()};
			createFocusTrap.mockReturnValue(trap);
			jest.spyOn(previousActive, 'focus');
			shallow(
				<Dialog id="test" title="Test">
					<div />
					<div />
				</Dialog>
			);

			expect(useEffect).toHaveBeenCalledTimes(1);

			const result = useEffect.mock.calls[0][0]();
			expect(createFocusTrap.mock.calls).toEqual([[null, {escapeDeactivates: false, returnFocusOnDeactivate: false}]]);
			expect(trap.activate).toHaveBeenCalledTimes(1);

			result();
			expect(trap.deactivate).toHaveBeenCalledTimes(1);
			expect(previousActive.focus).toHaveBeenCalledTimes(1);
		});
	});
});
