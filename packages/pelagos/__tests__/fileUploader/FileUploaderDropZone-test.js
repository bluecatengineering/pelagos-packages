import {useRef} from 'react';
import {shallow} from 'enzyme';

import FileUploaderDropZone from '../../src/fileUploader/FileUploaderDropZone';

jest.unmock('../../src/fileUploader/FileUploaderDropZone');

const types = [
	{description: 'Foo files', accept: {'text/x-foo': ['.foo'], 'application/x-foo': ['.foo']}},
	{description: 'Bar files', accept: {'text/x-bar': ['.bar1', '.bar2'], 'text/x-baz': ['.baz']}},
];

describe('FileUploaderDropZone', () => {
	afterEach(() => delete global.showOpenFilePicker);

	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<FileUploaderDropZone label="Test" text="Test drop zone" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(
				<FileUploaderDropZone
					id="test"
					label="Test"
					text="Test drop zone"
					types={types}
					required
					multiple
					error
					disabled
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when showOpenFilePicker is present', () => {
			global.showOpenFilePicker = true;
			const wrapper = shallow(<FileUploaderDropZone label="Test" text="Test drop zone" types={types} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onAddFiles when a file is dropped', () => {
			const onAddFiles = jest.fn();
			const preventDefault = jest.fn();
			const remove = jest.fn();
			const name = 'file.txt';
			const files = [{name}];
			const live = {};
			useRef.mockReturnValueOnce({current: live});
			const wrapper = shallow(<FileUploaderDropZone id="test" types={[]} onAddFiles={onAddFiles} />);

			wrapper.find('#test').prop('onDrop')({
				preventDefault,
				currentTarget: {classList: {remove}},
				dataTransfer: {files},
			});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(remove.mock.calls).toEqual([['FileUploader__dropZone--active']]);
			expect(onAddFiles.mock.calls).toEqual([[files]]);
			expect(live.textContent).toBe('File file.txt uploaded');
		});

		it('clicks the input element when the drop zone is clicked', () => {
			const click = jest.fn();
			const wrapper = shallow(<FileUploaderDropZone id="test" types={[]} />);
			wrapper.find('#test').simulate('click', {currentTarget: {nextSibling: {click}}});
			expect(click.mock.calls).toEqual([[]]);
		});

		it('calls onAddFiles when the drop zone is clicked and showOpenFilePicker is available', () => {
			const onAddFiles = jest.fn();
			const live = {};
			useRef.mockReturnValueOnce({current: live});
			global.showOpenFilePicker = jest
				.fn()
				.mockResolvedValue([
					{getFile: jest.fn().mockResolvedValue({name: 'bar.txt'})},
					{getFile: jest.fn().mockResolvedValue({name: 'baz.txt'})},
				]);
			const wrapper = shallow(<FileUploaderDropZone id="test" types={[]} multiple onAddFiles={onAddFiles} />);
			return wrapper
				.find('#test')
				.prop('onClick')()
				.then(() => {
					expect(showOpenFilePicker.mock.calls).toEqual([[{multiple: true, types: []}]]);
					expect(onAddFiles.mock.calls).toEqual([[[{name: 'bar.txt'}, {name: 'baz.txt'}]]]);
					expect(live.textContent).toBe('Files bar.txt, baz.txt uploaded');
				});
		});

		it('ignores errors when showOpenFilePicker fails', () => {
			global.showOpenFilePicker = jest.fn().mockRejectedValue(new Error());
			const wrapper = shallow(<FileUploaderDropZone id="test" types={[]} />);
			return wrapper
				.find('#test')
				.prop('onClick')()
				.then(() => {
					expect(showOpenFilePicker.mock.calls).toEqual([[{types: []}]]);
				});
		});

		it('calls onAddFiles when a file is selected', () => {
			const onAddFiles = jest.fn();
			const name = 'file.txt';
			const files = [{name}];
			const live = {};
			useRef.mockReturnValueOnce({current: live});
			const wrapper = shallow(<FileUploaderDropZone id="test" types={[]} multiple onAddFiles={onAddFiles} />);

			wrapper.find('input').simulate('change', {target: {files}});
			expect(onAddFiles.mock.calls).toEqual([[files]]);
			expect(live.textContent).toBe('File file.txt uploaded');
		});

		it('calls preventDefault on dragover', () => {
			const preventDefault = jest.fn();
			const dataTransfer = {};
			const wrapper = shallow(<FileUploaderDropZone id="test" types={[]} />);
			wrapper.find('#test').prop('onDragOver')({preventDefault, dataTransfer});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(dataTransfer).toEqual({effectAllowed: 'copy', dropEffect: 'copy'});
		});

		it('adds a class on dragenter', () => {
			const relatedTarget = {};
			const contains = jest.fn();
			const add = jest.fn();
			const wrapper = shallow(<FileUploaderDropZone id="test" types={[]} />);
			wrapper.find('#test').prop('onDragEnter')({relatedTarget, currentTarget: {contains, classList: {add}}});
			expect(contains.mock.calls).toEqual([[relatedTarget]]);
			expect(add.mock.calls).toEqual([['FileUploader__dropZone--active']]);
		});

		it('does not add a class on dragenter when contains returns true', () => {
			const relatedTarget = {};
			const contains = jest.fn().mockReturnValue(true);
			const add = jest.fn();
			const wrapper = shallow(<FileUploaderDropZone id="test" types={[]} />);
			wrapper.find('#test').prop('onDragEnter')({relatedTarget, currentTarget: {contains, classList: {add}}});
			expect(contains.mock.calls).toEqual([[relatedTarget]]);
			expect(add.mock.calls).toEqual([]);
		});

		it('removes a class on dragleave', () => {
			const relatedTarget = {};
			const contains = jest.fn();
			const remove = jest.fn();
			const wrapper = shallow(<FileUploaderDropZone id="test" types={[]} />);
			wrapper.find('#test').prop('onDragLeave')({relatedTarget, currentTarget: {contains, classList: {remove}}});
			expect(contains.mock.calls).toEqual([[relatedTarget]]);
			expect(remove.mock.calls).toEqual([['FileUploader__dropZone--active']]);
		});

		it('does not remove a class on dragleave when contains returns true', () => {
			const relatedTarget = {};
			const contains = jest.fn().mockReturnValue(true);
			const remove = jest.fn();
			const wrapper = shallow(<FileUploaderDropZone id="test" types={[]} />);
			wrapper.find('#test').prop('onDragLeave')({relatedTarget, currentTarget: {contains, classList: {remove}}});
			expect(contains.mock.calls).toEqual([[relatedTarget]]);
			expect(remove.mock.calls).toEqual([]);
		});
	});
});
