import {shallow} from 'enzyme';

import FileUploader from '../../src/formFields/FileUploader';
import useRandomId from '../../src/hooks/useRandomId';

jest.unmock('../../src/formFields/FileUploader');

const types = [
	{description: 'Foo files', accept: {'text/x-foo': ['.foo'], 'application/x-foo': ['.foo']}},
	{description: 'Ba files', accept: {'text/x-bar': ['.bar1', '.bar2'], 'text/x-baz': ['.baz']}},
];

useRandomId.mockReturnValue('random-id');

describe('FileUploader', () => {
	afterEach(() => delete global.showOpenFilePicker);

	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<FileUploader
					label="Test"
					description="Test description"
					dropZoneText="Test drop zone"
					types={types}
					files={[{name: 'foo.txt'}]}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(
				<FileUploader
					id="test"
					className="TestClass"
					label="Test"
					optional
					description="Test description"
					dropZoneText="Test drop zone"
					types={types}
					multiple
					files={[{name: 'foo.txt', error: 'Test file error'}]}
					error="Test error"
					disabled
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(useRandomId.mock.calls).toEqual([['test']]);
		});

		it('renders expected elements when files is not set', () => {
			const wrapper = shallow(
				<FileUploader
					label="Test"
					optional
					description="Test description"
					dropZoneText="Test drop zone"
					types={types}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when showOpenFilePicker is present', () => {
			global.showOpenFilePicker = true;
			const wrapper = shallow(
				<FileUploader
					label="Test"
					description="Test description"
					dropZoneText="Test drop zone"
					types={types}
					files={[{name: 'foo.txt'}]}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onChange when a file is dropped', () => {
			const onChange = jest.fn();
			const preventDefault = jest.fn();
			const remove = jest.fn();
			const name = 'file.txt';
			const files = [{name}];
			const wrapper = shallow(<FileUploader id="test" types={[]} onChange={onChange} />);

			wrapper.find('#random-id').prop('onDrop')({
				preventDefault,
				currentTarget: {classList: {remove}},
				dataTransfer: {files},
			});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(remove.mock.calls).toEqual([['FileUploader__dropZone--active']]);
			expect(onChange.mock.calls).toEqual([[files]]);
		});

		it('clicks the input element when the drop zone is clicked', () => {
			const click = jest.fn();
			const wrapper = shallow(<FileUploader id="test" types={[]} />);
			wrapper.find('#random-id').simulate('click', {currentTarget: {nextSibling: {click}}});
			expect(click.mock.calls).toEqual([[]]);
		});

		it('calls onChange when the drop zone is clicked and showOpenFilePicker is available', () => {
			const onChange = jest.fn();
			global.showOpenFilePicker = jest
				.fn()
				.mockResolvedValue([
					{getFile: jest.fn().mockResolvedValue({name: 'bar.txt'})},
					{getFile: jest.fn().mockResolvedValue({name: 'baz.txt'})},
				]);
			const wrapper = shallow(
				<FileUploader id="test" types={[]} multiple files={[{name: 'foo.txt'}]} onChange={onChange} />
			);
			return wrapper
				.find('#random-id')
				.prop('onClick')()
				.then(() => {
					expect(showOpenFilePicker.mock.calls).toEqual([[{multiple: true, types: []}]]);
					expect(onChange.mock.calls).toEqual([[[{name: 'foo.txt'}, {name: 'bar.txt'}, {name: 'baz.txt'}]]]);
				});
		});

		it('ignores errors when showOpenFilePicker fails', () => {
			global.showOpenFilePicker = jest.fn().mockRejectedValue(new Error());
			const wrapper = shallow(<FileUploader id="test" types={[]} />);
			return wrapper
				.find('#random-id')
				.prop('onClick')()
				.then(() => {
					expect(showOpenFilePicker.mock.calls).toEqual([[{types: []}]]);
				});
		});

		it('calls onChange when a file is selected', () => {
			const onChange = jest.fn();
			const name = 'file.txt';
			const files = [{name}];
			const wrapper = shallow(<FileUploader id="test" types={[]} onChange={onChange} />);

			wrapper.find('input').prop('onChange')({
				target: {files},
			});
			expect(onChange.mock.calls).toEqual([[files]]);
		});

		it('calls preventDefault on dragover', () => {
			const preventDefault = jest.fn();
			const dataTransfer = {};
			const wrapper = shallow(<FileUploader id="test" types={[]} />);
			wrapper.find('#random-id').prop('onDragOver')({preventDefault, dataTransfer});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(dataTransfer).toEqual({effectAllowed: 'copy', dropEffect: 'copy'});
		});

		it('adds a class on dragenter', () => {
			const relatedTarget = {};
			const contains = jest.fn();
			const add = jest.fn();
			const wrapper = shallow(<FileUploader id="test" types={[]} />);
			wrapper.find('#random-id').prop('onDragEnter')({relatedTarget, currentTarget: {contains, classList: {add}}});
			expect(contains.mock.calls).toEqual([[relatedTarget]]);
			expect(add.mock.calls).toEqual([['FileUploader__dropZone--active']]);
		});

		it('does not add a class on dragenter when contains returns true', () => {
			const relatedTarget = {};
			const contains = jest.fn().mockReturnValue(true);
			const add = jest.fn();
			const wrapper = shallow(<FileUploader id="test" types={[]} />);
			wrapper.find('#random-id').prop('onDragEnter')({relatedTarget, currentTarget: {contains, classList: {add}}});
			expect(contains.mock.calls).toEqual([[relatedTarget]]);
			expect(add.mock.calls).toEqual([]);
		});

		it('removes a class on dragleave', () => {
			const relatedTarget = {};
			const contains = jest.fn();
			const remove = jest.fn();
			const wrapper = shallow(<FileUploader id="test" types={[]} />);
			wrapper.find('#random-id').prop('onDragLeave')({relatedTarget, currentTarget: {contains, classList: {remove}}});
			expect(contains.mock.calls).toEqual([[relatedTarget]]);
			expect(remove.mock.calls).toEqual([['FileUploader__dropZone--active']]);
		});

		it('does not remove a class on dragleave when contains returns true', () => {
			const relatedTarget = {};
			const contains = jest.fn().mockReturnValue(true);
			const remove = jest.fn();
			const wrapper = shallow(<FileUploader id="test" types={[]} />);
			wrapper.find('#random-id').prop('onDragLeave')({relatedTarget, currentTarget: {contains, classList: {remove}}});
			expect(contains.mock.calls).toEqual([[relatedTarget]]);
			expect(remove.mock.calls).toEqual([]);
		});

		it('calls onChange when the remove button is clicked', () => {
			const onChange = jest.fn();
			const element = {dataset: {index: '0'}};
			const closest = jest.fn().mockReturnValue(element);
			const wrapper = shallow(
				<FileUploader id="test" types={[]} files={[{name: 'foo.txt'}, {name: 'bar.txt'}]} onChange={onChange} />
			);
			wrapper.find('[onClick]').last().simulate('click', {target: {closest}});
			expect(closest.mock.calls).toEqual([['button']]);
			expect(onChange.mock.calls).toEqual([[[{name: 'bar.txt'}]]]);
		});

		it('does not call onChange when no button is clicked', () => {
			const onChange = jest.fn();
			const closest = jest.fn();
			const wrapper = shallow(
				<FileUploader id="test" types={[]} files={[{name: 'foo.txt'}, {name: 'bar.txt'}]} onChange={onChange} />
			);
			wrapper.find('[onClick]').last().simulate('click', {target: {closest}});
			expect(closest.mock.calls).toEqual([['button']]);
			expect(onChange.mock.calls).toEqual([]);
		});
	});
});
