import {useState} from 'react';
import {shallow} from 'enzyme';
import {getPageTitle} from '@bluecat/redux-navigation';

import EditorTable from '../../src/components/EditorTable';

jest.unmock('../../src/components/EditorTable');

const Details = () => null;
const DetailButtons = () => null;

global.document = {};

getPageTitle.mockReturnValue('getPageTitle');

describe('EditorTable', () => {
	describe('rendering', () => {
		it('renders expected elements when user is administrator and not loading', () => {
			const page = jest.fn();
			const wrapper = shallow(
				<EditorTable
					id="editor"
					className="TestClass"
					appTitle="App Title"
					breadcrumb={[jest.fn()]}
					page={page}
					defaultSort={{headerId: 'test', sort: 'a'}}
					titleName="Item"
					singularName="item"
					pluralName="items"
					filterHint="Filter by foo"
					metadata={[{}]}
					itemsById={{id: {}}}
					loading={false}
					canEdit={true}
					getRowId={() => 'test'}
					buttons={[<div key="0">Button</div>]}
					controls={<div>Controls</div>}
					onAddClick={jest.fn()}
					onClose={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(getPageTitle.mock.calls).toEqual([[page]]);
			expect(document.title).toBe('getPageTitle - App Title');
		});

		it('renders expected elements when filterText is set', () => {
			const crumb = jest.fn();
			const filter = jest.fn().mockReturnValue(jest.fn().mockReturnValueOnce(false).mockReturnValueOnce(true));
			useState.mockReturnValueOnce(['foo']).mockReturnValueOnce([null]);
			const i1 = {id: 'i1'};
			const i0 = {id: 'i0'};
			const list = [i0, i1];
			const wrapper = shallow(
				<EditorTable
					id="editor"
					className="TestClass"
					breadcrumb={[crumb]}
					page={jest.fn()}
					defaultSort={{headerId: 'test', sort: 'a'}}
					titleName="Item"
					singularName="item"
					pluralName="items"
					filterHint="Filter by foo"
					metadata={[{}]}
					itemsById={{i0, i1}}
					loading={false}
					canEdit={true}
					getRowId={() => 'test'}
					filter={filter}
					buttons={[<div key="0">Button</div>]}
					onAddClick={jest.fn()}
					onClose={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(filter.mock.calls).toEqual([['foo']]);
			expect(filter.mock.results[0].value.mock.calls).toEqual([
				[i0, 0, list],
				[i1, 1, list],
			]);
		});

		it('renders expected elements when externalFilter is set', () => {
			const crumb = jest.fn();
			const externalFilter = jest.fn().mockReturnValueOnce(false).mockReturnValueOnce(true);
			const i1 = {id: 'i1'};
			const i0 = {id: 'i0'};
			const list = [i0, i1];
			const wrapper = shallow(
				<EditorTable
					id="editor"
					className="TestClass"
					breadcrumb={[crumb]}
					page={jest.fn()}
					defaultSort={{headerId: 'test', sort: 'a'}}
					titleName="Item"
					singularName="item"
					pluralName="items"
					filterHint="Filter by foo"
					metadata={[{}]}
					itemsById={{i0, i1}}
					loading={false}
					canEdit={true}
					getRowId={() => 'test'}
					externalFilter={externalFilter}
					buttons={[<div key="0">Button</div>]}
					onAddClick={jest.fn()}
					onClose={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(externalFilter.mock.calls).toEqual([
				[i0, 0, list],
				[i1, 1, list],
			]);
		});

		it('renders expected elements when both filters are set', () => {
			const crumb = jest.fn();
			const filter = jest.fn().mockReturnValue(jest.fn().mockReturnValueOnce(false).mockReturnValueOnce(true));
			const externalFilter = jest.fn().mockReturnValueOnce(false).mockReturnValueOnce(true).mockReturnValueOnce(true);
			useState.mockReturnValueOnce(['foo']).mockReturnValueOnce([null]);
			const i0 = {id: 'i0'};
			const i1 = {id: 'i1'};
			const i2 = {id: 'i2'};
			const list = [i0, i1, i2];
			const wrapper = shallow(
				<EditorTable
					id="editor"
					className="TestClass"
					breadcrumb={[crumb]}
					page={jest.fn()}
					defaultSort={{headerId: 'test', sort: 'a'}}
					titleName="Item"
					singularName="item"
					pluralName="items"
					filterHint="Filter by foo"
					metadata={[{}]}
					itemsById={{i0, i1, i2}}
					loading={false}
					canEdit={true}
					getRowId={() => 'test'}
					filter={filter}
					externalFilter={externalFilter}
					buttons={[<div key="0">Button</div>]}
					onAddClick={jest.fn()}
					onClose={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(filter.mock.calls).toEqual([['foo']]);
			expect(filter.mock.results[0].value.mock.calls).toEqual([
				[i1, 1, list],
				[i2, 2, list],
			]);
			expect(externalFilter.mock.calls).toEqual([
				[i0, 0, list],
				[i1, 1, list],
				[i2, 2, list],
			]);
		});

		it('renders expected elements when selectedId is set', () => {
			const wrapper = shallow(
				<EditorTable
					id="editor"
					className="TestClass"
					breadcrumb={[jest.fn()]}
					page={jest.fn()}
					defaultSort={{headerId: 'test', sort: 'a'}}
					titleName="Item"
					singularName="item"
					pluralName="items"
					filterHint="Filter by foo"
					metadata={[{}]}
					itemsById={{id: {name: 'Test'}}}
					loading={false}
					canEdit={true}
					selectedId="id"
					getRowId={() => 'test'}
					buttons={[<div key="0">Button</div>]}
					details={Details}
					onAddClick={jest.fn()}
					onClose={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when selectedId and optional detail functions are set', () => {
			const wrapper = shallow(
				<EditorTable
					id="editor"
					className="TestClass"
					breadcrumb={[jest.fn()]}
					page={jest.fn()}
					defaultSort={{headerId: 'test', sort: 'a'}}
					titleName="Item"
					singularName="item"
					pluralName="items"
					filterHint="Filter by foo"
					metadata={[{}]}
					itemsById={{id: {name: 'Test'}}}
					loading={false}
					canEdit={true}
					selectedId="id"
					getRowId={() => 'test'}
					buttons={[<div key="0">Button</div>]}
					details={Details}
					showDetailsButtons={() => true}
					disableDelete={() => true}
					onAddClick={jest.fn()}
					onClose={jest.fn()}
					onDelete={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when detailButtons is set', () => {
			const wrapper = shallow(
				<EditorTable
					id="editor"
					className="TestClass"
					breadcrumb={[jest.fn()]}
					page={jest.fn()}
					defaultSort={{headerId: 'test', sort: 'a'}}
					titleName="Item"
					singularName="item"
					pluralName="items"
					filterHint="Filter by foo"
					metadata={[{}]}
					itemsById={{id: {name: 'Test'}}}
					loading={false}
					canEdit={true}
					selectedId="id"
					getRowId={() => 'test'}
					buttons={[<div key="0">Button</div>]}
					details={Details}
					detailButtons={DetailButtons}
					onAddClick={jest.fn()}
					onClose={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('disables add button and indicates data is being fetched if loading is true', () => {
			const wrapper = shallow(
				<EditorTable
					id="editor"
					className="TestClass"
					breadcrumb={[jest.fn()]}
					page={jest.fn()}
					defaultSort={{headerId: 'test', sort: 'a'}}
					titleName="Item"
					singularName="item"
					pluralName="items"
					filterHint="Filter by foo"
					metadata={[{}]}
					itemsById={{id: {}}}
					loading={true}
					canEdit={true}
					getRowId={() => 'test'}
					onAddClick={jest.fn()}
					onClose={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('disables add button if user is not administrator', () => {
			const wrapper = shallow(
				<EditorTable
					id="editor"
					className="TestClass"
					breadcrumb={[jest.fn()]}
					page={jest.fn()}
					defaultSort={{headerId: 'test', sort: 'a'}}
					titleName="Item"
					singularName="item"
					pluralName="items"
					filterHint="Filter by foo"
					metadata={[{}]}
					itemsById={{id: {}}}
					loading={false}
					canEdit={false}
					getRowId={() => 'test'}
					onAddClick={jest.fn()}
					onClose={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders spinner when busy is true', () => {
			const wrapper = shallow(
				<EditorTable
					id="editor"
					className="TestClass"
					breadcrumb={[jest.fn()]}
					page={jest.fn()}
					defaultSort={{headerId: 'test', sort: 'a'}}
					titleName="Item"
					singularName="item"
					pluralName="items"
					filterHint="Filter by foo"
					metadata={[{}]}
					itemsById={{id: {}}}
					loading={false}
					busy={true}
					canEdit={true}
					getRowId={() => 'test'}
					onAddClick={jest.fn()}
					onClose={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders dialog when specified', () => {
			const wrapper = shallow(
				<EditorTable
					id="editor"
					className="TestClass"
					breadcrumb={[jest.fn()]}
					page={jest.fn()}
					defaultSort={{headerId: 'test', sort: 'a'}}
					titleName="Item"
					singularName="item"
					pluralName="items"
					filterHint="Filter by foo"
					metadata={[{}]}
					itemsById={{id: {}}}
					loading={false}
					canEdit={true}
					getRowId={() => 'test'}
					dialog={<div />}
					onAddClick={jest.fn()}
					onClose={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders delete dialog when itemToDelete is set', () => {
			useState.mockReturnValueOnce(['']).mockReturnValueOnce([{name: 'Test'}]);
			const wrapper = shallow(
				<EditorTable
					id="editor"
					className="TestClass"
					breadcrumb={[jest.fn()]}
					page={jest.fn()}
					defaultSort={{headerId: 'test', sort: 'a'}}
					titleName="Item"
					singularName="item"
					pluralName="items"
					filterHint="Filter by foo"
					metadata={[{}]}
					itemsById={{id: {}}}
					loading={false}
					canEdit={true}
					getRowId={() => 'test'}
					onAddClick={jest.fn()}
					onClose={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onAddClick when the add button is clicked', () => {
			const onAddClick = jest.fn();
			const wrapper = shallow(
				<EditorTable
					id="editor"
					breadcrumb={[]}
					page={jest.fn()}
					itemsById={{}}
					canEdit={true}
					getRowId={() => null}
					onAddClick={onAddClick}
				/>
			);
			wrapper.find('#addBtn').simulate('click');
			expect(onAddClick).toHaveBeenCalled();
		});

		it('calls onHighlightClear when the table calls onHighlightClear', () => {
			const onHighlightClear = jest.fn();
			const wrapper = shallow(
				<EditorTable
					id="editor"
					breadcrumb={[]}
					page={jest.fn()}
					itemsById={{}}
					getRowId={() => null}
					onHighlightClear={onHighlightClear}
				/>
			);
			wrapper.find('DataTable').prop('onHighlightClear')();
			expect(onHighlightClear).toHaveBeenCalled();
		});

		it('calls onRowClick when the table calls onRowClick', () => {
			const onRowClick = jest.fn();
			const wrapper = shallow(
				<EditorTable
					id="editor"
					breadcrumb={[]}
					page={jest.fn()}
					itemsById={{}}
					getRowId={({id}) => id}
					onRowClick={onRowClick}
				/>
			);
			wrapper.find('DataTable').prop('onRowClick')({id: 'test'});
			expect(onRowClick.mock.calls).toEqual([[{query: {id: 'test'}}]]);
		});

		it('calls setItemToDelete when the confirm dialog is closed', () => {
			const setItemToDelete = jest.fn();
			useState.mockReturnValueOnce(['']).mockReturnValueOnce([{}, setItemToDelete]);
			const wrapper = shallow(
				<EditorTable id="editor" breadcrumb={[]} page={jest.fn()} itemsById={{}} getRowId={jest.fn()} />
			);
			wrapper.find('ConfirmDialog').prop('onClose')();
			expect(setItemToDelete.mock.calls).toEqual([[null]]);
		});

		it('calls onDelete and setItemToDelete when the confirm dialog is confirmed', () => {
			const onDelete = jest.fn().mockResolvedValue({});
			const setItemToDelete = jest.fn();
			const itemToDelete = {id: 'test'};
			useState.mockReturnValueOnce(['']).mockReturnValueOnce([itemToDelete, setItemToDelete]);
			const wrapper = shallow(
				<EditorTable
					id="editor"
					breadcrumb={[]}
					page={jest.fn()}
					itemsById={{}}
					getRowId={jest.fn()}
					onDelete={onDelete}
				/>
			);
			return wrapper
				.find('ConfirmDialog')
				.prop('onConfirm')()
				.then(() => {
					expect(onDelete.mock.calls).toEqual([[itemToDelete]]);
					expect(setItemToDelete.mock.calls).toEqual([[null]]);
				});
		});

		it('calls onDelete but not setItemToDelete when the confirm dialog is confirmed and the request fails', () => {
			const onDelete = jest.fn().mockResolvedValue({error: true});
			const setItemToDelete = jest.fn();
			const itemToDelete = {id: 'test'};
			useState.mockReturnValueOnce(['']).mockReturnValueOnce([itemToDelete, setItemToDelete]);
			const wrapper = shallow(
				<EditorTable
					id="editor"
					breadcrumb={[]}
					page={jest.fn()}
					itemsById={{}}
					getRowId={jest.fn()}
					onDelete={onDelete}
				/>
			);
			return wrapper
				.find('ConfirmDialog')
				.prop('onConfirm')()
				.then(() => {
					expect(onDelete.mock.calls).toEqual([[itemToDelete]]);
					expect(setItemToDelete).not.toHaveBeenCalled();
				});
		});
	});
});
