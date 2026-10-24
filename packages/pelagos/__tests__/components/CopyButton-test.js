import {useEffect, useRef} from 'react';
import {shallow} from 'enzyme';

import CopyButton from '../../src/components/CopyButton';
import useTooltipBase from '../../src/hooks/useTooltipBase';
import copyToClipboard from '../../src/functions/copyToClipboard';

jest.unmock('../../src/components/CopyButton');

describe('CopyButton', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			useTooltipBase.mockReturnValue([]);
			const wrapper = shallow(<CopyButton id="test-id" tooltipText="Test tooltip" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			useTooltipBase.mockReturnValue([]);
			const wrapper = shallow(
				<CopyButton id="test-id" className="TestClass" icon={{}} tooltipText="Test tooltip" tooltipPlacement="top" />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when disabled is true and className is not set', () => {
			useTooltipBase.mockReturnValue([]);
			const wrapper = shallow(
				<CopyButton id="test-id" tooltipText="Test tooltip" tooltipPlacement="top" disabled={true} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when disabled is true and optional properties are set', () => {
			useTooltipBase.mockReturnValue([]);
			const wrapper = shallow(
				<CopyButton
					id="test-id"
					className="TestClass"
					icon={{}}
					tooltipText="Test tooltip"
					tooltipPlacement="top"
					disabled={true}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('shows tooltip on mouseenter', () => {
			const target = {};
			const show = jest.fn();
			useRef.mockReturnValueOnce({current: target}).mockReturnValueOnce({current: null});
			useTooltipBase.mockReturnValue([show]);
			const wrapper = shallow(<CopyButton id="test-id" tooltipText="Test tooltip" tooltipPlacement="top" />);
			wrapper.find('#test-id').prop('onMouseEnter')();
			expect(show.mock.calls).toEqual([['Test tooltip', 'top', target]]);
		});

		it('shows tooltip on mouseenter when disabled', () => {
			const target = {};
			const show = jest.fn();
			useRef.mockReturnValueOnce({current: target}).mockReturnValueOnce({current: null});
			useTooltipBase.mockReturnValue([show]);
			const wrapper = shallow(
				<CopyButton id="test-id" tooltipText="Test tooltip" tooltipPlacement="top" disabled={true} />
			);
			wrapper.find('#test-id').prop('onMouseEnter')();
			expect(show.mock.calls).toEqual([['Test tooltip', 'top', target]]);
		});

		it('hides tooltip on mouseleave', () => {
			const hide = jest.fn();
			useTooltipBase.mockReturnValue([null, hide]);
			const wrapper = shallow(<CopyButton id="test-id" tooltipText="Test tooltip" tooltipPlacement="top" />);
			wrapper.find('#test-id').prop('onMouseLeave')();
			expect(hide.mock.calls).toEqual([[]]);
		});

		it('hides tooltip on mouseleave when disabled', () => {
			const hide = jest.fn();
			useTooltipBase.mockReturnValue([null, hide]);
			const wrapper = shallow(
				<CopyButton id="test-id" tooltipText="Test tooltip" tooltipPlacement="top" disabled={true} />
			);
			wrapper.find('#test-id').prop('onMouseLeave')();
			expect(hide.mock.calls).toEqual([[]]);
		});

		it('shows temporary tooltip when copy succeeds', () => {
			const target = {};
			const show = jest.fn();
			const hide = jest.fn();
			copyToClipboard.mockResolvedValue();
			useRef.mockReturnValueOnce({current: target}).mockReturnValueOnce({current: null});
			useTooltipBase.mockReturnValue([show, hide]);
			const wrapper = shallow(
				<CopyButton id="test-id" data="Test data" tooltipText="Test tooltip" tooltipPlacement="top" />
			);
			return wrapper
				.find('#test-id')
				.prop('onClick')()
				.then(() => {
					expect(copyToClipboard.mock.calls).toEqual([['Test data']]);
					expect(show.mock.calls).toEqual([['Copied', 'top', target]]);
					jest.runOnlyPendingTimers();
					expect(hide.mock.calls).toEqual([[]]);
				});
		});

		it('keeps the tooltip when the button is hovered after a copy', () => {
			const show = jest.fn();
			const hide = jest.fn();
			copyToClipboard.mockResolvedValue();
			useTooltipBase.mockReturnValue([show, hide]);
			const wrapper = shallow(<CopyButton id="test-id" tooltipText="Test tooltip" />);
			return wrapper
				.find('#test-id')
				.prop('onClick')()
				.then(() => {
					wrapper.find('#test-id').prop('onMouseEnter')();
					jest.runOnlyPendingTimers();
					expect(hide.mock.calls).toEqual([]);
				});
		});

		it('adds an effect which cancels the hide timer on unmount', () => {
			const show = jest.fn();
			const hide = jest.fn();
			copyToClipboard.mockResolvedValue();
			useTooltipBase.mockReturnValue([show, hide]);
			const wrapper = shallow(<CopyButton id="test-id" tooltipText="Test tooltip" />);
			expect(useEffect.mock.calls).toEqual([[expect.any(Function), []]]);
			return wrapper
				.find('#test-id')
				.prop('onClick')()
				.then(() => {
					useEffect.mock.calls[0][0]()();
					jest.runOnlyPendingTimers();
					expect(hide.mock.calls).toEqual([]);
				});
		});

		it('shows temporary tooltip when copy fails', () => {
			const target = {};
			const show = jest.fn();
			const hide = jest.fn();
			copyToClipboard.mockRejectedValue(new Error('Test error'));
			useRef.mockReturnValueOnce({current: target}).mockReturnValueOnce({current: null});
			useTooltipBase.mockReturnValue([show, hide]);
			const wrapper = shallow(
				<CopyButton id="test-id" data="Test data" tooltipText="Test tooltip" tooltipPlacement="top" />
			);
			return wrapper
				.find('#test-id')
				.prop('onClick')()
				.then(() => {
					expect(copyToClipboard.mock.calls).toEqual([['Test data']]);
					expect(show.mock.calls).toEqual([['Copy failed: Test error', 'top', target]]);
					jest.runOnlyPendingTimers();
					expect(hide.mock.calls).toEqual([[]]);
				});
		});
	});
});
