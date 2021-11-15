import {useEffect, useRef, useState} from 'react';
import {shallow} from 'enzyme';
import {buildHighlighter, scrollToItem, smoothScroll} from '@bluecat/helpers';

import DataTable from '../../src/components/DataTable';

jest.unmock('../../src/components/DataTable');
jest.unmock('stable');

global.navigator = {};

const anyFunction = expect.any(Function);

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
		beforeEach(() => (navigator.userAgent = ''));

		it('initializes focused to the selected row index when selectedId is set', () => {
			shallow(
				<DataTable id="test" metadata={metadata} data={testData} addedCount={0} selectedId="r3" getRowId={getRowId} />
			);
			expect(useState.mock.calls[1]).toEqual([anyFunction]);
			expect(useState.mock.calls[1][0]()).toBe(3);
		});

		it('initializes focused to -1 when selectedId is set and not found', () => {
			shallow(
				<DataTable id="test" metadata={metadata} data={testData} addedCount={0} selectedId="x" getRowId={getRowId} />
			);
			expect(useState.mock.calls[1]).toEqual([anyFunction]);
			expect(useState.mock.calls[1][0]()).toBe(-1);
		});

		it('initializes focused to 0 when selectedId is not set and onRowClick is set', () => {
			shallow(
				<DataTable
					id="test"
					metadata={metadata}
					data={testData}
					addedCount={0}
					getRowId={getRowId}
					onRowClick={jest.fn()}
				/>
			);
			expect(useState.mock.calls[1]).toEqual([anyFunction]);
			expect(useState.mock.calls[1][0]()).toBe(0);
		});

		it('initializes focused to -1 when selectedId is not set and onRowClick is not set', () => {
			shallow(<DataTable id="test" metadata={metadata} data={testData} addedCount={0} getRowId={getRowId} />);
			expect(useState.mock.calls[1]).toEqual([anyFunction]);
			expect(useState.mock.calls[1][0]()).toBe(-1);
		});

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
			expect(addEventListener.mock.calls).toEqual([['scroll', anyFunction, {passive: true}]]);

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

			navigator.userAgent = 'Trident/0';
			useEffect.mock.calls[0][0]();
			expect(addEventListener.mock.calls).toEqual([['scroll', anyFunction, false]]);
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
			expect(addEventListener.mock.calls).toEqual([['scroll', anyFunction, {passive: true}]]);

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
			expect(addEventListener.mock.calls).toEqual([['scroll', anyFunction, {passive: true}]]);

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
			expect(addEventListener.mock.calls).toEqual([['scroll', anyFunction, {passive: true}]]);

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
			expect(addEventListener.mock.calls).toEqual([['scroll', anyFunction, {passive: true}]]);

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
				firstChild: {tHead: {clientHeight: 20}},
			};
			const isLoadingNextData = {current: true};
			const isLoadingPrevData = {current: false};
			useState.mockReturnValueOnce([]).mockReturnValueOnce([-1]);
			initTable(2, isLoadingNextData, isLoadingPrevData, tableBody, jest.fn(), jest.fn());

			expect(useEffect).toHaveBeenCalledTimes(3);

			useEffect.mock.calls[2][0]();
			expect(tableBody.scrollTop).toBe(508);
			expect(isLoadingNextData.current).toBe(false);
			expect(isLoadingPrevData.current).toBe(false);
		});

		it('updates the table scrollTop and sets focused when the next data is loaded and focused is not -1', () => {
			const setFocused = jest.fn();
			const tableBody = {
				clientHeight: 100,
				scrollHeight: 1000,
				scrollTop: 900,
				firstChild: {tHead: {clientHeight: 20}},
			};
			const isLoadingNextData = {current: true};
			const isLoadingPrevData = {current: false};
			useState.mockReturnValueOnce([]).mockReturnValueOnce([4, setFocused]);
			initTable(2, isLoadingNextData, isLoadingPrevData, tableBody, jest.fn(), jest.fn());

			expect(useEffect).toHaveBeenCalledTimes(3);

			useEffect.mock.calls[2][0]();
			expect(tableBody.scrollTop).toBe(508);
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
				firstChild: {tHead: {clientHeight: 20}},
			};
			const isLoadingNextData = {current: true};
			const isLoadingPrevData = {current: false};
			useState.mockReturnValueOnce([]).mockReturnValueOnce([1, setFocused]);
			initTable(2, isLoadingNextData, isLoadingPrevData, tableBody, jest.fn(), jest.fn());

			expect(useEffect).toHaveBeenCalledTimes(3);

			useEffect.mock.calls[2][0]();
			expect(tableBody.scrollTop).toBe(508);
			expect(isLoadingNextData.current).toBe(false);
			expect(isLoadingPrevData.current).toBe(false);
			expect(setFocused.mock.calls).toEqual([[0]]);
		});

		it('updates the table scrollTop when the previous data is loaded', () => {
			const tableBody = {
				clientHeight: 100,
				scrollHeight: 1000,
				scrollTop: 0,
				firstChild: {tHead: {clientHeight: 20}},
			};
			const isLoadingNextData = {current: false};
			const isLoadingPrevData = {current: true};
			useState.mockReturnValueOnce([]).mockReturnValueOnce([-1]);
			initTable(2, isLoadingNextData, isLoadingPrevData, tableBody, jest.fn(), jest.fn());

			expect(useEffect).toHaveBeenCalledTimes(3);

			useEffect.mock.calls[2][0]();
			expect(tableBody.scrollTop).toBe(392);
			expect(isLoadingNextData.current).toBe(false);
			expect(isLoadingPrevData.current).toBe(false);
		});

		it('updates the table scrollTop and sets focused when the previous data is loaded and focused is not -1', () => {
			const setFocused = jest.fn();
			const tableBody = {
				clientHeight: 100,
				scrollHeight: 1000,
				scrollTop: 0,
				firstChild: {tHead: {clientHeight: 20}},
			};
			const isLoadingNextData = {current: false};
			const isLoadingPrevData = {current: true};
			useState.mockReturnValueOnce([]).mockReturnValueOnce([2, setFocused]);
			initTable(2, isLoadingNextData, isLoadingPrevData, tableBody, jest.fn(), jest.fn());

			expect(useEffect).toHaveBeenCalledTimes(3);

			useEffect.mock.calls[2][0]();
			expect(tableBody.scrollTop).toBe(392);
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
				firstChild: {tHead: {clientHeight: 20}},
			};
			const isLoadingNextData = {current: false};
			const isLoadingPrevData = {current: true};
			useState.mockReturnValueOnce([]).mockReturnValueOnce([4, setFocused]);
			initTable(2, isLoadingNextData, isLoadingPrevData, tableBody, jest.fn(), jest.fn());

			expect(useEffect).toHaveBeenCalledTimes(3);

			useEffect.mock.calls[2][0]();
			expect(tableBody.scrollTop).toBe(392);
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
				<DataTable
					id="test"
					metadata={metadata}
					data={testData}
					addedCount={0}
					getRowId={getRowId}
					onRowClick={jest.fn()}
				/>
			);
			wrapper.find('tbody').simulate('mousedown', event);

			expect(closest.mock.calls).toEqual([['tr']]);
			expect(setFocused.mock.calls).toEqual([[1]]);
		});

		it('does not set focused on mouse down other elements', () => {
			const setFocused = jest.fn();
			const closest = jest.fn();
			const event = {target: {closest}};
			useState.mockReturnValueOnce([]).mockReturnValueOnce([0, setFocused]);
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
			wrapper.find('tbody').simulate('mousedown', event);

			expect(closest.mock.calls).toEqual([['tr']]);
			expect(setFocused).not.toHaveBeenCalled();
		});

		it('calls onRowClick when user clicks on a row', () => {
			const element = {dataset: {index: '1'}};
			const closest = jest.fn().mockReturnValue(element);
			const event = {target: {closest}, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const onRowClick = jest.fn();
			useRef.mockReturnValueOnce({});
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
			wrapper.find('tbody').simulate('click', event);

			expect(closest.mock.calls).toEqual([['tr']]);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(event.nativeEvent.stopImmediatePropagation).toHaveBeenCalledTimes(1);
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
			wrapper.find('tbody').simulate('click', event);

			expect(closest.mock.calls).toEqual([['tr']]);
			expect(event.preventDefault).not.toHaveBeenCalled();
			expect(event.nativeEvent.stopImmediatePropagation).not.toHaveBeenCalled();
			expect(onRowClick).not.toHaveBeenCalled();
		});

		it('prevents event default when enter or space are pressed', () => {
			const preventDefault = jest.fn();
			const nativeEvent = {stopImmediatePropagation: jest.fn()};
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
			const tbody = wrapper.find('tbody');

			tbody.simulate('keydown', {keyCode: 13, preventDefault, nativeEvent});
			tbody.simulate('keydown', {keyCode: 32, preventDefault, nativeEvent});

			expect(preventDefault).toHaveBeenCalledTimes(2);
		});

		it('scrolls the table up when page up is pressed', () => {
			const focus = jest.fn();
			const setFocused = jest.fn();
			const event = {keyCode: 33, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const child = {offsetHeight: 25, focus};
			const tableBody = {
				clientHeight: 50,
				scrollTop: 25,
				firstChild: {tBodies: [{childNodes: [child]}]},
			};
			useState.mockReturnValueOnce([]).mockReturnValueOnce([2, setFocused]);
			useRef.mockReturnValueOnce({current: tableBody});
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
			wrapper.find('tbody').simulate('keydown', event);

			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[0]]);
			expect(focus.mock.calls).toEqual([[]]);
			expect(smoothScroll.mock.calls).toEqual([[tableBody, 25, -25, 150]]);
		});

		it('focuses the first row when page up is pressed and the table cannot be scrolled up', () => {
			const focus = jest.fn();
			const setFocused = jest.fn();
			const event = {keyCode: 33, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const tableBody = {
				clientHeight: 50,
				scrollTop: 0,
				firstChild: {tBodies: [{childNodes: [{focus}]}]},
			};
			useState.mockReturnValueOnce([]).mockReturnValueOnce([1, setFocused]);
			useRef.mockReturnValueOnce({current: tableBody});
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
			wrapper.find('tbody').simulate('keydown', event);

			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[0]]);
			expect(focus.mock.calls).toEqual([[]]);
			expect(smoothScroll).not.toHaveBeenCalled();
		});

		it('scrolls the table down when page down is pressed', () => {
			const focus = jest.fn();
			const setFocused = jest.fn();
			const event = {keyCode: 34, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const child = {offsetHeight: 25};
			const tableBody = {
				clientHeight: 50,
				scrollTop: 0,
				scrollHeight: 125,
				firstChild: {tBodies: [{childNodes: [child, null, null, null, {focus}]}]},
			};
			useState.mockReturnValueOnce([]).mockReturnValueOnce([2, setFocused]);
			useRef.mockReturnValueOnce({current: tableBody});
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
			wrapper.find('tbody').simulate('keydown', event);

			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[4]]);
			expect(focus.mock.calls).toEqual([[]]);
			expect(smoothScroll.mock.calls).toEqual([[tableBody, 0, 50, 150]]);
		});

		it('focuses the last row when page down is pressed and the table cannot be scrolled down', () => {
			const focus = jest.fn();
			const setFocused = jest.fn();
			const event = {keyCode: 34, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const tableBody = {
				clientHeight: 50,
				scrollTop: 75,
				scrollHeight: 125,
				firstChild: {tBodies: [{childNodes: [null, null, null, null, {focus}]}]},
			};
			useState.mockReturnValueOnce([]).mockReturnValueOnce([1, setFocused]);
			useRef.mockReturnValueOnce({current: tableBody});
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
			wrapper.find('tbody').simulate('keydown', event);

			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[4]]);
			expect(focus.mock.calls).toEqual([[]]);
			expect(smoothScroll).not.toHaveBeenCalled();
		});

		it('focuses the last row when end is pressed', () => {
			const focus = jest.fn();
			const setFocused = jest.fn();
			const event = {keyCode: 35, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const child = {focus};
			const tableBody = {
				firstChild: {tHead: {clientHeight: 20}, tBodies: [{childNodes: [null, null, null, null, child]}]},
			};
			useState.mockReturnValueOnce([]).mockReturnValueOnce([2, setFocused]);
			useRef.mockReturnValueOnce({current: tableBody});
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
			wrapper.find('tbody').simulate('keydown', event);

			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[4]]);
			expect(focus.mock.calls).toEqual([[]]);
			expect(scrollToItem.mock.calls).toEqual([[tableBody, child, {headerHeight: 20}]]);
		});

		it('focuses the first row when home is pressed', () => {
			const focus = jest.fn();
			const setFocused = jest.fn();
			const event = {keyCode: 36, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const child = {focus};
			const tableBody = {firstChild: {tHead: {clientHeight: 20}, tBodies: [{childNodes: [child]}]}};
			useState.mockReturnValueOnce([]).mockReturnValueOnce([2, setFocused]);
			useRef.mockReturnValueOnce({current: tableBody});
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
			wrapper.find('tbody').simulate('keydown', event);

			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[0]]);
			expect(focus.mock.calls).toEqual([[]]);
			expect(scrollToItem.mock.calls).toEqual([[tableBody, child, {headerHeight: 20}]]);
		});

		it('focuses the previous row when up is pressed', () => {
			const focus = jest.fn();
			const setFocused = jest.fn();
			const event = {keyCode: 38, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const child = {focus};
			const tableBody = {firstChild: {tHead: {clientHeight: 20}, tBodies: [{childNodes: [null, child]}]}};
			useState.mockReturnValueOnce([]).mockReturnValueOnce([2, setFocused]);
			useRef.mockReturnValueOnce({current: tableBody});
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
			wrapper.find('tbody').simulate('keydown', event);

			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[1]]);
			expect(focus.mock.calls).toEqual([[]]);
			expect(scrollToItem.mock.calls).toEqual([[tableBody, child, {headerHeight: 20}]]);
		});

		it('does not set focused when up is pressed and the first option is focused', () => {
			const setFocused = jest.fn();
			const event = {keyCode: 38, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			useState.mockReturnValueOnce([]).mockReturnValueOnce([0, setFocused]);
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
			wrapper.find('tbody').simulate('keydown', event);

			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused).not.toHaveBeenCalled();
		});

		it('focuses the next row when down is pressed', () => {
			const focus = jest.fn();
			const setFocused = jest.fn();
			const event = {keyCode: 40, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const child = {focus};
			const tableBody = {firstChild: {tHead: {clientHeight: 20}, tBodies: [{childNodes: [null, null, null, child]}]}};
			useState.mockReturnValueOnce([]).mockReturnValueOnce([2, setFocused]);
			useRef.mockReturnValueOnce({current: tableBody});
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
			wrapper.find('tbody').simulate('keydown', event);

			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[3]]);
			expect(focus.mock.calls).toEqual([[]]);
			expect(scrollToItem.mock.calls).toEqual([[tableBody, child, {headerHeight: 20}]]);
		});

		it('does not set focused when down is pressed and the last option is focused', () => {
			const setFocused = jest.fn();
			const event = {keyCode: 40, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			useState.mockReturnValueOnce([]).mockReturnValueOnce([4, setFocused]);
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
			wrapper.find('tbody').simulate('keydown', event);

			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused).not.toHaveBeenCalled();
		});

		it('ignores the event when a key is pressed and any modifier is set', () => {
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
			const tbody = wrapper.find('tbody');

			tbody.simulate('keydown', {keyCode: 13, shiftKey: true, preventDefault});
			tbody.simulate('keydown', {keyCode: 13, ctrlKey: true, preventDefault});
			tbody.simulate('keydown', {keyCode: 13, altKey: true, preventDefault});
			tbody.simulate('keydown', {keyCode: 13, metaKey: true, preventDefault});

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
			wrapper.find('tbody').simulate('keyup', event);

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
			wrapper.find('tbody').simulate('keyup', event);

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
			const tbody = wrapper.find('tbody');

			tbody.simulate('keyup', {keyCode: 13, shiftKey: true, preventDefault});
			tbody.simulate('keyup', {keyCode: 13, ctrlKey: true, preventDefault});
			tbody.simulate('keyup', {keyCode: 13, altKey: true, preventDefault});
			tbody.simulate('keyup', {keyCode: 13, metaKey: true, preventDefault});

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
			const closest = jest.fn().mockReturnValue({dataset: {column: 'time'}});
			const target = {closest};
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

			wrapper.find('thead').simulate('click', {target});
			expect(setDataSort.mock.calls).toEqual([[anyFunction]]);
			expect(setDataSort.mock.calls[0][0](dataSort)).toEqual({columnId: 'time', order: 'd'});
		});

		it('updates the sort column when the order is desc the sorted header is clicked', () => {
			const closest = jest.fn().mockReturnValue({dataset: {column: 'time'}});
			const target = {closest};
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

			wrapper.find('thead').simulate('click', {target});
			expect(setDataSort.mock.calls).toEqual([[anyFunction]]);
			expect(setDataSort.mock.calls[0][0](dataSort)).toEqual({columnId: 'time', order: 'a'});
		});

		it('updates the sort column when a different header is clicked', () => {
			const closest = jest.fn().mockReturnValue({dataset: {column: 'source'}});
			const target = {closest};
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

			wrapper.find('thead').simulate('click', {target});
			expect(setDataSort.mock.calls).toEqual([[anyFunction]]);
			expect(setDataSort.mock.calls[0][0](dataSort)).toEqual({columnId: 'source', order: 'a'});
		});

		it('does not update the sort column when a not sortable header is clicked', () => {
			const closest = jest.fn().mockReturnValue();
			const target = {closest};
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

			wrapper.find('thead').simulate('click', {target});
			expect(setDataSort.mock.calls).toEqual([]);
		});
	});
});
