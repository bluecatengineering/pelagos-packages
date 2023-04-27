import {shallow} from 'enzyme';

import FileUploaderList from '../../src/fileUploader/FileUploaderList';

jest.unmock('../../src/fileUploader/FileUploaderList');

describe('FileUploaderList', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<FileUploaderList>
					<li />
				</FileUploaderList>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(
				<FileUploaderList className="TestClass">
					<li />
				</FileUploaderList>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
