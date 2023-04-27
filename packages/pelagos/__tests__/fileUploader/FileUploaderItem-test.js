import {shallow} from 'enzyme';

import FileUploaderItem from '../../src/fileUploader/FileUploaderItem';

jest.unmock('../../src/fileUploader/FileUploaderItem');

describe('FileUploaderItem', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<FileUploaderItem name="foo.txt" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(
				<FileUploaderItem className="TestClass" name="foo.txt" error="Test error" disableDelete />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
