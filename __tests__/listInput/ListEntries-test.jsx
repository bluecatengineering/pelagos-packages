import React, {useEffect} from 'react';
import {shallow} from 'enzyme';
import debounce from 'lodash-es/debounce';
import {scrollIntoView} from '@bluecat/helpers';

import ListEntries from '../../src/listInput/ListEntries';

jest.unmock('../../src/listInput/ListEntries');

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useEffect: jest.fn(),
}));
jest.mock('lodash-es/debounce', () => jest.fn(f => ((f.cancel = jest.fn()), f)));

describe('ListEntries', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<ListEntries
					componentId="test"
					list={[{id: '0', name: 'test'}]}
					getItemKey={i => i.id}
					renderItem={i => <div>{i.name}</div>}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when the item has className', () => {
			const wrapper = shallow(
				<ListEntries
					componentId="test"
					list={[{id: '0', name: 'test'}]}
					getItemKey={i => i.id}
					renderItem={i => <div className="TestClass">{i.name}</div>}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when highlightKey is set', () => {
			const wrapper = shallow(
				<ListEntries
					componentId="test"
					highlightKey="0"
					list={[{id: '0', name: 'test'}]}
					getItemKey={i => i.id}
					renderItem={i => <div>{i.name}</div>}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when column is set', () => {
			const wrapper = shallow(
				<ListEntries
					componentId="test"
					list={[{id: '0', name: 'test'}]}
					column
					getItemKey={i => i.id}
					renderItem={i => <div>{i.name}</div>}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onRemoveClick when the remove button is clicked', () => {
			const onRemoveClick = jest.fn();
			const item = {id: '0', name: 'test'};
			const wrapper = shallow(
				<ListEntries
					componentId="test"
					list={[item]}
					getItemKey={i => i.id}
					renderItem={i => <div>{i.name}</div>}
					onRemoveClick={onRemoveClick}
				/>
			);
			wrapper.find('[data-bcn-id="remove-item"]').simulate('click');
			expect(onRemoveClick.mock.calls).toEqual([[item, 0]]);
		});

		it('calls scrollIntoView when highlightKey is set and the element is found', () => {
			const onHighlightClear = jest.fn();
			const querySelector = jest.spyOn(document, 'querySelector');
			const element = {};
			querySelector.mockReturnValue(element);
			shallow(
				<ListEntries
					componentId="test"
					highlightKey="0"
					list={[{id: '0', name: 'test'}]}
					getItemKey={i => i.id}
					renderItem={i => <div>{i.name}</div>}
					onHighlightClear={onHighlightClear}
				/>
			);
			expect(useEffect.mock.calls).toEqual([[expect.any(Function), ['0', onHighlightClear]]]);
			const debounced = debounce.mock.results[0].value;
			expect(debounced).toBe(onHighlightClear);

			expect(useEffect.mock.calls[0][0]()).toBe(debounced.cancel);
			expect(querySelector.mock.calls).toEqual([['.ListEntries__item--highlight']]);
			expect(scrollIntoView.mock.calls).toEqual([[element, {smooth: true, duration: 150}]]);
			expect(onHighlightClear).toHaveBeenCalledTimes(1);
		});

		it('does not call scrollIntoView when highlightKey is set and the element is not found', () => {
			const onHighlightClear = jest.fn();
			const querySelector = jest.spyOn(document, 'querySelector');
			querySelector.mockReturnValue(null);
			shallow(
				<ListEntries
					componentId="test"
					highlightKey="1"
					list={[{id: '0', name: 'test'}]}
					getItemKey={i => i.id}
					renderItem={i => <div>{i.name}</div>}
					onHighlightClear={onHighlightClear}
				/>
			);
			useEffect.mock.calls[0][0]();
			expect(querySelector.mock.calls).toEqual([['.ListEntries__item--highlight']]);
			expect(scrollIntoView).not.toHaveBeenCalled();
			expect(onHighlightClear).toHaveBeenCalledTimes(1);
		});

		it('does not call querySelector when highlightKey is not set', () => {
			const onHighlightClear = jest.fn();
			const querySelector = jest.spyOn(document, 'querySelector');
			shallow(
				<ListEntries
					componentId="test"
					list={[{id: '0', name: 'test'}]}
					getItemKey={i => i.id}
					renderItem={i => <div>{i.name}</div>}
					onHighlightClear={onHighlightClear}
				/>
			);
			useEffect.mock.calls[0][0]();
			expect(querySelector).not.toHaveBeenCalled();
			expect(onHighlightClear).not.toHaveBeenCalled();
		});
	});
});
