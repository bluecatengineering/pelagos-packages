import {shallow} from 'enzyme';

import LinkButton from '../../src/components/LinkButton';
import useTooltip from '../../src/hooks/useTooltip';

jest.unmock('../../src/components/LinkButton');

describe('LinkButton', () => {
	describe('rendering', () => {
		it('renders expected elements when className is set', () => {
			const wrapper = shallow(<LinkButton id="test" text="Test" className="testClass" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when size is small', () => {
			const wrapper = shallow(<LinkButton id="test" text="Test" size="small" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when type is primary', () => {
			const wrapper = shallow(<LinkButton id="test" text="Test" type="primary" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when disabled is true', () => {
			const wrapper = shallow(<LinkButton id="test" text="Test" disabled />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when both size is small and disabled is true', () => {
			const wrapper = shallow(<LinkButton id="test" text="Test" size="small" disabled />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when disabled is true and className is set', () => {
			const wrapper = shallow(<LinkButton id="test" text="Test" disabled className="testClass" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when tooltipText is set', () => {
			const wrapper = shallow(<LinkButton id="test" text="Test" tooltipText="Tooltip" />);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(useTooltip.mock.calls).toEqual([['Tooltip', 'top']]);
		});
	});

	describe('behaviour', () => {
		it('clicks the target when space is pressed', () => {
			const click = jest.fn();
			const wrapper = shallow(<LinkButton id="test" text="Test" />);
			wrapper.find('#test').simulate('keydown', {key: ' ', target: {click}});
			expect(click.mock.calls).toEqual([[]]);
		});

		it('does not click the target when other key is pressed', () => {
			const click = jest.fn();
			const wrapper = shallow(<LinkButton id="test" text="Test" />);
			wrapper.find('#test').simulate('keydown', {key: 'Other', target: {click}});
			expect(click.mock.calls).toEqual([]);
		});
	});
});
