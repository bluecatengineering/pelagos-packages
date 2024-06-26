import {shallow} from 'enzyme';

import IconButton from '../../src/components/IconButton';
import useTooltip from '../../src/hooks/useTooltip';
import setRefs from '../../src/functions/setRefs';

jest.unmock('../../src/components/IconButton');

useTooltip.mockReturnValue('useTooltip');

describe('IconButton', () => {
	describe('rendering', () => {
		it('renders the expected elements', () => {
			const wrapper = shallow(
				<IconButton id="test" icon={{}} className="TestClass" aria-label="Test" tooltipText="This is a test" />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(useTooltip.mock.calls).toEqual([['This is a test', 'right', 'labelledby']]);
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

		it('renders the expected elements if pressed is true', () => {
			const wrapper = shallow(
				<IconButton id="test" icon={{}} aria-label="Test" tooltipText="This is a test" pressed />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders the expected elements if disabled is true and className is set', () => {
			const wrapper = shallow(
				<IconButton
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

		it('renders the expected elements when overlay is set', () => {
			const wrapper = shallow(
				<IconButton
					id="test"
					icon={{}}
					className="TestClass"
					aria-label="Test"
					tooltipText="This is a test"
					overlay="overlay"
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

		it('calls setRefs when ref is set', () => {
			const ref = {foo: 'test'};
			IconButton({}, ref); // ref doesn't seem to be passed any other way
			expect(setRefs.mock.calls).toEqual([[ref, 'useTooltip']]);
		});
	});
});
