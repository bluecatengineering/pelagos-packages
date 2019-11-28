import React from 'react';
import {shallow} from 'enzyme';

import Tooltip from '../../src/components/Tooltip';

jest.unmock('../../src/components/Tooltip');

describe('Tooltip', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<Tooltip
					id="test"
					className="TestClass"
					placement="left"
					positionLeft="5px"
					positionTop="10px"
					arrowOffsetLeft="15px"
					arrowOffsetTop="20px">
					Test
				</Tooltip>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is not set', () => {
			const wrapper = shallow(
				<Tooltip
					id="test"
					placement="left"
					positionLeft="5px"
					positionTop="10px"
					arrowOffsetLeft="15px"
					arrowOffsetTop="20px">
					Test
				</Tooltip>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
