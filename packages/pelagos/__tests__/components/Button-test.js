import {shallow} from 'enzyme';

import Button from '../../src/components/Button';
import useTooltip from '../../src/hooks/useTooltip';
import setRefs from '../../src/functions/setRefs';

jest.unmock('../../src/components/Button');

useTooltip.mockReturnValue('useTooltip');

describe('Button', () => {
	describe('rendering', () => {
		it('renders expected elements when onClick is not specified', () => {
			const wrapper = shallow(<Button id="test" text="Test" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when onClick is specified', () => {
			const wrapper = shallow(<Button id="test" text="Test" onClick={jest.fn()} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(<Button id="test" text="Test" className="testClass" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when children are set', () => {
			const wrapper = shallow(<Button id="test">Test</Button>);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when size is small', () => {
			const wrapper = shallow(<Button id="test" text="Test" size="small" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when type is primary', () => {
			const wrapper = shallow(<Button id="test" text="Test" type="primary" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when icon is set', () => {
			const wrapper = shallow(<Button id="test" text="Test" icon={{}} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when disabled is true', () => {
			const wrapper = shallow(<Button id="test" text="Test" disabled />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when both size is small and disabled is true', () => {
			const wrapper = shallow(<Button id="test" text="Test" size="small" disabled />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when disabled is true and className is set', () => {
			const wrapper = shallow(<Button id="test" text="Test" disabled className="testClass" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when disabled is true and icon is set', () => {
			const wrapper = shallow(<Button id="test" text="Test" icon={{}} disabled />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when disabled is true and children are set', () => {
			const wrapper = shallow(
				<Button id="test" disabled>
					Test
				</Button>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when tooltipText is set', () => {
			const wrapper = shallow(<Button id="test" text="Test" tooltipText="Tooltip" />);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(useTooltip.mock.calls).toEqual([['Tooltip', 'top']]);
		});
	});

	describe('behaviour', () => {
		it('calls onClick when the button is clicked', () => {
			const onClick = jest.fn();
			const wrapper = shallow(<Button id="test" text="Test" onClick={onClick} />);
			wrapper.simulate('click');
			expect(onClick).toHaveBeenCalled();
		});

		it('calls setRefs when ref is set', () => {
			const ref = {foo: 'test'};
			Button({}, ref); // ref doesn't seem to be passed any other way
			expect(setRefs.mock.calls).toEqual([[ref, 'useTooltip']]);
		});
	});
});
