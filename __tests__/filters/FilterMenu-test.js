import React, {useEffect, useState} from 'react';
import {shallow} from 'enzyme';

import FilterMenu from '../../src/filters/FilterMenu';
import useMenuHandler from '../../src/hooks/useMenuHandler';

jest.unmock('../../src/filters/FilterMenu');
jest.unmock('../../src/strings');

const FilterEditor = () => <></>;

describe('FilterMenu', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const getOptionText = jest.fn();
			const options = ['a', 'b'];
			useMenuHandler.mockReturnValue({current: -1});
			const wrapper = shallow(<FilterMenu getOptionText={getOptionText} options={options} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when menuVisible is true', () => {
			const getOptionText = jest.fn();
			const options = ['a', 'b'];
			useMenuHandler.mockReturnValue({current: 0});
			useState.mockReturnValueOnce([true]).mockReturnValueOnce([null]);
			const wrapper = shallow(<FilterMenu getOptionText={getOptionText} options={options} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when filter is not null', () => {
			const getOptionText = jest.fn();
			const options = ['a', 'b'];
			useState.mockReturnValueOnce([false]).mockReturnValueOnce(['value']);
			useMenuHandler.mockReturnValue({current: -1});
			const wrapper = shallow(
				<FilterMenu getOptionText={getOptionText} options={options} filterEditor={FilterEditor} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when filters is set', () => {
			const getOptionText = jest.fn();
			const options = ['a', 'b'];
			useState.mockReturnValueOnce([false]).mockReturnValueOnce([null]);
			useMenuHandler.mockReturnValue({current: -1});
			const filters = {view: 'view1'};
			const wrapper = shallow(<FilterMenu filters={filters} getOptionText={getOptionText} options={options} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('handles the rendering when menuVisible is false', () => {
			const getOptionText = jest.fn();
			const options = ['a', 'b'];

			// If this does not throw, useEffect handles menuVisible === false
			useMenuHandler.mockReturnValue({current: -1});
			shallow(<FilterMenu getOptionText={getOptionText} options={options} />);
			expect(() => useEffect.mock.calls[0][0]()).not.toThrow();
		});

		it('places the menu under the button', () => {
			useMenuHandler.mockReturnValue({current: -1});
			const getOptionText = jest.fn();
			const options = ['a', 'b'];
			const menu = {style: {}};
			useState.mockReturnValueOnce([true]).mockReturnValueOnce([null]);
			const button = {getBoundingClientRect: jest.fn().mockReturnValue({top: 100, left: 200})};
			jest
				.spyOn(document, 'getElementById')
				.mockReturnValueOnce(button)
				.mockReturnValueOnce(menu);
			shallow(<FilterMenu getOptionText={getOptionText} options={options} />);
			useEffect.mock.calls[0][0]();
			expect(useEffect).toHaveBeenCalledTimes(1);
			expect(document.getElementById.mock.calls).toEqual([['filterButton'], ['filterMenu']]);
			expect(menu.style.display).toBe('');
			expect(menu.style.top).toBe('132px');
			expect(menu.style.left).toBe('200px');
		});

		it('handles the a menu option click correctly', () => {
			const getOptionText = jest.fn();
			const options = ['a', 'b'];
			useMenuHandler.mockReturnValue({current: -1});
			const setMenuVisible = jest.fn();
			const setFilter = jest.fn();
			useState.mockReturnValueOnce([false, setMenuVisible]).mockReturnValueOnce([null, setFilter]);
			shallow(<FilterMenu getOptionText={getOptionText} options={options} />);
			expect(useMenuHandler.mock.calls).toEqual([[false, setMenuVisible, expect.any(Array)]]);
			const handler = useMenuHandler.mock.calls[0][2][0].handler;
			handler();
			expect(setFilter.mock.calls).toEqual([['a']]);
		});

		it('calls setFilter when the editor is closed', () => {
			const getOptionText = jest.fn();
			const options = ['view', 'zoneName'];
			const filters = {view: ['view1']};
			const setFilter = jest.fn();
			useState.mockReturnValue(['queryType', setFilter]);
			const wrapper = shallow(
				<FilterMenu filters={filters} getOptionText={getOptionText} options={options} filterEditor={FilterEditor} />
			);
			wrapper.find('FilterEditor').simulate('close');
			expect(setFilter.mock.calls).toEqual([[null]]);
		});

		it('calls onApply when the editor is saved', () => {
			const getOptionText = jest.fn();
			const options = ['view', 'zoneName'];
			const filters = {view: ['view1']};
			const values = ['x'];
			const setFilter = jest.fn();
			const onApply = jest.fn();
			useState.mockReturnValue(['view', setFilter]);
			const wrapper = shallow(
				<FilterMenu
					filters={filters}
					onApply={onApply}
					getOptionText={getOptionText}
					options={options}
					filterEditor={FilterEditor}
				/>
			);
			wrapper.find('FilterEditor').simulate('save', values);
			expect(setFilter.mock.calls).toEqual([[null]]);
			expect(onApply.mock.calls).toEqual([['view', values]]);
		});
	});
});
