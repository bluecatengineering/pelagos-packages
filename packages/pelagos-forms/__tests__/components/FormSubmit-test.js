import {shallow} from 'enzyme';
import {useFormState} from '@bluecateng/auto-forms';

import FormSubmit from '../../src/components/FormSubmit';

jest.unmock('../../src/components/FormSubmit');

describe('FormSubmit', () => {
	it('renders expected elements', () => {
		useFormState.mockReturnValue({
			isChanged: jest.fn().mockReturnValue(true),
			hasErrors: jest.fn().mockReturnValue(false),
		});
		const wrapper = shallow(<FormSubmit id="test" />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('renders expected elements when is changed returns false', () => {
		useFormState.mockReturnValue({
			isChanged: jest.fn().mockReturnValue(false),
			hasErrors: jest.fn().mockReturnValue(true),
		});
		const wrapper = shallow(<FormSubmit id="test" />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
