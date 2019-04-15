import React from 'react';
import {shallow} from 'enzyme';

import ToolbarButton from '../../src/components/ToolbarButton';

jest.unmock('../../src/components/ToolbarButton');

describe('ToolbarButton', () => {
	describe('rendering', () => {
		it('renders the expected elements', () => {
			const wrapper = shallow(
				<ToolbarButton
					id="test"
					componentId="test"
					className="TestClass"
					icon={{}}
					ariaLabel="Test"
					tooltipText="This is a test"
					disabled={true}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders the expected elements if active is true', () => {
			const wrapper = shallow(
				<ToolbarButton componentId="test" icon={{}} ariaLabel="Test" tooltipText="This is a test" active={true} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders the expected elements when className is not set', () => {
			const wrapper = shallow(
				<ToolbarButton componentId="test" icon={{}} ariaLabel="Test" tooltipText="This is a test" disabled={true} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onClick when the button is clicked', () => {
			const onClick = jest.fn();
			const wrapper = shallow(<ToolbarButton onClick={onClick} />);
			wrapper.find('IconButton').prop('onClick')();
			expect(onClick).toHaveBeenCalled();
		});
	});
});
