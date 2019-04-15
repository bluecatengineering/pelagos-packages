import React from 'react';
import {shallow} from 'enzyme';

import FormOutput from '../../src/formFields/FormOutput';

jest.unmock('../../src/formFields/FormOutput');

describe('FormOutput', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<FormOutput id="test" componentId="test" label="Test" value="This is a test" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(
				<FormOutput componentId="test" className="TestClass" label="Test" value="This is a test" />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when alignRight is true', () => {
			const wrapper = shallow(<FormOutput componentId="test" label="Test" value="This is a test" alignRight={true} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when active is true', () => {
			const wrapper = shallow(<FormOutput componentId="test" label="Test" value="This is a test" active={true} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
