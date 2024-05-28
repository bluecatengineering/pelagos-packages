import {useState} from 'react';
import {shallow} from 'enzyme';

import TableToolbarSearch, {OldTableToolbarSearch, NewTableToolbarSearch} from '../../src/table/TableToolbarSearch';

jest.unmock('../../src/table/TableToolbarSearch');

describe('TableToolbarSearch', () => {
	describe('rendering', () => {
		it('renders expected elements when value is set', () => {
			const wrapper = shallow(<TableToolbarSearch value="test" onChange={jest.fn()} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when value is not set', () => {
			const wrapper = shallow(<TableToolbarSearch onChange={jest.fn()} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('OldTableToolbarSearch', () => {
		describe('rendering', () => {
			it('renders expected elements', () => {
				useState.mockReturnValueOnce(['foo']);
				const wrapper = shallow(<OldTableToolbarSearch id="test" onChange={jest.fn()} />);
				expect(wrapper.getElement()).toMatchSnapshot();
			});

			it('renders expected elements when className is set', () => {
				useState.mockReturnValueOnce(['foo']);
				const wrapper = shallow(<OldTableToolbarSearch id="test" className="TestClass" onChange={jest.fn()} />);
				expect(wrapper.getElement()).toMatchSnapshot();
			});

			it('renders expected elements when initialText is set', () => {
				const wrapper = shallow(<OldTableToolbarSearch id="test" initialText="bar" onChange={jest.fn()} />);
				expect(wrapper.getElement()).toMatchSnapshot();
			});
		});

		describe('behaviour', () => {
			it('calls onChange when the search changes', () => {
				const onChange = jest.fn();
				const wrapper = shallow(<OldTableToolbarSearch onChange={onChange} />);
				wrapper.find('Search').simulate('change', 'test');
				expect(onChange.mock.calls).toEqual([['test']]);
			});
		});
	});

	describe('NewTableToolbarSearch', () => {
		describe('rendering', () => {
			it('renders expected elements', () => {
				const wrapper = shallow(<NewTableToolbarSearch id="test" value="test" onChange={jest.fn()} />);
				expect(wrapper.getElement()).toMatchSnapshot();
			});

			it('renders expected elements when className is set', () => {
				const wrapper = shallow(
					<NewTableToolbarSearch id="test" className="TestClass" value="test" onChange={jest.fn()} />
				);
				expect(wrapper.getElement()).toMatchSnapshot();
			});
		});

		describe('behaviour', () => {
			it('calls onChange when the search changes', () => {
				const onChange = jest.fn();
				const wrapper = shallow(<NewTableToolbarSearch value="test" onChange={onChange} />);
				wrapper.find('Search').simulate('change', 'test');
				expect(onChange.mock.calls).toEqual([['test']]);
			});
		});
	});
});
