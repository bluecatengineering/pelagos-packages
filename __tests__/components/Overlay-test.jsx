import React from 'react';
import ReactDOM from 'react-dom';
import {mount, shallow} from 'enzyme';

import Overlay from '../../src/components/Overlay';

jest.unmock('../../src/components/Overlay');

const Test = () => <div />;

describe('Overlay', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<Overlay show={true} placement="left">
					<Test />
				</Overlay>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when show is false', () => {
			const wrapper = shallow(
				<Overlay show={false} placement="left">
					<Test />
				</Overlay>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when the child has className', () => {
			const wrapper = shallow(
				<Overlay show={true} placement="left">
					<Test className="TestClass" />
				</Overlay>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('sets visible to false on transition end when show is false', () => {
			const wrapper = mount(
				<Overlay show={true} placement="left">
					<Test id="child" />
				</Overlay>
			);
			wrapper.setState({visible: true});
			wrapper.setProps({show: false});
			jest.runOnlyPendingTimers();
			const child = wrapper.find('#child');
			expect(wrapper.state('visible')).toBe(false);
			expect(child.getDOMNode().classList.contains('Overlay--visible')).toBe(false);
		});

		it('updates the position when placement is left and show changes to true', () => {
			jest
				.spyOn(ReactDOM, 'findDOMNode')
				.mockReturnValueOnce({getBoundingClientRect: () => ({top: 100, left: 100, width: 200, height: 50})})
				.mockReturnValueOnce({getBoundingClientRect: () => ({width: 20, height: 10})});
			const wrapper = mount(
				<Overlay show={false} placement="left" target={<div />}>
					<Test />
				</Overlay>
			);
			wrapper.setProps({show: true});
			expect(wrapper.state()).toEqual({positionLeft: 80, positionTop: 120, arrowOffsetTop: '50%', visible: true});
		});

		it('updates the position when placement is left and show changes to true and the overlay position is negative', () => {
			jest
				.spyOn(ReactDOM, 'findDOMNode')
				.mockReturnValueOnce({getBoundingClientRect: () => ({top: 100, left: 100, width: 200, height: 50})})
				.mockReturnValueOnce({getBoundingClientRect: () => ({width: 20, height: 400})});
			const wrapper = mount(
				<Overlay show={false} placement="left" target={<div />}>
					<Test />
				</Overlay>
			);
			wrapper.setProps({show: true});
			expect(wrapper.state()).toEqual({
				positionLeft: 80,
				positionTop: 0,
				arrowOffsetTop: '31.25%',
				visible: true,
			});
		});

		it('updates the position when placement is left and show changes to true and the overlay position exceeds the window height', () => {
			window.innerHeight = 600;
			jest
				.spyOn(ReactDOM, 'findDOMNode')
				.mockReturnValueOnce({getBoundingClientRect: () => ({top: 500, left: 100, width: 200, height: 50})})
				.mockReturnValueOnce({getBoundingClientRect: () => ({width: 20, height: 400})});
			const wrapper = mount(
				<Overlay show={false} placement="left" target={<div />}>
					<Test />
				</Overlay>
			);
			wrapper.setProps({show: true});
			expect(wrapper.state()).toEqual({
				positionLeft: 80,
				positionTop: 200,
				arrowOffsetTop: '81.25%',
				visible: true,
			});
		});

		it('updates the position when placement is right and show changes to true', () => {
			jest
				.spyOn(ReactDOM, 'findDOMNode')
				.mockReturnValueOnce({getBoundingClientRect: () => ({top: 100, left: 100, width: 200, height: 50})})
				.mockReturnValueOnce({getBoundingClientRect: () => ({width: 20, height: 10})});
			const wrapper = mount(
				<Overlay show={false} placement="right" target={<div />}>
					<Test />
				</Overlay>
			);
			wrapper.setProps({show: true});
			expect(wrapper.state()).toEqual({
				positionLeft: 300,
				positionTop: 120,
				arrowOffsetTop: '50%',
				visible: true,
			});
		});

		it('updates the position when placement is top and show changes to true', () => {
			jest
				.spyOn(ReactDOM, 'findDOMNode')
				.mockReturnValueOnce({getBoundingClientRect: () => ({top: 100, left: 100, width: 200, height: 50})})
				.mockReturnValueOnce({getBoundingClientRect: () => ({width: 20, height: 10})});
			const wrapper = mount(
				<Overlay show={false} placement="top" target={<div />}>
					<Test />
				</Overlay>
			);
			wrapper.setProps({show: true});
			expect(wrapper.state()).toEqual({
				positionLeft: 190,
				positionTop: 90,
				arrowOffsetLeft: '50%',
				visible: true,
			});
		});

		it('updates the position when placement is top and show changes to true and the overlay position is negative', () => {
			jest
				.spyOn(ReactDOM, 'findDOMNode')
				.mockReturnValueOnce({getBoundingClientRect: () => ({top: 100, left: 100, width: 200, height: 50})})
				.mockReturnValueOnce({getBoundingClientRect: () => ({width: 800, height: 10})});
			const wrapper = mount(
				<Overlay show={false} placement="top" target={<div />}>
					<Test />
				</Overlay>
			);
			wrapper.setProps({show: true});
			expect(wrapper.state()).toEqual({positionLeft: 0, positionTop: 90, arrowOffsetLeft: '25%', visible: true});
		});

		it('updates the position when placement is top and show changes to true and the overlay position exceeds the window width', () => {
			window.innerWidth = 1000;
			jest
				.spyOn(ReactDOM, 'findDOMNode')
				.mockReturnValueOnce({getBoundingClientRect: () => ({top: 100, left: 700, width: 200, height: 50})})
				.mockReturnValueOnce({getBoundingClientRect: () => ({width: 800, height: 10})});
			const wrapper = mount(
				<Overlay show={false} placement="top" target={<div />}>
					<Test />
				</Overlay>
			);
			wrapper.setProps({show: true});
			expect(wrapper.state()).toEqual({
				positionLeft: 200,
				positionTop: 90,
				arrowOffsetLeft: '75%',
				visible: true,
			});
		});

		it('updates the position when placement is bottom and show changes to true', () => {
			jest
				.spyOn(ReactDOM, 'findDOMNode')
				.mockReturnValueOnce({getBoundingClientRect: () => ({top: 100, left: 100, width: 200, height: 50})})
				.mockReturnValueOnce({getBoundingClientRect: () => ({width: 20, height: 10})});
			const wrapper = mount(
				<Overlay show={false} placement="bottom" target={<div />}>
					<Test />
				</Overlay>
			);
			wrapper.setProps({show: true});
			expect(wrapper.state()).toEqual({
				positionLeft: 190,
				positionTop: 150,
				arrowOffsetLeft: '50%',
				visible: true,
			});
		});

		it('does not change state when visible is true and other property changes', () => {
			const wrapper = mount(
				<Overlay show={true} placement="left">
					<Test id="child" />
				</Overlay>
			);
			wrapper.setState({visible: true});
			wrapper.setProps({other: true});
			const child = wrapper.find('#child');
			expect(child.getDOMNode().classList.contains('Overlay--visible')).toBe(true);
		});

		it('clears the timeout on unmount if set', () => {
			const wrapper = mount(
				<Overlay show={false} placement="bottom" target={<div />}>
					<Test />
				</Overlay>
			);
			wrapper.instance().timer = 1;
			wrapper.unmount();
			expect(clearTimeout.mock.calls).toEqual([[1]]);
		});

		it('does not clear the timeout on unmount if not set', () => {
			const wrapper = mount(
				<Overlay show={false} placement="bottom" target={<div />}>
					<Test />
				</Overlay>
			);
			wrapper.unmount();
			expect(clearTimeout).not.toHaveBeenCalled();
		});
	});
});
