import {shallow} from 'enzyme';
import {useRandomId} from '@bluecateng/pelagos';

import Legend from '../../src/charts/Legend';

jest.unmock('../../src/charts/Legend');

const groups = ['foo', 'bar'];

useRandomId.mockReturnValue('random-id');

describe('Legend', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<Legend groups={groups} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(
				<Legend
					id="test"
					className="TestClass"
					groups={groups}
					direction="vertical"
					clickable
					selected={['bar']}
					color={{pairing: {groupCount: 5, option: 2}}}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(useRandomId.mock.calls).toEqual([['test']]);
		});
	});

	describe('behaviour', () => {
		it('calls click on the target when space is pressed', () => {
			const preventDefault = jest.fn();
			const click = jest.fn();
			const wrapper = shallow(<Legend groups={groups} clickable />);
			wrapper.simulate('keydown', {preventDefault, key: ' ', target: {click}});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(click.mock.calls).toEqual([[]]);
		});

		it('ignores keydown event when other key is pressed', () => {
			const preventDefault = jest.fn();
			const wrapper = shallow(<Legend groups={groups} clickable />);
			wrapper.simulate('keydown', {preventDefault, key: 'Other'});
			expect(preventDefault.mock.calls).toEqual([]);
		});

		it('calls onClick when an item is clicked', () => {
			const onClick = jest.fn();
			const focus = jest.fn();
			const closest = jest.fn().mockReturnValue({firstChild: {focus}, dataset: {group: 'foo', index: '0'}});
			const wrapper = shallow(<Legend groups={groups} clickable onClick={onClick} />);
			wrapper.simulate('click', {target: {closest}});
			expect(closest.mock.calls).toEqual([['li']]);
			expect(focus.mock.calls).toEqual([[]]);
			expect(onClick.mock.calls).toEqual([['foo', 0]]);
		});

		it('calls both onClick and onChange when an item is clicked', () => {
			const onClick = jest.fn();
			const onChange = jest.fn();
			const focus = jest.fn();
			const closest = jest.fn().mockReturnValue({firstChild: {focus}, dataset: {group: 'foo', index: '0'}});
			const wrapper = shallow(<Legend groups={groups} clickable selected={[]} onClick={onClick} onChange={onChange} />);
			wrapper.simulate('click', {target: {closest}});
			expect(closest.mock.calls).toEqual([['li']]);
			expect(focus.mock.calls).toEqual([[]]);
			expect(onClick.mock.calls).toEqual([['foo', 0]]);
			expect(onChange.mock.calls).toEqual([[['foo']]]);
		});

		it('calls onChange when an item is clicked and selected includes the item', () => {
			const onChange = jest.fn();
			const focus = jest.fn();
			const closest = jest.fn().mockReturnValue({firstChild: {focus}, dataset: {group: 'foo', index: '0'}});
			const wrapper = shallow(<Legend groups={groups} clickable selected={['foo', 'bar']} onChange={onChange} />);
			wrapper.simulate('click', {target: {closest}});
			expect(closest.mock.calls).toEqual([['li']]);
			expect(focus.mock.calls).toEqual([[]]);
			expect(onChange.mock.calls).toEqual([[['bar']]]);
		});

		it('calls onChange when an item is clicked and the item is the last one missing', () => {
			const onChange = jest.fn();
			const focus = jest.fn();
			const closest = jest.fn().mockReturnValue({firstChild: {focus}, dataset: {group: 'foo', index: '0'}});
			const wrapper = shallow(<Legend groups={groups} clickable selected={['bar']} onChange={onChange} />);
			wrapper.simulate('click', {target: {closest}});
			expect(closest.mock.calls).toEqual([['li']]);
			expect(focus.mock.calls).toEqual([[]]);
			expect(onChange.mock.calls).toEqual([[[]]]);
		});

		it('does not call onClick when clicked outside', () => {
			const onClick = jest.fn();
			const closest = jest.fn();
			const wrapper = shallow(<Legend groups={groups} clickable onClick={onClick} />);
			wrapper.simulate('click', {target: {closest}});
			expect(closest.mock.calls).toEqual([['li']]);
			expect(onClick.mock.calls).toEqual([]);
		});
	});
});
