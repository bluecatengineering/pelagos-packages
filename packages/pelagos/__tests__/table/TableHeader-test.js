import {shallow} from 'enzyme';

import TableHeader from '../../src/table/TableHeader';

jest.unmock('../../src/table/TableHeader');

const anyFunction = expect.any(Function);

describe('TableHeader', () => {
	describe('rendering', () => {
		it('renders expected elements when sortable is true', () => {
			const wrapper = shallow(
				<TableHeader id="test" sortable sortOrder="a" align="center">
					body
				</TableHeader>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when sortable is true and sortOrder is d', () => {
			const wrapper = shallow(
				<TableHeader id="test" sortable sortOrder="d" align="center">
					body
				</TableHeader>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when sortable is true and sortOrder is not set', () => {
			const wrapper = shallow(
				<TableHeader id="test" sortable align="center">
					body
				</TableHeader>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when sortable is true and className is set', () => {
			const wrapper = shallow(
				<TableHeader id="test" className="TestClass" sortable align="center">
					body
				</TableHeader>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when onResize is set', () => {
			const wrapper = shallow(
				<TableHeader id="test" width={100} onResize={jest.fn()}>
					body
				</TableHeader>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when both onResize and className are set', () => {
			const wrapper = shallow(
				<TableHeader id="test" className="TestClass" width={100} onResize={jest.fn()}>
					body
				</TableHeader>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when sortable is not set', () => {
			const wrapper = shallow(<TableHeader id="test">body</TableHeader>);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(
				<TableHeader id="test" className="TestClass">
					body
				</TableHeader>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when radio is set', () => {
			const wrapper = shallow(
				<TableHeader id="test" radio>
					body
				</TableHeader>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls stopPropagation when the resize handle is clicked', () => {
			const stopPropagation = jest.fn();
			const wrapper = shallow(
				<TableHeader id="test" width={100} onResize={jest.fn()}>
					body
				</TableHeader>
			);
			wrapper.find('.Table__resizeHandle').simulate('click', {stopPropagation});
			expect(stopPropagation.mock.calls).toEqual([[]]);
		});

		it('sets --table-height when the resize handle is focused', () => {
			const setProperty = jest.fn();
			const row = {style: {setProperty}, parentNode: {parentNode: {clientHeight: 400}}};
			const closest = jest.fn().mockReturnValue({parentNode: row});
			const wrapper = shallow(
				<TableHeader id="test" width={100} onResize={jest.fn()}>
					body
				</TableHeader>
			);
			wrapper.find('.Table__resizeHandle').simulate('focus', {target: {closest}});
			expect(closest.mock.calls).toEqual([['th']]);
			expect(setProperty.mock.calls).toEqual([['--table-height', '400px']]);
		});

		it('calls onResize when arrow left is pressed', () => {
			const onResize = jest.fn();
			const closest = jest.fn().mockReturnValue('test-header');
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			const wrapper = shallow(
				<TableHeader id="test" width={100} onResize={onResize}>
					body
				</TableHeader>
			);
			wrapper
				.find('.Table__resizeHandle')
				.simulate('keydown', {key: 'ArrowLeft', target: {closest}, preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(onResize.mock.calls).toEqual([[99, 'test-header']]);
		});

		it('does not call onResize when arrow left is pressed and width is the minimum', () => {
			const onResize = jest.fn();
			const closest = jest.fn().mockReturnValue('test-header');
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			const wrapper = shallow(
				<TableHeader id="test" width={40} onResize={onResize}>
					body
				</TableHeader>
			);
			wrapper
				.find('.Table__resizeHandle')
				.simulate('keydown', {key: 'ArrowLeft', target: {closest}, preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(onResize.mock.calls).toEqual([]);
		});

		it('calls onResize when arrow right is pressed', () => {
			const onResize = jest.fn();
			const closest = jest.fn().mockReturnValue('test-header');
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			const wrapper = shallow(
				<TableHeader id="test" width={100} onResize={onResize}>
					body
				</TableHeader>
			);
			wrapper
				.find('.Table__resizeHandle')
				.simulate('keydown', {key: 'ArrowRight', target: {closest}, preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(onResize.mock.calls).toEqual([[101, 'test-header']]);
		});

		it('calls onResize when page down is pressed', () => {
			const onResize = jest.fn();
			const closest = jest.fn().mockReturnValue('test-header');
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			const wrapper = shallow(
				<TableHeader id="test" width={100} onResize={onResize}>
					body
				</TableHeader>
			);
			wrapper
				.find('.Table__resizeHandle')
				.simulate('keydown', {key: 'PageDown', target: {closest}, preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(onResize.mock.calls).toEqual([[90, 'test-header']]);
		});

		it('does not call onResize when page down is pressed and width is the minimum', () => {
			const onResize = jest.fn();
			const closest = jest.fn().mockReturnValue('test-header');
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			const wrapper = shallow(
				<TableHeader id="test" width={40} onResize={onResize}>
					body
				</TableHeader>
			);
			wrapper
				.find('.Table__resizeHandle')
				.simulate('keydown', {key: 'PageDown', target: {closest}, preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(onResize.mock.calls).toEqual([]);
		});

		it('calls onResize when page up is pressed', () => {
			const onResize = jest.fn();
			const closest = jest.fn().mockReturnValue('test-header');
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			const wrapper = shallow(
				<TableHeader id="test" width={100} onResize={onResize}>
					body
				</TableHeader>
			);
			wrapper
				.find('.Table__resizeHandle')
				.simulate('keydown', {key: 'PageUp', target: {closest}, preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(onResize.mock.calls).toEqual([[110, 'test-header']]);
		});

		it('ignores the event when the pointer is pressed and button is not 0', () => {
			const onResize = jest.fn();
			const preventDefault = jest.fn();
			const wrapper = shallow(
				<TableHeader id="test" width={100} onResize={onResize}>
					body
				</TableHeader>
			);
			wrapper.find('.Table__resizeHandle').simulate('pointerdown', {button: 1, preventDefault});
			expect(preventDefault.mock.calls).toEqual([]);
			expect(onResize.mock.calls).toEqual([]);
		});

		it('initializes listeners when the pointer is pressed and button is 0', () => {
			const onResize = jest.fn();
			const setProperty = jest.fn();
			const row = {style: {setProperty}, parentNode: {parentNode: {clientHeight: 400}}};
			const header = {style: {}, parentNode: row};
			const add = jest.fn();
			const remove = jest.fn();
			const closest = jest.fn().mockReturnValue(header);
			const addEventListener = jest.fn();
			const removeEventListener = jest.fn();
			const setPointerCapture = jest.fn();
			const releasePointerCapture = jest.fn();
			const focus = jest.fn();
			const blur = jest.fn();
			const setAttribute = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			const wrapper = shallow(
				<TableHeader id="test" width={100} onResize={onResize}>
					body
				</TableHeader>
			);
			wrapper.find('.Table__resizeHandle').simulate('pointerdown', {
				button: 0,
				clientX: 200,
				pointerId: 5,
				target: {
					classList: {add, remove},
					closest,
					addEventListener,
					removeEventListener,
					setPointerCapture,
					releasePointerCapture,
					focus,
					blur,
					setAttribute,
				},
				preventDefault,
				stopPropagation,
			});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(add.mock.calls).toEqual([['resizing']]);
			expect(closest.mock.calls).toEqual([['th']]);
			expect(setProperty.mock.calls).toEqual([['--table-height', '400px']]);
			expect(addEventListener.mock.calls).toEqual([
				['pointermove', anyFunction, true],
				['pointerup', anyFunction, true],
				['pointercancel', anyFunction, true],
			]);
			expect(setPointerCapture.mock.calls).toEqual([[5]]);
			expect(focus.mock.calls).toEqual([[]]);
			expect(onResize.mock.calls).toEqual([]);

			addEventListener.mock.calls[0][1]({clientX: 250, stopPropagation});
			expect(header.style.width).toBe('150px');
			expect(setAttribute.mock.calls).toEqual([['aria-valuenow', 150]]);

			addEventListener.mock.calls[1][1]({type: 'pointerup', clientX: 230, pointerId: 5, stopPropagation});

			addEventListener.mock.calls[2][1]({type: 'pointercancel', pointerId: 5, stopPropagation});

			expect(removeEventListener.mock.calls).toEqual([...addEventListener.mock.calls, ...addEventListener.mock.calls]);
			expect(remove.mock.calls).toEqual([['resizing'], ['resizing']]);
			expect(releasePointerCapture.mock.calls).toEqual([[5], [5]]);
			expect(blur.mock.calls).toEqual([[], []]);
			expect(onResize.mock.calls).toEqual([[130, header]]);
			expect(header.style.width).toBe('100px');

			expect(stopPropagation.mock.calls).toEqual([[], [], [], []]);
		});
	});
});
