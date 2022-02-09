import {useRef} from 'react';
import {shallow} from 'enzyme';

import CopyButton from '../../src/components/CopyButton';
import useTooltipBase from '../../src/hooks/useTooltipBase';
import copyToClipboard from '../../src/functions/copyToClipboard';

jest.unmock('../../src/components/CopyButton');

describe('CopyButton', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			useTooltipBase.mockReturnValue([]);
			const wrapper = shallow(
				<CopyButton id="test-id" className="TestClass" tooltipText="Test tooltip" tooltipPlacement="top" />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is not set', () => {
			useTooltipBase.mockReturnValue([]);
			const wrapper = shallow(<CopyButton id="test-id" tooltipText="Test tooltip" tooltipPlacement="top" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('shows tooltip on mouseenter', () => {
			const target = {};
			const show = jest.fn();
			useRef.mockReturnValue({current: target});
			useTooltipBase.mockReturnValue([show]);
			const wrapper = shallow(<CopyButton id="test-id" tooltipText="Test tooltip" tooltipPlacement="top" />);
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

		it('shows temporary tooltip when copy succeeds', () => {
			const target = {};
			const show = jest.fn();
			const hide = jest.fn();
			copyToClipboard.mockResolvedValue();
			useRef.mockReturnValue({current: target});
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

		it('shows temporary tooltip when copy fails', () => {
			const target = {};
			const show = jest.fn();
			const hide = jest.fn();
			copyToClipboard.mockRejectedValue(new Error('Test error'));
			useRef.mockReturnValue({current: target});
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
