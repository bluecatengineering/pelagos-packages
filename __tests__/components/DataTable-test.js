import {useEffect, useRef, useState} from 'react';
import {shallow} from 'enzyme';
import {buildHighlighter, scrollToItem, smoothScroll} from '@bluecat/helpers';

import DataTable from '../../src/components/DataTable';

jest.unmock('../../src/components/DataTable');
jest.unmock('stable');

const originalUserAgent = navigator.userAgent;

const metadata = [
	{
		id: 'time',
		value: (item) => item.time,
		sortComparator: (a, b) => a.time - b.time,
		sortable: true,
		header: 'TIME',
		width: '10px',
	},
	{
		id: 'source',
		value: (item) => item.source,
		sortComparator: (a, b) => a.source.toLowerCase().localeCompare(b.source.toLowerCase()),
		sortable: true,
		header: 'SOURCE',
		width: '10px',
	},
	{
		id: 'site',
		value: (item) => item.site,
		sortable: false,
		header: 'SITE',
		width: '10px',
		hoverValue: true,
		className: (item, index) => 'TestClass' + index,
	},
];

const getRowId = (row) => row.id;

const createDataItem = (id, time, source, site) => ({id, time, source, site});

const testData = [
	createDataItem('r0', 2, 'a1', 'site4'),
	createDataItem('r1', 1, 'a10', 'site3'),
	createDataItem('r2', 1, 'b10', 'site5'),
	createDataItem('r3', 4, 'a1', 'site2'),
	createDataItem('r4', 3, 'A1', 'site1'),
];

const initTable = (
	addedCount,
	isLoadingNextData,
	isLoadingPrevData,
	tableBody,
	requestNextPage,
	requestPrevPage,
	data = testData
) => {
	useRef
		.mockReturnValueOnce({current: tableBody})
		.mockReturnValueOnce(isLoadingNextData)
		.mockReturnValueOnce(isLoadingPrevData)
		.mockReturnValueOnce({current: null});
	shallow(
		<DataTable
			id="test"
			metadata={metadata}
			data={data}
			addedCount={addedCount}
			requestNextPage={requestNextPage}
			requestPrevPage={requestPrevPage}
			getRowId={getRowId}
		/>
	);
};

