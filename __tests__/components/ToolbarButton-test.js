import {shallow} from 'enzyme';

import ToolbarButton from '../../src/components/ToolbarButton';

jest.unmock('../../src/components/ToolbarButton');

describe('ToolbarButton', () => {
	describe('rendering', () => {
		it('renders the expected elements', () => {
			const wrapper = shallow(
				<ToolbarButton
					id="test"
					className="TestClass"
					icon={{}}
					aria-label="Test"
					tooltipText="This is a test"
					disabled={true}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders the expected elements when className is not set', () => {
			const wrapper = shallow(
				<ToolbarButton id="test" icon={{}} aria-label="Test" tooltipText="This is a test" disabled={true} />
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
