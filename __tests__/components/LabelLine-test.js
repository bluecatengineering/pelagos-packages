import React from 'react';
import {shallow} from 'enzyme';

import LabelLine from '../../src/components/LabelLine';

jest.unmock('../../src/components/LabelLine');

describe('LabelLine', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<LabelLine htmlFor="test-id" text="Test" optionalText="Optional" showOptionalText notice="Notice" />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when showOptionalText is false', () => {
			const wrapper = shallow(<LabelLine htmlFor="test-id" text="Test" optionalText="Optional" notice="Notice" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optionalText and notice are not set', () => {
			const wrapper = shallow(<LabelLine htmlFor="test-id" text="Test" optionalText="Optional" notice="Notice" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
