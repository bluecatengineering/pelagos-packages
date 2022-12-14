import {shallow} from 'enzyme';

import DropZone from '../../src/formFields/DropZone';
import useRandomId from '../../src/hooks/useRandomId';

jest.unmock('../../src/formFields/DropZone');

useRandomId.mockReturnValue('random-id');

describe('DropZone', () => {
	describe('rendering', () => {
		it('renders expected elements when fileName is not set', () => {
			const wrapper = shallow(
				<DropZone
					id="test"
					className="TestClass"
					label="Test"
					optional
					emptyHint="Empty hint"
					helperText="Helper text"
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(useRandomId.mock.calls).toEqual([['test']]);
		});

		it('renders expected elements when fileName is set', () => {
			const wrapper = shallow(<DropZone id="test" uploadedHint="Uploaded hint" fileName="test-file.txt" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when editing is true', () => {
			const wrapper = shallow(
				<DropZone id="test" uploadedHint="Uploaded hint" editingHint="Editing hint" editing={true} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when onDelete is set', () => {
			const wrapper = shallow(
				<DropZone
					id="test"
					uploadedHint="Uploaded hint"
					editingHint="Editing hint"
					deleteTooltipText="Delete"
					editing={true}
					onDelete={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when error is set', () => {
			const wrapper = shallow(
				<DropZone id="test" uploadedHint="Uploaded hint" fileName="test-file.txt" error="Drop error" />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onDrop when a file is dropped', () => {
			const onDrop = jest.fn();
			const preventDefault = jest.fn();
			const remove = jest.fn();
			const name = 'file.txt';
			const result = 'text';
			const file = {name};
			const readAsText = jest.fn();
			const reader = {result, readAsText};
			global.FileReader = jest.fn(() => reader);
			const wrapper = shallow(<DropZone id="test" onDrop={onDrop} />);

			wrapper.find('#random-id').prop('onDrop')({
				preventDefault,
				currentTarget: {classList: {remove}},
				dataTransfer: {files: [file]},
			});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(remove.mock.calls).toEqual([['DropZone__content--active']]);
			expect(readAsText.mock.calls).toEqual([[file]]);
			expect(reader.onload).toEqual(expect.any(Function));
			reader.onload();
			expect(onDrop.mock.calls).toEqual([[name, result]]);
		});

		it('calls onDrop when a file is dropped and asFile is set', () => {
			const onDrop = jest.fn();
			const preventDefault = jest.fn();
			const remove = jest.fn();
			const name = 'file.txt';
			const file = {name};
			global.FileReader = jest.fn();
			const wrapper = shallow(<DropZone id="test" asFile onDrop={onDrop} />);

			wrapper.find('#random-id').prop('onDrop')({
				preventDefault,
				currentTarget: {classList: {remove}},
				dataTransfer: {files: [file]},
			});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(remove.mock.calls).toEqual([['DropZone__content--active']]);
			expect(FileReader.mock.calls).toEqual([]);
			expect(onDrop.mock.calls).toEqual([[file]]);
		});

		it('calls onDrop when a file is dropped and items is available', () => {
			const onDrop = jest.fn();
			const preventDefault = jest.fn();
			const remove = jest.fn();
			const getAsFile = jest.fn();
			const name = 'file.txt';
			const file = {name};
			const readAsText = jest.fn();
			const reader = {readAsText};
			global.FileReader = jest.fn(() => reader);
			getAsFile.mockReturnValue(file);
			const wrapper = shallow(<DropZone id="test" onDrop={onDrop} />);

			wrapper.find('#random-id').prop('onDrop')({
				preventDefault,
				currentTarget: {classList: {remove}},
				dataTransfer: {items: [{getAsFile}]},
			});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(remove.mock.calls).toEqual([['DropZone__content--active']]);
			expect(readAsText.mock.calls).toEqual([[file]]);
		});

		it('calls onDrop when a file is selected', () => {
			const onDrop = jest.fn();
			const name = 'file.txt';
			const file = {name};
			const readAsText = jest.fn();
			const reader = {readAsText};
			global.FileReader = jest.fn(() => reader);
			const wrapper = shallow(<DropZone id="test" onDrop={onDrop} />);

			wrapper.find('input').prop('onChange')({
				target: {files: [file]},
			});
			expect(readAsText.mock.calls).toEqual([[file]]);
		});

		it('does not call onDrop when no file is selected', () => {
			const onDrop = jest.fn();
			const readAsText = jest.fn();
			const reader = {readAsText};
			global.FileReader = jest.fn(() => reader);
			const wrapper = shallow(<DropZone id="test" onDrop={onDrop} />);

			wrapper.find('input').prop('onChange')({
				target: {files: []},
			});
			expect(readAsText.mock.calls).toEqual([]);
		});

		it('clicks the input element when the container is clicked', () => {
			const click = jest.fn();
			const wrapper = shallow(<DropZone id="test" />);
			wrapper.find('#random-id').simulate('click', {currentTarget: {firstChild: {click}}});
			expect(click.mock.calls).toEqual([[]]);
		});

		it('calls preventDefault on dragover', () => {
			const preventDefault = jest.fn();
			const dataTransfer = {};
			const wrapper = shallow(<DropZone id="test" />);
			wrapper.find('#random-id').prop('onDragOver')({preventDefault, dataTransfer});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(dataTransfer).toEqual({effectAllowed: 'copy', dropEffect: 'copy'});
		});

		it('calls preventDefault on dragover and disabled is set', () => {
			const preventDefault = jest.fn();
			const dataTransfer = {};
			const wrapper = shallow(<DropZone id="test" disabled />);
			wrapper.find('#random-id').prop('onDragOver')({preventDefault, dataTransfer});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(dataTransfer).toEqual({effectAllowed: 'none', dropEffect: 'none'});
		});

		it('adds a class on dragenter', () => {
			const relatedTarget = {};
			const contains = jest.fn();
			const add = jest.fn();
			const wrapper = shallow(<DropZone id="test" />);
			wrapper.find('#random-id').prop('onDragEnter')({relatedTarget, currentTarget: {contains, classList: {add}}});
			expect(contains.mock.calls).toEqual([[relatedTarget]]);
			expect(add.mock.calls).toEqual([['DropZone__content--active']]);
		});

		it('does not add a class on dragenter when contains returns true', () => {
			const relatedTarget = {};
			const contains = jest.fn().mockReturnValue(true);
			const add = jest.fn();
			const wrapper = shallow(<DropZone id="test" />);
			wrapper.find('#random-id').prop('onDragEnter')({relatedTarget, currentTarget: {contains, classList: {add}}});
			expect(contains.mock.calls).toEqual([[relatedTarget]]);
			expect(add.mock.calls).toEqual([]);
		});

		it('removes a class on dragleave', () => {
			const relatedTarget = {};
			const contains = jest.fn();
			const remove = jest.fn();
			const wrapper = shallow(<DropZone id="test" />);
			wrapper.find('#random-id').prop('onDragLeave')({relatedTarget, currentTarget: {contains, classList: {remove}}});
			expect(contains.mock.calls).toEqual([[relatedTarget]]);
			expect(remove.mock.calls).toEqual([['DropZone__content--active']]);
		});

		it('does not remove a class on dragleave when contains returns true', () => {
			const relatedTarget = {};
			const contains = jest.fn().mockReturnValue(true);
			const remove = jest.fn();
			const wrapper = shallow(<DropZone id="test" />);
			wrapper.find('#random-id').prop('onDragLeave')({relatedTarget, currentTarget: {contains, classList: {remove}}});
			expect(contains.mock.calls).toEqual([[relatedTarget]]);
			expect(remove.mock.calls).toEqual([]);
		});

		it('calls onDelete when the delete button is clicked', () => {
			const onDelete = jest.fn();
			const wrapper = shallow(<DropZone id="test" editing onDelete={onDelete} />);
			wrapper.find('#random-id-delete').simulate('click');
			expect(onDelete.mock.calls).toEqual([[]]);
		});
	});
});
