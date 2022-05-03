import {useEffect, useRef} from 'react';
import {shallow} from 'enzyme';

import TableSelectAll from '../../src/table/TableSelectAll';

jest.unmock('../../src/table/TableSelectAll');

const anyFunction = expect.any(Function);

describe('TableSelectAll', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<TableSelectAll id="test" checked aria-label="Select all" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('adds an effect which sets indeterminate on the input', () => {
			const input = {};
			useRef.mockReturnValue({current: input});
			shallow(<TableSelectAll indeterminate aria-label="Select all" />);
			expect(useEffect.mock.calls[0]).toEqual([anyFunction, [true]]);

			useEffect.mock.calls[0][0]();
			expect(input).toEqual({indeterminate: true});
		});
	});
});
