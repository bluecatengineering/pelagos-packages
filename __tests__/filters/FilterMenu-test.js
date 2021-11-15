import {useEffect, useRef, useState} from 'react';
import {shallow} from 'enzyme';

import FilterMenu from '../../src/filters/FilterMenu';
import useMenuHandler from '../../src/hooks/useMenuHandler';

jest.unmock('../../src/filters/FilterMenu');

const FilterEditor = () => <></>;

global.document = {};

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
			const menu = {style: {}, dataset: {}};
			const button = {
				dataset: {layer: '2'},
				getBoundingClientRect: jest.fn().mockReturnValue({bottom: 100, left: 200}),
				closest: jest.fn(),
			};
			useRef.mockReturnValueOnce({current: button}).mockReturnValueOnce({current: menu});
			useState.mockReturnValueOnce([true]).mockReturnValueOnce([null]);
			shallow(<FilterMenu getOptionText={getOptionText} options={options} />);
			useEffect.mock.calls[0][0]();
			expect(useEffect).toHaveBeenCalledTimes(1);
			expect(menu.style).toEqual({top: '100px', left: '200px'});
			expect(menu.dataset).toEqual({layer: '2'});
		});

		it('handles the a menu option click correctly', () => {
			const getOptionText = jest.fn();
			const options = ['a', 'b'];
			useMenuHandler.mockReturnValue({current: -1});
			const setMenuVisible = jest.fn();
			const setFilter = jest.fn();
			useState.mockReturnValueOnce([false, setMenuVisible]).mockReturnValueOnce([null, setFilter]);
			shallow(<FilterMenu getOptionText={getOptionText} options={options} />);
			expect(useMenuHandler.mock.calls).toEqual([
				[false, setMenuVisible, ['a', 'b'], {getItemText: getOptionText, onItemSelected: setFilter}],
			]);
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
			wrapper.find('FilterEditor').prop('onClose')();
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
			wrapper.find('FilterEditor').prop('onSave')(values);
			expect(setFilter.mock.calls).toEqual([[null]]);
			expect(onApply.mock.calls).toEqual([['view', values]]);
		});
	});
});
