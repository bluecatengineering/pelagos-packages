import {useRef} from 'react';
import {shallow} from 'enzyme';

import FilterEditor from '../../src/filters/LegacyFilterEditor';

jest.unmock('../../src/filters/LegacyFilterEditor');

const anyFunction = expect.any(Function);

describe('LegacyFilterEditor', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const getLabel = jest.fn().mockReturnValue('Test Label');
			const getEditor = jest.fn().mockReturnValue(<div id="editor" />);
			const wrapper = shallow(<FilterEditor name="test" value="foo" getLabel={getLabel} getEditor={getEditor} />);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(getLabel.mock.calls).toEqual([['test']]);
			expect(getEditor.mock.calls).toEqual([['test', 'foo', anyFunction, expect.any(Object)]]);
		});
	});

	describe('behaviour', () => {
		it('calls onSave when the save button is clicked', () => {
			const onSave = jest.fn();
			const wrapper = shallow(
				<FilterEditor name="test" value="foo" getLabel={jest.fn()} getEditor={jest.fn()} onSave={onSave} />
			);
			wrapper.find('Button').simulate('click');
			expect(onSave.mock.calls).toEqual([['foo']]);
		});

		it('does not call onSave when the save button is clicked and validateSave returns false', () => {
			useRef.mockReturnValueOnce(null).mockReturnValueOnce({current: () => false});
			const onSave = jest.fn();
			const wrapper = shallow(<FilterEditor name="test" getLabel={jest.fn()} getEditor={jest.fn()} onSave={onSave} />);
			wrapper.find('Button').simulate('click');
			expect(onSave).not.toHaveBeenCalled();
		});
	});
});
