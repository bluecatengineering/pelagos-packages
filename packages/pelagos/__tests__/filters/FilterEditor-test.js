import {shallow} from 'enzyme';

import FilterEditor from '../../src/filters/FilterEditor';
import useRandomId from '../../src/hooks/useRandomId';
import useAreaEditorPositioner from '../../src/hooks/useAreaEditorPositioner';

jest.unmock('../../src/filters/FilterEditor');

useRandomId.mockReturnValue('random-id');

describe('FilterEditor', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const onClose = jest.fn();
			const wrapper = shallow(
				<FilterEditor id="test" chipId="button" onClose={onClose}>
					editor
				</FilterEditor>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(useRandomId.mock.calls).toEqual([['test']]);
			expect(useAreaEditorPositioner.mock.calls).toEqual([[{current: null}, 'button', onClose]]);
		});
	});
});
