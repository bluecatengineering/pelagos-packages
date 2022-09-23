import {useEffect} from 'react';
import {shallow} from 'enzyme';
import {createFocusTrap} from 'focus-trap';

import Dialog from '../../src/components/Dialog';
import Button from '../../src/components/Button';

jest.unmock('../../src/components/Dialog');

const anyFunction = expect.any(Function);

global.document = {};

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
			wrapper.find('Layer').simulate('submit', event);
			expect(onSubmit.mock.calls).toEqual([[]]);
			expect(event.preventDefault.mock.calls).toEqual([[]]);
		});

		it('activates and deactivates focus trap when appropriate', () => {
			const focus = jest.fn();
			const trap = {activate: jest.fn(), deactivate: jest.fn()};
			createFocusTrap.mockReturnValue(trap);
			document.activeElement = {focus};
			shallow(
				<Dialog id="test" title="Test">
					<div />
					<div />
				</Dialog>
			);

			expect(useEffect.mock.calls[0]).toEqual([anyFunction, [undefined]]);

			const result = useEffect.mock.calls[0][0]();
			expect(createFocusTrap.mock.calls).toEqual([[null, {escapeDeactivates: false, returnFocusOnDeactivate: false}]]);
			expect(trap.activate.mock.calls).toEqual([[]]);

			result();
			expect(trap.deactivate.mock.calls).toEqual([[]]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls only deactivate when activeElement is null', () => {
			const trap = {activate: jest.fn(), deactivate: jest.fn()};
			createFocusTrap.mockReturnValue(trap);
			document.activeElement = null;
			shallow(
				<Dialog id="test" title="Test">
					<div />
					<div />
				</Dialog>
			);

			expect(useEffect.mock.calls[0]).toEqual([anyFunction, [undefined]]);

			const result = useEffect.mock.calls[0][0]();
			result();
			expect(trap.deactivate.mock.calls).toEqual([[]]);
		});
	});
});
