import {shallow} from 'enzyme';

import OutputField from '../../src/formFields/OutputField';
import useRandomId from '../../src/hooks/useRandomId';

jest.unmock('../../src/formFields/OutputField');

useRandomId.mockReturnValue('random-id');

describe('OutputField', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<OutputField id="test" label="Test" value="This is a test" />);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(useRandomId.mock.calls).toEqual([['test']]);
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(<OutputField id="test" className="TestClass" label="Test" value="This is a test" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when alignRight is true', () => {
			const wrapper = shallow(<OutputField id="test" label="Test" value="This is a test" alignRight={true} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when active is true', () => {
			const wrapper = shallow(<OutputField id="test" label="Test" value="This is a test" active={true} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
