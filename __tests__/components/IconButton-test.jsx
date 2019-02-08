import React from 'react';
import {shallow} from 'enzyme';

import IconButton from '../../src/components/IconButton';

jest.unmock('../../src/components/IconButton');

describe('IconButton', () => {
	describe('rendering', () => {
		it('renders the expected elements', () => {
			const wrapper = shallow(
				<IconButton componentId="test" icon={{}} className="TestClass" ariaLabel="Test" tooltipText="This is a test" />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders the expected elements when className is not set', () => {
			const wrapper = shallow(
				<IconButton componentId="test" icon={{}} ariaLabel="Test" tooltipText="This is a test" />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders the expected elements when tooltipText is not set', () => {
			const wrapper = shallow(<IconButton componentId="test" icon={{}} className="TestClass" ariaLabel="Test" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders the expected elements if disabled is true', () => {
			const wrapper = shallow(
				<IconButton componentId="test" icon={{}} ariaLabel="Test" tooltipText="This is a test" disabled={true} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders the expected elements if large is true', () => {
			const wrapper = shallow(
				<IconButton componentId="test" icon={{}} ariaLabel="Test" tooltipText="This is a test" large={true} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onClick when the button is clicked', () => {
			const onClick = jest.fn();
			const wrapper = shallow(<IconButton componentId="test" icon={{}} onClick={onClick} />);
			wrapper.find('[data-bcn-id="btn-test"]').simulate('click');
			expect(onClick).toHaveBeenCalled();
		});

		it('does not call onClick when the button is disabled and clicked', () => {
			const onClick = jest.fn();
			const wrapper = shallow(<IconButton componentId="test" icon={{}} disabled={true} onClick={onClick} />);
			wrapper.find('[data-bcn-id="btn-test"]').simulate('click');
			expect(onClick).not.toHaveBeenCalled();
		});

		it('calls onClick when enter is pressed', () => {
			const onClick = jest.fn();
			const event = {keyCode: 13, preventDefault: jest.fn()};
			const wrapper = shallow(<IconButton componentId="test" icon={{}} onClick={onClick} />);
			wrapper.find('[data-bcn-id="btn-test"]').simulate('keydown', event);
			expect(onClick.mock.calls).toEqual([[event]]);
			expect(event.preventDefault).toHaveBeenCalled();
		});

		it('calls onClick when space is pressed', () => {
			const onClick = jest.fn();
			const event = {keyCode: 32, preventDefault: jest.fn()};
			const wrapper = shallow(<IconButton componentId="test" icon={{}} onClick={onClick} />);
			wrapper.find('[data-bcn-id="btn-test"]').simulate('keydown', event);
			expect(onClick.mock.calls).toEqual([[event]]);
			expect(event.preventDefault).toHaveBeenCalled();
		});

		it('does not call onClick when any other key is pressed', () => {
			const onClick = jest.fn();
			const event = {keyCode: 65, preventDefault: jest.fn()};
			const wrapper = shallow(<IconButton componentId="test" icon={{}} onClick={onClick} />);
			wrapper.find('[data-bcn-id="btn-test"]').simulate('keydown', event);
			expect(onClick).not.toHaveBeenCalled();
			expect(event.preventDefault).not.toHaveBeenCalled();
		});

		it('does not call onClick when the button is disabled and a key is pressed', () => {
			const onClick = jest.fn();
			const wrapper = shallow(<IconButton componentId="test" icon={{}} disabled={true} onClick={onClick} />);
			wrapper.find('[data-bcn-id="btn-test"]').simulate('keydown');
			expect(onClick).not.toHaveBeenCalled();
		});
	});
});