describe('DataTable', () => {
	describe('rendering', () => {
		it('renders the expected elements if there is data', () => {
			const wrapper = shallow(
				<DataTable
					id="test"
					className="TestClass"
					metadata={metadata}
					data={testData}
					defaultSort={{columnId: 'time', order: 'a'}}
					addedCount={4}
					getRowId={getRowId}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders the expected elements if the data is empty', () => {
			const wrapper = shallow(
				<DataTable
					id="test"
					metadata={metadata}
					data={[]}
					addedCount={0}
					emptyTableText="Empty text"
					getRowId={getRowId}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders the expected elements when columns is set', () => {
			const wrapper = shallow(
				<DataTable
					id="test"
					className="TestClass"
					metadata={metadata}
					data={testData}
					columns={[2, 1]}
					defaultSort={{columnId: 'time', order: 'a'}}
					addedCount={4}
					getRowId={getRowId}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders loading spinner when loading initial data', () => {
			const wrapper = shallow(
				<DataTable id="test" metadata={metadata} data={[]} addedCount={0} fetchingNextPage={true} getRowId={getRowId} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders previous spinner when fetchingPrevPage is true', () => {
			const wrapper = shallow(
				<DataTable
					id="test"
					metadata={metadata}
					data={testData}
					addedCount={0}
					fetchingPrevPage={true}
					getRowId={getRowId}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders next spinner when fetchingNextPage is true', () => {
			const wrapper = shallow(
				<DataTable
					id="test"
					metadata={metadata}
					data={testData}
					addedCount={0}
					fetchingNextPage={true}
					getRowId={getRowId}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders the expected elements in descending order', () => {
			const wrapper = shallow(
				<DataTable
					id="test"
					metadata={metadata}
					data={testData}
					defaultSort={{columnId: 'time', order: 'd'}}
					addedCount={4}
					getRowId={getRowId}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders the expected elements using a secondary key', () => {
			useState.mockReturnValueOnce([{columnId: 'source', order: 'a'}]);
			const wrapper = shallow(
				<DataTable
					id="test"
					metadata={metadata}
					data={testData}
					defaultSort={{columnId: 'time', order: 'd'}}
					addedCount={4}
					getRowId={getRowId}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders highlighted row', () => {
			const data = {
				time: 10,
				source: 'a4',
				site: 'site',
				id: 'id',
			};
			const highlighter = jest.fn();
			const onHighlightClear = () => {};
			const highlightId = 'id';
			buildHighlighter.mockReturnValue(highlighter);

			const wrapper = shallow(
				<DataTable
					id="test"
					metadata={metadata}
					data={[data]}
					addedCount={0}
					highlightId={highlightId}
					getRowId={getRowId}
					onHighlightClear={onHighlightClear}
				/>
			);

			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders selected row', () => {
			const data = {
				time: 10,
				source: 'a4',
				site: 'site',
				id: 'id',
			};
			const selectedId = 'id';
			const wrapper = shallow(
				<DataTable
					id="test"
					metadata={metadata}
					data={[data]}
					addedCount={0}
					getRowId={getRowId}
					selectedId={selectedId}
				/>
			);

			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders focused row', () => {
			const data = {
				time: 10,
				source: 'a4',
				site: 'site',
				id: 'id',
			};
			useState.mockReturnValueOnce([]).mockReturnValueOnce([0]);
			const wrapper = shallow(
				<DataTable id="test" metadata={metadata} data={[data]} addedCount={0} getRowId={getRowId} />
			);

			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders clickable row', () => {
			const selectedId = 'site';
			const onRowClick = jest.fn();
			const wrapper = shallow(
				<DataTable
					id="test"
					metadata={metadata}
					data={testData}
					addedCount={0}
					getRowId={getRowId}
					selectedId={selectedId}
					onRowClick={onRowClick}
				/>
			);

			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		afterEach(() => Object.defineProperty(navigator, 'userAgent', {value: originalUserAgent, configurable: true}));

		it('adds a scroll listener to the table body on mount if both requestNextPage and requestPrevPage are set', () => {
			const addEventListener = jest.fn();
			const removeEventListener = jest.fn();
			const tableBody = {
				addEventListener,
				removeEventListener,
			};
			const isLoadingNextData = {current: false};
			const isLoadingPrevData = {current: false};
			initTable(0, isLoadingNextData, isLoadingPrevData, tableBody, jest.fn(), jest.fn(), []);

			expect(useEffect).toHaveBeenCalledTimes(3);

			const result = useEffect.mock.calls[0][0]();
			expect(addEventListener.mock.calls).toEqual([['scroll', expect.any(Function), {passive: true}]]);

			result();
			expect(removeEventListener.mock.calls).toEqual([['scroll', addEventListener.mock.calls[0][1]]]);
		});

		it('adds a scroll listener to the table body on mount if both requestNextPage and requestPrevPage are set and the browser is IE', () => {
			const addEventListener = jest.fn();
			const removeEventListener = jest.fn();
			const tableBody = {
				addEventListener,
				removeEventListener,
			};
			const isLoadingNextData = {current: false};
			const isLoadingPrevData = {current: false};
			initTable(0, isLoadingNextData, isLoadingPrevData, tableBody, jest.fn(), jest.fn(), []);

			expect(useEffect).toHaveBeenCalledTimes(3);

			Object.defineProperty(navigator, 'userAgent', {value: 'Trident/0', configurable: true});
			useEffect.mock.calls[0][0]();
			expect(addEventListener.mock.calls).toEqual([['scroll', expect.any(Function), false]]);
		});

		it('does not add a scroll listener to the table body on mount if neither requestNextPage and requestPrevPage are set', () => {
			const addEventListener = jest.fn();
			const removeEventListener = jest.fn();
			const tableBody = {
				addEventListener,
				removeEventListener,
			};
			const isLoadingNextData = {current: false};
			const isLoadingPrevData = {current: false};
			initTable(0, isLoadingNextData, isLoadingPrevData, tableBody, null, null, []);

			expect(useEffect).toHaveBeenCalledTimes(3);

			useEffect.mock.calls[0][0]();
			expect(addEventListener).not.toHaveBeenCalled();
		});

		it('calls requestNextPage when scroll bar at the bottom', () => {
			const addEventListener = jest.fn();
			const tableBody = {
				clientHeight: 100,
				scrollHeight: 1000,
				scrollTop: 900,
				addEventListener,
			};
			const requestNextPage = jest.fn().mockReturnValue(true);
			const requestPrevPage = jest.fn().mockReturnValue(true);
			const isLoadingNextData = {current: false};
			const isLoadingPrevData = {current: false};
			initTable(0, isLoadingNextData, isLoadingPrevData, tableBody, requestNextPage, requestPrevPage);

			expect(useEffect).toHaveBeenCalledTimes(3);

			useEffect.mock.calls[0][0]();
			expect(addEventListener.mock.calls).toEqual([['scroll', expect.any(Function), {passive: true}]]);

			addEventListener.mock.calls[0][1]();
			jest.runOnlyPendingTimers();

			expect(requestNextPage).toHaveBeenCalledTimes(1);
			expect(isLoadingNextData.current).toBe(true);
			expect(isLoadingPrevData.current).toBe(false);
		});

		it('calls requestPrevPage when scroll bar at the top', () => {
			const addEventListener = jest.fn();
			const tableBody = {
				clientHeight: 100,
				scrollHeight: 1000,
				scrollTop: 0,
				addEventListener,
			};
			const requestNextPage = jest.fn().mockReturnValue(true);
			const requestPrevPage = jest.fn().mockReturnValue(true);
			const isLoadingNextData = {current: false};
			const isLoadingPrevData = {current: false};
			initTable(0, isLoadingNextData, isLoadingPrevData, tableBody, requestNextPage, requestPrevPage);

			expect(useEffect).toHaveBeenCalledTimes(3);

			useEffect.mock.calls[0][0]();
			expect(addEventListener.mock.calls).toEqual([['scroll', expect.any(Function), {passive: true}]]);

			addEventListener.mock.calls[0][1]();
			jest.runOnlyPendingTimers();

			expect(requestPrevPage).toHaveBeenCalledTimes(1);
			expect(isLoadingNextData.current).toBe(false);
			expect(isLoadingPrevData.current).toBe(true);
		});

		it('does not call neither requestNextPage nor requestPrevPage when scroll bar is in the middle', () => {
			const addEventListener = jest.fn();
			const tableBody = {
				clientHeight: 100,
				scrollHeight: 1000,
				scrollTop: 500,
				addEventListener,
			};
			const requestNextPage = jest.fn().mockReturnValue(true);
			const requestPrevPage = jest.fn().mockReturnValue(true);
			const isLoadingNextData = {current: false};
			const isLoadingPrevData = {current: false};
			initTable(0, isLoadingNextData, isLoadingPrevData, tableBody, requestNextPage, requestPrevPage);

			expect(useEffect).toHaveBeenCalledTimes(3);

			useEffect.mock.calls[0][0]();
			expect(addEventListener.mock.calls).toEqual([['scroll', expect.any(Function), {passive: true}]]);

			addEventListener.mock.calls[0][1]();
			jest.runOnlyPendingTimers();

			expect(requestNextPage).not.toHaveBeenCalled();
			expect(requestPrevPage).not.toHaveBeenCalled();
		});

		it('does not call neither requestNextPage nor requestPrevPage when data is empty', () => {
			const addEventListener = jest.fn();
			const tableBody = {
				clientHeight: 100,
				scrollHeight: 1000,
				scrollTop: 500,
				addEventListener,
			};
			const requestNextPage = jest.fn().mockReturnValue(true);
			const requestPrevPage = jest.fn().mockReturnValue(true);
			const isLoadingNextData = {current: false};
			const isLoadingPrevData = {current: false};
			initTable(0, isLoadingNextData, isLoadingPrevData, tableBody, requestNextPage, requestPrevPage, []);

			expect(useEffect).toHaveBeenCalledTimes(3);

			useEffect.mock.calls[0][0]();
			expect(addEventListener.mock.calls).toEqual([['scroll', expect.any(Function), {passive: true}]]);

			addEventListener.mock.calls[0][1]();
			jest.runOnlyPendingTimers();

			expect(requestNextPage).not.toHaveBeenCalled();
			expect(requestPrevPage).not.toHaveBeenCalled();
		});

		it('updates the table scrollTop when the next data is loaded', () => {
			const tableBody = {
				clientHeight: 100,
				scrollHeight: 1000,
				scrollTop: 900,
			};
			const isLoadingNextData = {current: true};
			const isLoadingPrevData = {current: false};
			initTable(2, isLoadingNextData, isLoadingPrevData, tableBody, jest.fn(), jest.fn());

			expect(useEffect).toHaveBeenCalledTimes(3);

			useEffect.mock.calls[2][0]();
			expect(tableBody.scrollTop).toBe(500);
			expect(isLoadingNextData.current).toBe(false);
			expect(isLoadingPrevData.current).toBe(false);
		});

		it('updates the table scrollTop and sets focused when the next data is loaded and focused is not -1', () => {
			const setFocused = jest.fn();
			const tableBody = {
				clientHeight: 100,
				scrollHeight: 1000,
				scrollTop: 900,
			};
			const isLoadingNextData = {current: true};
			const isLoadingPrevData = {current: false};
			useState.mockReturnValueOnce([]).mockReturnValueOnce([4, setFocused]);
			initTable(2, isLoadingNextData, isLoadingPrevData, tableBody, jest.fn(), jest.fn());

			expect(useEffect).toHaveBeenCalledTimes(3);

			useEffect.mock.calls[2][0]();
			expect(tableBody.scrollTop).toBe(500);
			expect(isLoadingNextData.current).toBe(false);
			expect(isLoadingPrevData.current).toBe(false);
			expect(setFocused.mock.calls).toEqual([[2]]);
		});

		it('updates the table scrollTop and sets focused when the next data is loaded and focused would be less than 0', () => {
			const setFocused = jest.fn();
			const tableBody = {
				clientHeight: 100,
				scrollHeight: 1000,
				scrollTop: 900,
			};
			const isLoadingNextData = {current: true};
			const isLoadingPrevData = {current: false};
			useState.mockReturnValueOnce([]).mockReturnValueOnce([1, setFocused]);
			initTable(2, isLoadingNextData, isLoadingPrevData, tableBody, jest.fn(), jest.fn());

			expect(useEffect).toHaveBeenCalledTimes(3);

			useEffect.mock.calls[2][0]();
			expect(tableBody.scrollTop).toBe(500);
			expect(isLoadingNextData.current).toBe(false);
			expect(isLoadingPrevData.current).toBe(false);
			expect(setFocused.mock.calls).toEqual([[0]]);
		});

		it('updates the table scrollTop when the previous data is loaded', () => {
			const tableBody = {
				clientHeight: 100,
				scrollHeight: 1000,
				scrollTop: 0,
			};
			const isLoadingNextData = {current: false};
			const isLoadingPrevData = {current: true};
			initTable(2, isLoadingNextData, isLoadingPrevData, tableBody, jest.fn(), jest.fn());

			expect(useEffect).toHaveBeenCalledTimes(3);

			useEffect.mock.calls[2][0]();
			expect(tableBody.scrollTop).toBe(400);
			expect(isLoadingNextData.current).toBe(false);
			expect(isLoadingPrevData.current).toBe(false);
		});

		it('updates the table scrollTop and sets focused when the previous data is loaded and focused is not -1', () => {
			const setFocused = jest.fn();
			const tableBody = {
				clientHeight: 100,
				scrollHeight: 1000,
				scrollTop: 0,
			};
			const isLoadingNextData = {current: false};
			const isLoadingPrevData = {current: true};
			useState.mockReturnValueOnce([]).mockReturnValueOnce([2, setFocused]);
			initTable(2, isLoadingNextData, isLoadingPrevData, tableBody, jest.fn(), jest.fn());

			expect(useEffect).toHaveBeenCalledTimes(3);

			useEffect.mock.calls[2][0]();
			expect(tableBody.scrollTop).toBe(400);
			expect(isLoadingNextData.current).toBe(false);
			expect(isLoadingPrevData.current).toBe(false);
			expect(setFocused.mock.calls).toEqual([[4]]);
		});

		it('updates the table scrollTop and sets focused when the previous data is loaded and focused would be larger than data length', () => {
			const setFocused = jest.fn();
			const tableBody = {
				clientHeight: 100,
				scrollHeight: 1000,
				scrollTop: 0,
			};
			const isLoadingNextData = {current: false};
			const isLoadingPrevData = {current: true};
			useState.mockReturnValueOnce([]).mockReturnValueOnce([4, setFocused]);
			initTable(2, isLoadingNextData, isLoadingPrevData, tableBody, jest.fn(), jest.fn());

			expect(useEffect).toHaveBeenCalledTimes(3);

			useEffect.mock.calls[2][0]();
			expect(tableBody.scrollTop).toBe(400);
			expect(isLoadingNextData.current).toBe(false);
			expect(isLoadingPrevData.current).toBe(false);
			expect(setFocused.mock.calls).toEqual([[4]]);
		});

		it('does not update the table scrollTop when no data is loaded', () => {
			const tableBody = {
				clientHeight: 100,
				scrollHeight: 1000,
				scrollTop: 500,
			};
			const isLoadingNextData = {current: false};
			const isLoadingPrevData = {current: false};
			initTable(2, isLoadingNextData, isLoadingPrevData, tableBody, jest.fn(), jest.fn());

			expect(useEffect).toHaveBeenCalledTimes(3);

			useEffect.mock.calls[2][0]();
			expect(tableBody.scrollTop).toBe(500);
			expect(isLoadingNextData.current).toBe(false);
			expect(isLoadingPrevData.current).toBe(false);
		});

		it('sets focused to the index of the row on mouse down', () => {
			const setFocused = jest.fn();
			const element = {dataset: {index: '1'}};
			const closest = jest.fn().mockReturnValue(element);
			const event = {target: {closest}};
			useState.mockReturnValueOnce([]).mockReturnValueOnce([0, setFocused]);
			const wrapper = shallow(
				<DataTable id="test" metadata={metadata} data={testData} addedCount={0} getRowId={getRowId} />
			);
			const table = wrapper.find('#test-tableBody');

			table.simulate('mousedown', event);

			expect(closest.mock.calls).toEqual([['.DataTable__row']]);
			expect(setFocused.mock.calls).toEqual([[1]]);
		});

		it('does not set focused on mouse down other elements', () => {
			const setFocused = jest.fn();
			const closest = jest.fn();
			const event = {target: {closest}};
			useState.mockReturnValueOnce([]).mockReturnValueOnce([0, setFocused]);
			const wrapper = shallow(
				<DataTable id="test" metadata={metadata} data={testData} addedCount={0} getRowId={getRowId} />
			);
			const table = wrapper.find('#test-tableBody');

			table.simulate('mousedown', event);

			expect(closest.mock.calls).toEqual([['.DataTable__row']]);
			expect(setFocused).not.toHaveBeenCalled();
		});

		it('does not change focused on mouse out when hasFocus is true', () => {
			const setFocused = jest.fn();
			useState.mockReturnValueOnce([]).mockReturnValueOnce([0, setFocused]);
			const wrapper = shallow(
				<DataTable id="test" metadata={metadata} data={testData} addedCount={0} getRowId={getRowId} />
			);
			const table = wrapper.find('#test-tableBody');

			table.simulate('mouseout');

			expect(setFocused).not.toHaveBeenCalled();
		});

		it('calls onRowClick when user clicks on a row', () => {
			const focus = jest.fn();
			const tableBody = {focus};
			const element = {dataset: {index: '1'}};
			const closest = jest.fn().mockReturnValue(element);
			const event = {target: {closest}, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const onRowClick = jest.fn();
			useRef.mockReturnValueOnce({current: tableBody});
			const wrapper = shallow(
				<DataTable
					id="test"
					metadata={metadata}
					data={testData}
					addedCount={0}
					getRowId={getRowId}
					onRowClick={onRowClick}
				/>
			);
			const table = wrapper.find('#test-tableBody');

			table.simulate('click', event);

			expect(closest.mock.calls).toEqual([['.DataTable__row']]);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(event.nativeEvent.stopImmediatePropagation).toHaveBeenCalledTimes(1);
			expect(focus).toHaveBeenCalledTimes(1);
			expect(onRowClick.mock.calls).toEqual([[testData[1]]]);
		});

		it('does not call onRowClick when user clicks but a row is not found', () => {
			const closest = jest.fn();
			const event = {target: {closest}, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const onRowClick = jest.fn();
			const wrapper = shallow(
				<DataTable
					id="test"
					metadata={metadata}
					data={testData}
					addedCount={0}
					getRowId={getRowId}
					onRowClick={onRowClick}
				/>
			);
			const table = wrapper.find('#test-tableBody');

			table.simulate('click', event);

			expect(closest.mock.calls).toEqual([['.DataTable__row']]);
			expect(event.preventDefault).not.toHaveBeenCalled();
			expect(event.nativeEvent.stopImmediatePropagation).not.toHaveBeenCalled();
			expect(onRowClick).not.toHaveBeenCalled();
		});

		it('sets focused to 0 on focus when focused is -1 and selectedId is not set', () => {
			const setFocused = jest.fn();
			const child = {};
			const querySelector = jest.fn().mockReturnValue({tBodies: [{children: [child]}]});
			const tableBody = {querySelector};
			useState.mockReturnValueOnce([]).mockReturnValueOnce([-1, setFocused]);
			useRef.mockReturnValueOnce({current: tableBody});
			const wrapper = shallow(
				<DataTable id="test" metadata={metadata} data={testData} addedCount={0} getRowId={getRowId} />
			);
			const table = wrapper.find('#test-tableBody');

			table.simulate('focus');

			expect(setFocused.mock.calls).toEqual([[0]]);
			expect(querySelector.mock.calls).toEqual([['table']]);
			expect(scrollToItem.mock.calls).toEqual([[tableBody, child]]);
		});

		it('sets focused to the selected item index on focus when focused is -1 and selectedId is set', () => {
			const setFocused = jest.fn();
			const child = {};
			const querySelector = jest.fn().mockReturnValue({tBodies: [{children: [null, null, child]}]});
			const tableBody = {querySelector};
			useState.mockReturnValueOnce([]).mockReturnValueOnce([-1, setFocused]);
			useRef.mockReturnValueOnce({current: tableBody});
			const wrapper = shallow(
				<DataTable id="test" metadata={metadata} data={testData} addedCount={0} selectedId="r2" getRowId={getRowId} />
			);
			const table = wrapper.find('#test-tableBody');

			table.simulate('focus');

			expect(setFocused.mock.calls).toEqual([[2]]);
			expect(querySelector.mock.calls).toEqual([['table']]);
			expect(scrollToItem.mock.calls).toEqual([[tableBody, child]]);
		});

		it('sets focused to 0 on focus when focused is -1, selectedId is set and the selected item is not found', () => {
			const setFocused = jest.fn();
			const child = {};
			const querySelector = jest.fn().mockReturnValue({tBodies: [{children: [child]}]});
			const tableBody = {querySelector};
			useState.mockReturnValueOnce([]).mockReturnValueOnce([-1, setFocused]);
			useRef.mockReturnValueOnce({current: tableBody});
			const wrapper = shallow(
				<DataTable id="test" metadata={metadata} data={testData} addedCount={0} selectedId="r9" getRowId={getRowId} />
			);
			const table = wrapper.find('#test-tableBody');

			table.simulate('focus');

			expect(setFocused.mock.calls).toEqual([[0]]);
			expect(querySelector.mock.calls).toEqual([['table']]);
			expect(scrollToItem.mock.calls).toEqual([[tableBody, child]]);
		});

		it('does not set focused on focus when focused is not -1', () => {
			const setFocused = jest.fn();
			useState.mockReturnValueOnce([]).mockReturnValueOnce([1, setFocused]);
			const wrapper = shallow(
				<DataTable id="test" metadata={metadata} data={testData} addedCount={0} getRowId={getRowId} />
			);
			const table = wrapper.find('#test-tableBody');

			table.simulate('focus');

			expect(setFocused).not.toHaveBeenCalled();
		});

		it('sets focused to -1 on blur', () => {
			const setFocused = jest.fn();
			useState.mockReturnValueOnce([]).mockReturnValueOnce([0, setFocused]);
			const wrapper = shallow(
				<DataTable id="test" metadata={metadata} data={testData} addedCount={0} getRowId={getRowId} />
			);
			const table = wrapper.find('#test-tableBody');

			table.simulate('blur');

			expect(setFocused.mock.calls).toEqual([[-1]]);
		});

		it('prevents event default when enter or space are pressed', () => {
			const preventDefault = jest.fn();
			const nativeEvent = {stopImmediatePropagation: jest.fn()};
			const wrapper = shallow(
				<DataTable id="test" metadata={metadata} data={testData} addedCount={0} getRowId={getRowId} />
			);
			const table = wrapper.find('#test-tableBody');

			table.simulate('keydown', {keyCode: 13, preventDefault, nativeEvent});
			table.simulate('keydown', {keyCode: 32, preventDefault, nativeEvent});

			expect(preventDefault).toHaveBeenCalledTimes(2);
		});

		it('scrolls the table up when page up is pressed', () => {
			const setFocused = jest.fn();
			const event = {keyCode: 33, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const child = {offsetHeight: 25};
			const querySelector = jest.fn().mockReturnValue({tBodies: [{children: [child]}]});
			const tableBody = {
				clientHeight: 50,
				scrollTop: 25,
				querySelector,
			};
			useState.mockReturnValueOnce([]).mockReturnValueOnce([2, setFocused]);
			useRef.mockReturnValueOnce({current: tableBody});
			const wrapper = shallow(
				<DataTable id="test" metadata={metadata} data={testData} addedCount={0} getRowId={getRowId} />
			);
			const table = wrapper.find('#test-tableBody');

			table.simulate('keydown', event);

			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[0]]);
			expect(smoothScroll.mock.calls).toEqual([[tableBody, 25, -25, 150]]);
		});

		it('focuses the first row when page up is pressed and the table cannot be scrolled up', () => {
			const setFocused = jest.fn();
			const event = {keyCode: 33, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const tableBody = {
				clientHeight: 50,
				scrollTop: 0,
			};
			useState.mockReturnValueOnce([]).mockReturnValueOnce([1, setFocused]);
			useRef.mockReturnValueOnce({current: tableBody});
			const wrapper = shallow(
				<DataTable id="test" metadata={metadata} data={testData} addedCount={0} getRowId={getRowId} />
			);
			const table = wrapper.find('#test-tableBody');

			table.simulate('keydown', event);

			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[0]]);
			expect(smoothScroll).not.toHaveBeenCalled();
		});

		it('scrolls the table down when page down is pressed', () => {
			const setFocused = jest.fn();
			const event = {keyCode: 34, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const child = {offsetHeight: 25};
			const querySelector = jest.fn().mockReturnValue({tBodies: [{children: [child]}]});
			const tableBody = {
				clientHeight: 50,
				scrollTop: 0,
				scrollHeight: 125,
				querySelector,
			};
			useState.mockReturnValueOnce([]).mockReturnValueOnce([2, setFocused]);
			useRef.mockReturnValueOnce({current: tableBody});
			const wrapper = shallow(
				<DataTable id="test" metadata={metadata} data={testData} addedCount={0} getRowId={getRowId} />
			);
			const table = wrapper.find('#test-tableBody');

			table.simulate('keydown', event);

			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[4]]);
			expect(smoothScroll.mock.calls).toEqual([[tableBody, 0, 50, 150]]);
		});

		it('focuses the last row when page down is pressed and the table cannot be scrolled down', () => {
			const setFocused = jest.fn();
			const event = {keyCode: 34, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const tableBody = {
				clientHeight: 50,
				scrollTop: 75,
				scrollHeight: 125,
			};
			useState.mockReturnValueOnce([]).mockReturnValueOnce([1, setFocused]);
			useRef.mockReturnValueOnce({current: tableBody});
			const wrapper = shallow(
				<DataTable id="test" metadata={metadata} data={testData} addedCount={0} getRowId={getRowId} />
			);
			const table = wrapper.find('#test-tableBody');

			table.simulate('keydown', event);

			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[4]]);
			expect(smoothScroll).not.toHaveBeenCalled();
		});

		it('focuses the last row when end is pressed', () => {
			const setFocused = jest.fn();
			const event = {keyCode: 35, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const child = {};
			const querySelector = jest.fn().mockReturnValue({tBodies: [{children: [null, null, null, null, child]}]});
			const tableBody = {querySelector};
			useState.mockReturnValueOnce([]).mockReturnValueOnce([2, setFocused]);
			useRef.mockReturnValueOnce({current: tableBody});
			const wrapper = shallow(
				<DataTable id="test" metadata={metadata} data={testData} addedCount={0} getRowId={getRowId} />
			);
			const table = wrapper.find('#test-tableBody');

			table.simulate('keydown', event);

			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[4]]);
			expect(scrollToItem.mock.calls).toEqual([[tableBody, child]]);
		});

		it('focuses the first row when home is pressed', () => {
			const setFocused = jest.fn();
			const event = {keyCode: 36, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const child = {};
			const querySelector = jest.fn().mockReturnValue({tBodies: [{children: [child]}]});
			const tableBody = {querySelector};
			useState.mockReturnValueOnce([]).mockReturnValueOnce([2, setFocused]);
			useRef.mockReturnValueOnce({current: tableBody});
			const wrapper = shallow(
				<DataTable id="test" metadata={metadata} data={testData} addedCount={0} getRowId={getRowId} />
			);
			const table = wrapper.find('#test-tableBody');

			table.simulate('keydown', event);

			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[0]]);
			expect(scrollToItem.mock.calls).toEqual([[tableBody, child]]);
		});

		it('focuses the previous row when up is pressed', () => {
			const setFocused = jest.fn();
			const event = {keyCode: 38, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const child = {};
			const querySelector = jest.fn().mockReturnValue({tBodies: [{children: [null, child]}]});
			const tableBody = {querySelector};
			useState.mockReturnValueOnce([]).mockReturnValueOnce([2, setFocused]);
			useRef.mockReturnValueOnce({current: tableBody});
			const wrapper = shallow(
				<DataTable id="test" metadata={metadata} data={testData} addedCount={0} getRowId={getRowId} />
			);
			const table = wrapper.find('#test-tableBody');

			table.simulate('keydown', event);

			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[1]]);
			expect(scrollToItem.mock.calls).toEqual([[tableBody, child]]);
		});

		it('does not set focused when up is pressed and the first option is focused', () => {
			const setFocused = jest.fn();
			const event = {keyCode: 38, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			useState.mockReturnValueOnce([]).mockReturnValueOnce([0, setFocused]);
			const wrapper = shallow(
				<DataTable id="test" metadata={metadata} data={testData} addedCount={0} getRowId={getRowId} />
			);
			const table = wrapper.find('#test-tableBody');

			table.simulate('keydown', event);

			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused).not.toHaveBeenCalled();
		});

		it('focuses the next row when down is pressed', () => {
			const setFocused = jest.fn();
			const event = {keyCode: 40, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const child = {};
			const querySelector = jest.fn().mockReturnValue({tBodies: [{children: [null, null, null, child]}]});
			const tableBody = {querySelector};
			useState.mockReturnValueOnce([]).mockReturnValueOnce([2, setFocused]);
			useRef.mockReturnValueOnce({current: tableBody});
			const wrapper = shallow(
				<DataTable id="test" metadata={metadata} data={testData} addedCount={0} getRowId={getRowId} />
			);
			const table = wrapper.find('#test-tableBody');

			table.simulate('keydown', event);

			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[3]]);
			expect(scrollToItem.mock.calls).toEqual([[tableBody, child]]);
		});

		it('does not set focused when down is pressed and the last option is focused', () => {
			const setFocused = jest.fn();
			const event = {keyCode: 40, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			useState.mockReturnValueOnce([]).mockReturnValueOnce([4, setFocused]);
			const wrapper = shallow(
				<DataTable id="test" metadata={metadata} data={testData} addedCount={0} getRowId={getRowId} />
			);
			const table = wrapper.find('#test-tableBody');

			table.simulate('keydown', event);

			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused).not.toHaveBeenCalled();
		});

		it('ignores the event when a key is pressed and any modifier is set', () => {
			const preventDefault = jest.fn();
			const wrapper = shallow(
				<DataTable id="test" metadata={metadata} data={testData} addedCount={0} getRowId={getRowId} />
			);
			const table = wrapper.find('#test-tableBody');

			table.simulate('keydown', {keyCode: 13, shiftKey: true, preventDefault});
			table.simulate('keydown', {keyCode: 13, ctrlKey: true, preventDefault});
			table.simulate('keydown', {keyCode: 13, altKey: true, preventDefault});
			table.simulate('keydown', {keyCode: 13, metaKey: true, preventDefault});

			expect(preventDefault).not.toHaveBeenCalled();
		});

		it('calls onRowClick when enter is released', () => {
			const onRowClick = jest.fn();
			const event = {keyCode: 13, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			useState.mockReturnValueOnce([]).mockReturnValueOnce([2]);
			const wrapper = shallow(
				<DataTable
					id="test"
					metadata={metadata}
					data={testData}
					addedCount={0}
					getRowId={getRowId}
					onRowClick={onRowClick}
				/>
			);
			const table = wrapper.find('#test-tableBody');

			table.simulate('keyup', event);

			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(onRowClick.mock.calls).toEqual([[testData[2]]]);
		});

		it('calls onRowClick when space is released', () => {
			const onRowClick = jest.fn();
			const event = {keyCode: 32, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			useState.mockReturnValueOnce([]).mockReturnValueOnce([2]);
			const wrapper = shallow(
				<DataTable
					id="test"
					metadata={metadata}
					data={testData}
					addedCount={0}
					getRowId={getRowId}
					onRowClick={onRowClick}
				/>
			);
			const table = wrapper.find('#test-tableBody');

			table.simulate('keyup', event);

			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(onRowClick.mock.calls).toEqual([[testData[2]]]);
		});

		it('ignores the event when a key is released and any modifier is set', () => {
			const preventDefault = jest.fn();
			const wrapper = shallow(
				<DataTable
					id="test"
					metadata={metadata}
					data={testData}
					addedCount={0}
					getRowId={getRowId}
					onRowClick={jest.fn()}
				/>
			);
			const table = wrapper.find('#test-tableBody');

			table.simulate('keyup', {keyCode: 13, shiftKey: true, preventDefault});
			table.simulate('keyup', {keyCode: 13, ctrlKey: true, preventDefault});
			table.simulate('keyup', {keyCode: 13, altKey: true, preventDefault});
			table.simulate('keyup', {keyCode: 13, metaKey: true, preventDefault});

			expect(preventDefault).not.toHaveBeenCalled();
		});

		it('scrolls to the highlighted row on mount', () => {
			const highlighter = jest.fn();
			const onHighlightClear = () => {};
			const highlightId = 'id';
			buildHighlighter.mockReturnValue(highlighter);

			shallow(
				<DataTable
					id="test"
					metadata={metadata}
					data={[]}
					addedCount={0}
					highlightId={highlightId}
					getRowId={getRowId}
					onHighlightClear={onHighlightClear}
				/>
			);

			expect(useEffect).toHaveBeenCalledTimes(3);

			useEffect.mock.calls[1][0]();
			expect(highlighter.mock.calls).toEqual([[highlightId, onHighlightClear]]);
		});

		it('does not scroll on mount if highlightId is not set', () => {
			const highlighter = jest.fn();
			buildHighlighter.mockReturnValue(highlighter);

			shallow(<DataTable id="test" metadata={metadata} data={[]} addedCount={0} getRowId={getRowId} />);

			expect(useEffect).toHaveBeenCalledTimes(3);

			useEffect.mock.calls[1][0]();
			expect(highlighter).not.toHaveBeenCalled();
		});

		it('updates the sort column when the order is asc the sorted header is clicked', () => {
			const dataSort = {columnId: 'time', order: 'a'};
			const setDataSort = jest.fn();
			useState.mockReturnValueOnce([dataSort, setDataSort]);
			const wrapper = shallow(
				<DataTable
					id="test"
					metadata={metadata}
					data={testData}
					defaultSort={dataSort}
					addedCount={0}
					getRowId={getRowId}
				/>
			);

			wrapper.find('th').at(0).simulate('click');
			expect(setDataSort.mock.calls).toEqual([[expect.any(Function)]]);
			expect(setDataSort.mock.calls[0][0](dataSort)).toEqual({columnId: 'time', order: 'd'});
		});

		it('updates the sort column when the order is desc the sorted header is clicked', () => {
			const dataSort = {columnId: 'time', order: 'd'};
			const setDataSort = jest.fn();
			useState.mockReturnValueOnce([dataSort, setDataSort]);
			const wrapper = shallow(
				<DataTable
					id="test"
					metadata={metadata}
					data={testData}
					defaultSort={dataSort}
					addedCount={0}
					getRowId={getRowId}
				/>
			);

			wrapper.find('th').at(0).simulate('click');
			expect(setDataSort.mock.calls).toEqual([[expect.any(Function)]]);
			expect(setDataSort.mock.calls[0][0](dataSort)).toEqual({columnId: 'time', order: 'a'});
		});

		it('updates the sort column when a different header is clicked', () => {
			const dataSort = {columnId: 'time', order: 'a'};
			const setDataSort = jest.fn();
			useState.mockReturnValueOnce([dataSort, setDataSort]);
			const wrapper = shallow(
				<DataTable
					id="test"
					metadata={metadata}
					data={testData}
					defaultSort={dataSort}
					addedCount={0}
					getRowId={getRowId}
				/>
			);

			wrapper.find('th').at(1).simulate('click');
			expect(setDataSort.mock.calls).toEqual([[expect.any(Function)]]);
			expect(setDataSort.mock.calls[0][0](dataSort)).toEqual({columnId: 'source', order: 'a'});
		});
	});
});
