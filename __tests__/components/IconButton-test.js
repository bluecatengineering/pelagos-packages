import React from 'react';
import {shallow} from 'enzyme';

import IconButton from '../../src/components/IconButton';
import useButtonKeyHandler from '../../src/hooks/useButtonKeyHandler';

jest.unmock('../../src/components/IconButton');

describe('IconButton', () => {
	describe('rendering', () => {
		it('renders the expected elements', () => {
			const wrapper = shallow(
				<IconButton id="test" icon={{}} className="TestClass" aria-label="Test" tooltipText="This is a test" />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders the expected elements when className is not set', () => {
			const wrapper = shallow(<IconButton id="test" icon={{}} aria-label="Test" tooltipText="This is a test" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders the expected elements when tooltipText is not set', () => {
			const wrapper = shallow(<IconButton id="test" icon={{}} className="TestClass" aria-label="Test" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders the expected elements if disabled is true', () => {
			const wrapper = shallow(
				<IconButton id="test" icon={{}} aria-label="Test" tooltipText="This is a test" disabled={true} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders the expected elements when size and tooltipPlacement are set', () => {
			const wrapper = shallow(
				<IconButton
					id="test"
					icon={{}}
					aria-label="Test"
					size="large"
					tooltipText="This is a test"
					tooltipPlacement="left"
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onClick when the button is clicked', () => {
			const onClick = jest.fn();
			const wrapper = shallow(<IconButton id="test" icon={{}} onClick={onClick} />);
			wrapper.find('#test').simulate('click');
			expect(onClick).toHaveBeenCalled();
		});

		it('does not call onClick when the button is disabled and clicked', () => {
			const onClick = jest.fn();
			const wrapper = shallow(<IconButton id="test" icon={{}} disabled={true} onClick={onClick} />);
			wrapper.find('#test').simulate('click');
			expect(onClick).not.toHaveBeenCalled();
		});

		it('calls the key handler when a key is pressed', () => {
			const onClick = jest.fn();
			const event = {keyCode: 13};
			useButtonKeyHandler.mockImplementation(v => v);
			const wrapper = shallow(<IconButton id="test" icon={{}} onClick={onClick} />);
			wrapper.find('#test').simulate('keydown', event);
			expect(onClick.mock.calls).toEqual([[event]]);
		});

		it('does not call the key handler when the button is disabled and a key is pressed', () => {
			const onClick = jest.fn();
			useButtonKeyHandler.mockImplementation(v => v);
			const wrapper = shallow(<IconButton id="test" icon={{}} disabled={true} onClick={onClick} />);
			wrapper.find('#test').simulate('keydown');
			expect(onClick).not.toHaveBeenCalled();
		});
	});
});