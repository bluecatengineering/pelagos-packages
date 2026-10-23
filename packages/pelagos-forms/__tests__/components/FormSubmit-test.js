import {shallow} from 'enzyme';
import {useFormState} from '@bluecateng/auto-forms';

import FormSubmit from '../../src/components/FormSubmit';

jest.unmock('../../src/components/FormSubmit');

describe('FormSubmit', () => {
	it('renders expected elements', () => {
		useFormState.mockReturnValue({
			isChanged: jest.fn().mockReturnValue(true),
		});
		const wrapper = shallow(<FormSubmit id="test" />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('forwards the other props to the button', () => {
		useFormState.mockReturnValue({
			isChanged: jest.fn().mockReturnValue(true),
		});
		const onClick = jest.fn();
		const wrapper = shallow(<FormSubmit id="test" text="Save" disabled onClick={onClick} />);
		expect(wrapper.props()).toEqual({id: 'test', text: 'Save', disabled: true, onClick, type: 'primary'});
	});

	it('renders expected elements when is changed returns false', () => {
		useFormState.mockReturnValue({
			isChanged: jest.fn().mockReturnValue(false),
		});
		const wrapper = shallow(<FormSubmit id="test" />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
