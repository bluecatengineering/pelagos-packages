import React from 'react';
import {shallow} from 'enzyme';
import {buildHighlighter} from '@bluecat/helpers';

import DataTable from '../../src/components/DataTable';

jest.unmock('../../src/components/DataTable');
jest.unmock('stable');

const getRowId = row => row.id;

describe('DataTable', () => {
	const metadata = [
		{
			id: 'time',
			value: item => item.time,
			sortComparator: (a, b) => a.time - b.time,
			sortable: true,
			header: 'TIME',
			width: '10px',
		},
		{
			id: 'source',
			value: item => item.source,
			sortComparator: (a, b) => a.source.toLowerCase().localeCompare(b.source.toLowerCase()),
			sortable: true,
			header: 'SOURCE',
			width: '10px',
		},
		{
			id: 'site',
			value: item => item.site,
			sortable: false,
			header: 'SITE',
			width: '10px',
			hoverValue: true,
			className: (item, index) => 'TestClass' + index,
		},
	];

	const componentId = 'datatable-1';

	const createDataItem = (time, source, site) => ({time, source, site});

	const testData = [
		createDataItem(2, 'a1', 'site4'),
		createDataItem(1, 'a10', 'site3'),
		createDataItem(1, 'b10', 'site5'),
		createDataItem(4, 'a1', 'site2'),
		createDataItem(3, 'A1', 'site1'),
	];

	describe('rendering', () => {
		it('renders the expected elements if there is data', () => {
			const wrapper = shallow(
				<DataTable
					componentId={componentId}
					className="TestClass"
					metadata={metadata}
					data={testData}
					defaultSort={{columnId: 'time', order: 'asc'}}
					addedCount={4}
					getRowId={getRowId}
				/>,
				{disableLifecycleMethods: true}
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders the expected elements if the data is empty', () => {
			const wrapper = shallow(
				<DataTable
					componentId={componentId}
					metadata={metadata}
					data={[]}
					addedCount={0}
					emptyTableText="Empty text"
					getRowId={getRowId}
				/>,
				{disableLifecycleMethods: true}
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders loading spinner when loading initial data', () => {
			const wrapper = shallow(
				<DataTable
					componentId={componentId}
					metadata={metadata}
					data={[]}
					addedCount={0}
					isFetchingNextDataPage={true}
					getRowId={getRowId}
				/>,
				{disableLifecycleMethods: true}
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders previous spinner when isFetchingPrevDataPage is true', () => {
			const wrapper = shallow(
				<DataTable
					componentId={componentId}
					metadata={metadata}
					data={testData}
					addedCount={0}
					isFetchingPrevDataPage={true}
					getRowId={getRowId}
				/>,
				{disableLifecycleMethods: true}
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders the expected elements in descending order', () => {
			const wrapper = shallow(
				<DataTable
					componentId={componentId}
					metadata={metadata}
					data={testData}
					defaultSort={{columnId: 'time', order: 'desc'}}
					addedCount={4}
					getRowId={getRowId}
				/>,
				{disableLifecycleMethods: true}
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders the expected elements in alternate order', () => {
			const wrapper = shallow(
				<DataTable
					componentId={componentId}
					metadata={metadata}
					data={testData}
					defaultSort={{columnId: 'time', order: 'desc'}}
					addedCount={4}
					getRowId={getRowId}
				/>,
				{disableLifecycleMethods: true}
			);

			const header = wrapper.find('th').at(1);
			header.simulate('click');
			expect(wrapper.getElement()).toMatchSnapshot();

			// reverse order
			header.simulate('click');
			expect(wrapper.getElement()).toMatchSnapshot();

			// back to initial order
			header.simulate('click');
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
					componentId={componentId}
					metadata={metadata}
					data={[data]}
					addedCount={0}
					isFetchingNextDataPage={true}
					highlightId={highlightId}
					getRowId={getRowId}
					onHighlightClear={onHighlightClear}
				/>,
				{disableLifecycleMethods: true}
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
					componentId={componentId}
					metadata={metadata}
					data={[data]}
					addedCount={0}
					isFetchingNextDataPage={true}
					getRowId={getRowId}
					selectedId={selectedId}
				/>,
				{disableLifecycleMethods: true}
			);

			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders clickable row', () => {
			const selectedId = 'site';
			const onRowClick = jest.fn();
			const wrapper = shallow(
				<DataTable
					componentId={componentId}
					metadata={metadata}
					data={testData}
					addedCount={0}
					isFetchingNextDataPage={true}
					getRowId={getRowId}
					selectedId={selectedId}
					onRowClick={onRowClick}
				/>,
				{disableLifecycleMethods: true}
			);

			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls requestNextDataPage when scroll bar at the bottom', () => {
			const requestNextDataPage = jest.fn().mockReturnValue(true);
			const requestPrevDataPage = jest.fn().mockReturnValue(true);
			const wrapper = shallow(
				<DataTable
					metadata={metadata}
					data={testData}
					addedCount={0}
					requestNextDataPage={requestNextDataPage}
					requestPrevDataPage={requestPrevDataPage}
					getRowId={getRowId}
				/>,
				{disableLifecycleMethods: true}
			);
			const tableBody = {
				clientHeight: 100,
				scrollHeight: 1000,
				scrollTop: 900,
			};
			const instance = wrapper.instance();
			instance.tableBody.current = tableBody;

			instance.handleScroll();

			expect(requestNextDataPage).toHaveBeenCalledTimes(1);

			wrapper.setProps({addedCount: 2});
			instance.componentDidUpdate(); // due to disableLifecycleMethods in shallow
			expect(tableBody.scrollTop).toBe(500);
		});

		it('calls requestPrevDataPage when scroll bar at the top', () => {
			const requestNextDataPage = jest.fn().mockReturnValue(true);
			const requestPrevDataPage = jest.fn().mockReturnValue(true);
			const wrapper = shallow(
				<DataTable
					metadata={metadata}
					data={testData}
					addedCount={0}
					requestNextDataPage={requestNextDataPage}
					requestPrevDataPage={requestPrevDataPage}
					getRowId={getRowId}
				/>,
				{disableLifecycleMethods: true}
			);
			const tableBody = {
				clientHeight: 100,
				scrollHeight: 1000,
				scrollTop: 0,
			};
			const instance = wrapper.instance();
			instance.tableBody.current = tableBody;

			instance.handleScroll();

			expect(requestPrevDataPage).toHaveBeenCalledTimes(1);

			wrapper.setProps({addedCount: 2});
			instance.componentDidUpdate(); // due to disableLifecycleMethods in shallow
			expect(tableBody.scrollTop).toBe(400);
		});

		it('does not call neither requestNextDataPage nor requestPrevDataPage when scroll bar is in the middle', () => {
			const requestNextDataPage = jest.fn().mockReturnValue(true);
			const requestPrevDataPage = jest.fn().mockReturnValue(true);
			const wrapper = shallow(
				<DataTable
					metadata={metadata}
					data={testData}
					addedCount={0}
					requestNextDataPage={requestNextDataPage}
					requestPrevDataPage={requestPrevDataPage}
					getRowId={getRowId}
				/>,
				{disableLifecycleMethods: true}
			);
			const tableBody = {
				clientHeight: 100,
				scrollHeight: 1000,
				scrollTop: 500,
			};
			const instance = wrapper.instance();
			instance.tableBody.current = tableBody;

			instance.handleScroll();

			expect(requestNextDataPage).not.toHaveBeenCalled();
			expect(requestPrevDataPage).not.toHaveBeenCalled();

			wrapper.setProps({addedCount: 2});
			instance.componentDidUpdate(); // due to disableLifecycleMethods in shallow
			expect(tableBody.scrollTop).toBe(500);
		});

		it('does not call neither requestNextDataPage nor requestPrevDataPage when data is empty', () => {
			const requestNextDataPage = jest.fn().mockReturnValue(true);
			const requestPrevDataPage = jest.fn().mockReturnValue(true);
			const wrapper = shallow(
				<DataTable
					metadata={metadata}
					data={testData}
					addedCount={0}
					requestNextDataPage={requestNextDataPage}
					requestPrevDataPage={requestPrevDataPage}
					getRowId={getRowId}
				/>,
				{disableLifecycleMethods: true}
			);
			wrapper.setProps({data: [], addedCount: 0});
			const tableBody = {
				clientHeight: 100,
				scrollHeight: 1000,
				scrollTop: 0,
			};
			const instance = wrapper.instance();
			instance.tableBody.current = tableBody;

			instance.handleScroll();

			expect(requestNextDataPage).not.toHaveBeenCalled();
			expect(requestPrevDataPage).not.toHaveBeenCalled();

			instance.componentDidUpdate(); // due to disableLifecycleMethods in shallow
			expect(tableBody.scrollTop).toBe(0);
		});

		it('calls onRowClick when user clicks on a row', () => {
			const event = {nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const onRowClick = jest.fn();
			const wrapper = shallow(
				<DataTable metadata={metadata} data={testData} addedCount={0} getRowId={getRowId} onRowClick={onRowClick} />,
				{disableLifecycleMethods: true}
			);
			const rows = wrapper.find('[data-bcn-id="table-body"] tbody tr');
			rows.first().simulate('click', event);
			expect(onRowClick.mock.calls).toEqual([[testData[0], event]]);
			expect(event.nativeEvent.stopImmediatePropagation).toHaveBeenCalledTimes(1);
		});

		it('adds a scroll listener to the table body on mount if both requestNextDataPage and requestPrevDataPage are set', () => {
			const addEventListener = jest.fn();
			const removeEventListener = jest.fn();
			const wrapper = shallow(
				<DataTable
					metadata={metadata}
					data={[]}
					addedCount={0}
					getRowId={getRowId}
					requestNextDataPage={jest.fn()}
					requestPrevDataPage={jest.fn()}
				/>,
				{disableLifecycleMethods: true}
			);

			const instance = wrapper.instance();
			instance.tableBody.current = {
				addEventListener,
				removeEventListener,
			};
			instance.componentDidMount();
			expect(addEventListener.mock.calls).toEqual([['scroll', expect.any(Function), {passive: true}]]);

			wrapper.unmount();
			expect(removeEventListener.mock.calls).toEqual([['scroll', expect.any(Function)]]);
		});

		it('scrolls to the highlighted row on mount', () => {
			const highlighter = jest.fn();
			const onHighlightClear = () => {};
			const highlightId = 'id';
			buildHighlighter.mockReturnValue(highlighter);

			const wrapper = shallow(
				<DataTable
					metadata={metadata}
					data={[]}
					addedCount={0}
					highlightId={highlightId}
					getRowId={getRowId}
					onHighlightClear={onHighlightClear}
				/>,
				{disableLifecycleMethods: true}
			);

			const instance = wrapper.instance();
			instance.componentDidMount();
			expect(highlighter.mock.calls).toEqual([[highlightId, onHighlightClear]]);
		});

		it('does not scroll on mount if highlightId is not set', () => {
			const highlighter = jest.fn();
			buildHighlighter.mockReturnValue(highlighter);

			const wrapper = shallow(<DataTable metadata={metadata} data={[]} addedCount={0} getRowId={getRowId} />, {
				disableLifecycleMethods: true,
			});

			const instance = wrapper.instance();
			instance.componentDidMount();
			expect(highlighter).not.toHaveBeenCalled();
		});
	});
});
