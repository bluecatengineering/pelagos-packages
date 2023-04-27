import {shallow} from 'enzyme';

import FileUploader from '../../src/fileUploader/FileUploader';
import useRandomId from '../../src/hooks/useRandomId';

jest.unmock('../../src/fileUploader/FileUploader');

useRandomId.mockReturnValue('random-id');

describe('FileUploader', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<FileUploader label="Test" dropZoneText="Test drop zone" files={[{name: 'foo.txt'}]} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(
				<FileUploader
					id="test"
					className="TestClass"
					label="Test"
					required
					dropZoneText="Test drop zone"
					types="test-types"
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
			const wrapper = shallow(<FileUploader label="Test" dropZoneText="Test drop zone" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onChange when a file is added', () => {
			const onChange = jest.fn();
			const files = [{name: 'file.txt'}];
			const wrapper = shallow(<FileUploader id="test" types={[]} onChange={onChange} />);

			wrapper.find('#random-id').prop('onAddFiles')(files);
			expect(onChange.mock.calls).toEqual([[files]]);
		});

		it('calls onChange when multiple files are added', () => {
			const onChange = jest.fn();
			const wrapper = shallow(
				<FileUploader id="test" types={[]} files={[{name: 'foo.txt'}]} multiple onChange={onChange} />
			);

			wrapper.find('#random-id').prop('onAddFiles')([{name: 'bar.txt'}, {name: 'baz.txt'}]);
			expect(onChange.mock.calls).toEqual([[[{name: 'foo.txt'}, {name: 'bar.txt'}, {name: 'baz.txt'}]]]);
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
