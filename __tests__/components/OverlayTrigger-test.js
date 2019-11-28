import React from 'react';
import {shallow} from 'enzyme';

import OverlayTrigger from '../../src/components/OverlayTrigger';

jest.unmock('../../src/components/OverlayTrigger');

describe('OverlayTrigger', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<OverlayTrigger placement="left" overlay={<div />}>
					<div />
				</OverlayTrigger>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('sets show to true on mouse enter', () => {
			const wrapper = shallow(
				<OverlayTrigger placement="left" overlay={<div />}>
					<div id="child" />
				</OverlayTrigger>
			);
			wrapper.find('#child').prop('onMouseEnter')();
			expect(wrapper.state('show')).toBe(true);
		});

		it('sets show to true on focus', () => {
			const wrapper = shallow(
				<OverlayTrigger placement="left" overlay={<div />}>
					<div id="child" />
				</OverlayTrigger>
			);
			wrapper.find('#child').prop('onFocus')();
			expect(wrapper.state('show')).toBe(true);
		});

		it('sets show to false on mouse leave', () => {
			const wrapper = shallow(
				<OverlayTrigger placement="left" overlay={<div />}>
					<div id="child" />
				</OverlayTrigger>
			);
			wrapper.setState({show: true});
			wrapper.find('#child').prop('onMouseLeave')();
			expect(wrapper.state('show')).toBe(false);
		});

		it('sets show to true on blur', () => {
			const wrapper = shallow(
				<OverlayTrigger placement="left" overlay={<div />}>
					<div id="child" />
				</OverlayTrigger>
			);
			wrapper.setState({show: true});
			wrapper.find('#child').prop('onBlur')();
			expect(wrapper.state('show')).toBe(false);
		});
	});
});
