import {useEffect, useState} from 'react';
import {shallow} from 'enzyme';

import TimeFilterEditor from '../../src/filters/TimeFilterEditor';

jest.unmock('../../src/filters/TimeFilterEditor');

const anyFunction = expect.any(Function);

global.document = {getElementById: jest.fn()};

describe('TimeFilterEditor', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<TimeFilterEditor id="test" label="Test" options={['foo', 'bar']} chipId="chip" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when from and to are set', () => {
			const parse = jest.fn().mockReturnValueOnce(1000).mockReturnValueOnce(2000);
			useState
				.mockReturnValueOnce(['custom'])
				.mockReturnValueOnce(['test-from'])
				.mockReturnValueOnce(['test-to'])
				.mockReturnValueOnce([null])
				.mockReturnValueOnce([null]);
			const wrapper = shallow(
				<TimeFilterEditor id="test" label="Test" options={['foo', 'bar']} parse={parse} chipId="chip" />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(parse.mock.calls).toEqual([
				['test-from', true],
				['test-to', false],
			]);
		});
	});

	describe('behaviour', () => {
		it('gets initial value for option when value is not set', () => {
			shallow(<TimeFilterEditor id="test" chipId="chip" />);
			expect(useState.mock.calls[0]).toEqual([anyFunction]);
			expect(useState.mock.results[0].value[0]).toBe('all');
		});

		it('gets initial value for option when value is a string', () => {
			shallow(<TimeFilterEditor id="test" chipId="chip" value="last1hour" />);
			expect(useState.mock.calls[0]).toEqual([anyFunction]);
			expect(useState.mock.results[0].value[0]).toBe('last1hour');
		});

		it('gets initial value for option when value is an object', () => {
			shallow(<TimeFilterEditor id="test" chipId="chip" value={{}} />);
			expect(useState.mock.calls[0]).toEqual([anyFunction]);
			expect(useState.mock.results[0].value[0]).toBe('custom');
		});

		it('gets initial value for from when value is not set', () => {
			shallow(<TimeFilterEditor id="test" chipId="chip" />);
			expect(useState.mock.calls[1]).toEqual([anyFunction]);
			expect(useState.mock.results[1].value[0]).toBe('');
		});

		it('gets initial value for from when value is a string', () => {
			shallow(<TimeFilterEditor id="test" chipId="chip" value="last1hour" />);
			expect(useState.mock.calls[1]).toEqual([anyFunction]);
			expect(useState.mock.results[1].value[0]).toBe('');
		});

		it('gets initial value for from when value is an object', () => {
			const parse = jest.fn();
			const format = jest.fn().mockReturnValue('format');
			shallow(<TimeFilterEditor id="test" value={{from: 'test-from'}} format={format} parse={parse} chipId="chip" />);
			expect(useState.mock.calls[1]).toEqual([anyFunction]);
			expect(useState.mock.results[1].value[0]).toBe('format');
			expect(format.mock.calls).toEqual([['test-from']]);
		});

		it('gets initial value for to when value is not set', () => {
			shallow(<TimeFilterEditor id="test" chipId="chip" />);
			expect(useState.mock.calls[2]).toEqual([anyFunction]);
			expect(useState.mock.results[2].value[0]).toBe('');
		});

		it('gets initial value for to when value is a string', () => {
			shallow(<TimeFilterEditor id="test" chipId="chip" value="last1hour" />);
			expect(useState.mock.calls[2]).toEqual([anyFunction]);
			expect(useState.mock.results[2].value[0]).toBe('');
		});

		it('gets initial value for to when value is an object', () => {
			const parse = jest.fn();
			const format = jest.fn().mockReturnValue('format');
			shallow(<TimeFilterEditor id="test" chipId="chip" value={{to: 'test-to'}} format={format} parse={parse} />);
			expect(useState.mock.calls[2]).toEqual([anyFunction]);
			expect(useState.mock.results[2].value[0]).toBe('format');
			expect(format.mock.calls).toEqual([['test-to']]);
		});

		it('calls setOption when the option changes', () => {
			const setOption = jest.fn();
			useState
				.mockReturnValueOnce(['last1hour', setOption])
				.mockReturnValueOnce([''])
				.mockReturnValueOnce([''])
				.mockReturnValueOnce([null])
				.mockReturnValueOnce([null]);
			shallow(<TimeFilterEditor id="test" chipId="chip" />)
				.find('#time-options')
				.simulate('change', 'yesterday');
			expect(setOption.mock.calls).toEqual([['yesterday']]);
		});

		it('calls setFrom when from value changes to a valid time', () => {
			const setFrom = jest.fn();
			const setFromError = jest.fn();
			const parse = jest.fn();
			const validateFrom = jest.fn().mockReturnValueOnce(null);
			useState
				.mockReturnValueOnce(['custom'])
				.mockReturnValueOnce(['test-from', setFrom])
				.mockReturnValueOnce([''])
				.mockReturnValueOnce([null, setFromError])
				.mockReturnValueOnce([null]);
			shallow(<TimeFilterEditor id="test" parse={parse} validateFrom={validateFrom} chipId="chip" />)
				.find('#time-from')
				.simulate('change', 'changed-from');
			expect(validateFrom.mock.calls).toEqual([['changed-from']]);
			expect(setFrom.mock.calls).toEqual([['changed-from']]);
			expect(setFromError.mock.calls).toEqual([[null]]);
		});

		it('calls setFromError when from value changes to a non valid string', () => {
			const setFrom = jest.fn();
			const setFromError = jest.fn();
			const parse = jest.fn();
			const validateFrom = jest.fn().mockReturnValueOnce('Test error');
			useState
				.mockReturnValueOnce(['custom'])
				.mockReturnValueOnce(['test-from', setFrom])
				.mockReturnValueOnce([''])
				.mockReturnValueOnce([null, setFromError])
				.mockReturnValueOnce([null]);
			shallow(<TimeFilterEditor id="test" parse={parse} validateFrom={validateFrom} chipId="chip" />)
				.find('#time-from')
				.simulate('change', 'changed-from');
			expect(setFrom.mock.calls).toEqual([['changed-from']]);
			expect(setFromError.mock.calls).toEqual([['Test error']]);
		});

		it('calls setTo when to value changes to a valid time', () => {
			const setTo = jest.fn();
			const setToError = jest.fn();
			const parse = jest.fn();
			const validateTo = jest.fn().mockReturnValueOnce(null);
			useState
				.mockReturnValueOnce(['custom'])
				.mockReturnValueOnce([''])
				.mockReturnValueOnce(['test-to', setTo])
				.mockReturnValueOnce([null])
				.mockReturnValueOnce([null, setToError]);
			shallow(<TimeFilterEditor id="test" parse={parse} validateTo={validateTo} chipId="chip" />)
				.find('#time-to')
				.simulate('change', 'changed-to');
			expect(validateTo.mock.calls).toEqual([['changed-to']]);
			expect(setTo.mock.calls).toEqual([['changed-to']]);
			expect(setToError.mock.calls).toEqual([[null]]);
		});

		it('calls setToError when to value changes to a non valid string', () => {
			const setTo = jest.fn();
			const setToError = jest.fn();
			const parse = jest.fn();
			const validateTo = jest.fn().mockReturnValueOnce('Test error');
			useState
				.mockReturnValueOnce(['custom'])
				.mockReturnValueOnce(['test-from'])
				.mockReturnValueOnce(['test-to', setTo])
				.mockReturnValueOnce([null])
				.mockReturnValueOnce([null, setToError]);
			shallow(<TimeFilterEditor id="test" parse={parse} validateTo={validateTo} chipId="chip" />)
				.find('#time-to')
				.simulate('change', 'changed-to');
			expect(setTo.mock.calls).toEqual([['changed-to']]);
			expect(setToError.mock.calls).toEqual([['Test error']]);
		});

		it('calls setFrom and setTo when the calendar changes', () => {
			const setOption = jest.fn();
			const setFrom = jest.fn();
			const setTo = jest.fn();
			const setFromError = jest.fn();
			const setToError = jest.fn();
			const format = jest.fn().mockReturnValue('format');
			const validateFrom = jest.fn().mockReturnValueOnce(null);
			const validateTo = jest.fn().mockReturnValueOnce(null);
			useState
				.mockReturnValueOnce(['all', setOption])
				.mockReturnValueOnce(['', setFrom])
				.mockReturnValueOnce(['', setTo])
				.mockReturnValueOnce([null, setFromError])
				.mockReturnValueOnce([null, setToError]);
			shallow(
				<TimeFilterEditor id="test" format={format} validateFrom={validateFrom} validateTo={validateTo} chipId="chip" />
			)
				.find('#time-calendar')
				.simulate('change', ['changed-from', 'changed-to']);
			expect(setOption.mock.calls).toEqual([['custom']]);
			expect(setFrom.mock.calls).toEqual([['format']]);
			expect(setTo.mock.calls).toEqual([['format']]);
			expect(validateFrom.mock.calls).toEqual([['format']]);
			expect(validateTo.mock.calls).toEqual([['format']]);
			expect(setFromError.mock.calls).toEqual([[null]]);
			expect(setToError.mock.calls).toEqual([[null]]);
			expect(format.mock.calls).toEqual([['changed-from'], ['changed-to']]);
		});

		it('does not call onSave when the editor calls onSave and fromError is set', () => {
			const parse = jest.fn();
			const onSave = jest.fn();
			useState
				.mockReturnValueOnce(['custom'])
				.mockReturnValueOnce(['test-from'])
				.mockReturnValueOnce(['test-to'])
				.mockReturnValueOnce(['Error'])
				.mockReturnValueOnce([null]);
			const wrapper = shallow(<TimeFilterEditor id="test" parse={parse} chipId="chip" onSave={onSave} />);
			wrapper.find('#test').prop('onSave')();
			expect(onSave.mock.calls).toEqual([]);
		});

		it('does not call onSave when the editor calls onSave and toError is set', () => {
			const parse = jest.fn();
			const onSave = jest.fn();
			useState
				.mockReturnValueOnce(['custom'])
				.mockReturnValueOnce(['test-from'])
				.mockReturnValueOnce(['test-to'])
				.mockReturnValueOnce([null])
				.mockReturnValueOnce(['Error']);
			const wrapper = shallow(<TimeFilterEditor id="test" parse={parse} chipId="chip" onSave={onSave} />);
			wrapper.find('#test').prop('onSave')();
			expect(onSave.mock.calls).toEqual([]);
		});

		it('calls setFromError when the editor calls onSave and neither from nor to are set', () => {
			const parse = jest.fn();
			const setFromError = jest.fn();
			useState
				.mockReturnValueOnce(['custom'])
				.mockReturnValueOnce([''])
				.mockReturnValueOnce([''])
				.mockReturnValueOnce([null, setFromError])
				.mockReturnValueOnce([null]);
			const wrapper = shallow(<TimeFilterEditor id="test" parse={parse} chipId="chip" />);
			wrapper.find('#test').prop('onSave')();
			expect(setFromError.mock.calls).toEqual([['Enter either one or both values.']]);
		});

		it('calls setFromError when the editor calls onSave and from is greater than to', () => {
			const setFromError = jest.fn();
			const parse = jest
				.fn()
				.mockReturnValueOnce(2000)
				.mockReturnValueOnce(1000)
				.mockReturnValueOnce(2000)
				.mockReturnValueOnce(1000);
			useState
				.mockReturnValueOnce(['custom'])
				.mockReturnValueOnce(['test-from'])
				.mockReturnValueOnce(['test-to'])
				.mockReturnValueOnce([null, setFromError])
				.mockReturnValueOnce([null]);
			const wrapper = shallow(<TimeFilterEditor id="test" parse={parse} chipId="chip" />);
			wrapper.find('#test').prop('onSave')();
			expect(parse.mock.calls).toEqual([
				['test-from', true],
				['test-to', false],
				['test-from', true],
				['test-to', false],
			]);
			expect(setFromError.mock.calls).toEqual([['"From" must be less than "To".']]);
		});

		it('calls onSave when the editor calls onSave and there are no errors', () => {
			const parse = jest
				.fn()
				.mockReturnValueOnce(1000)
				.mockReturnValueOnce(2000)
				.mockReturnValueOnce(1000)
				.mockReturnValueOnce(2000);
			const onSave = jest.fn();
			useState
				.mockReturnValueOnce(['custom'])
				.mockReturnValueOnce(['test-from'])
				.mockReturnValueOnce(['test-to'])
				.mockReturnValueOnce([null])
				.mockReturnValueOnce([null]);
			const wrapper = shallow(<TimeFilterEditor id="test" parse={parse} chipId="chip" onSave={onSave} />);
			wrapper.find('#test').prop('onSave')();
			expect(parse.mock.calls).toEqual([
				['test-from', true],
				['test-to', false],
				['test-from', true],
				['test-to', false],
			]);
			expect(onSave.mock.calls).toEqual([[{from: 1000, to: 2000}]]);
		});

		it('calls onSave when the editor calls onSave and there are no errors and only from is set', () => {
			const onSave = jest.fn();
			const parse = jest.fn().mockReturnValueOnce(1000).mockReturnValueOnce(1000);
			useState
				.mockReturnValueOnce(['custom'])
				.mockReturnValueOnce(['test-from'])
				.mockReturnValueOnce([''])
				.mockReturnValueOnce([null])
				.mockReturnValueOnce([null]);
			const wrapper = shallow(<TimeFilterEditor id="test" parse={parse} chipId="chip" onSave={onSave} />);
			wrapper.find('#test').prop('onSave')();
			expect(parse.mock.calls).toEqual([
				['test-from', true],
				['test-from', true],
			]);
			expect(onSave.mock.calls).toEqual([[{from: 1000}]]);
		});

		it('calls onSave when the editor calls onSave and there are no errors and only to is set', () => {
			const onSave = jest.fn();
			const parse = jest.fn().mockReturnValueOnce(2000).mockReturnValueOnce(2000);
			useState
				.mockReturnValueOnce(['custom'])
				.mockReturnValueOnce([''])
				.mockReturnValueOnce(['test-to'])
				.mockReturnValueOnce([null])
				.mockReturnValueOnce([null]);
			const wrapper = shallow(<TimeFilterEditor id="test" parse={parse} chipId="chip" onSave={onSave} />);
			wrapper.find('#test').prop('onSave')();
			expect(parse.mock.calls).toEqual([
				['test-to', false],
				['test-to', false],
			]);
			expect(onSave.mock.calls).toEqual([[{to: 2000}]]);
		});

		it('calls onSave when the editor calls onSave and option is not custom', () => {
			const parse = jest.fn();
			const onSave = jest.fn();
			useState
				.mockReturnValueOnce(['last1hour'])
				.mockReturnValueOnce(['test-from'])
				.mockReturnValueOnce(['test-to'])
				.mockReturnValueOnce(['Error'])
				.mockReturnValueOnce([null]);
			const wrapper = shallow(<TimeFilterEditor id="test" parse={parse} chipId="chip" onSave={onSave} />);
			wrapper.find('#test').prop('onSave')();
			expect(onSave.mock.calls).toEqual([['last1hour']]);
		});

		it('calls onSave when the editor calls onSave and option is all', () => {
			const parse = jest.fn();
			const onSave = jest.fn();
			useState
				.mockReturnValueOnce(['all'])
				.mockReturnValueOnce(['test-from'])
				.mockReturnValueOnce(['test-to'])
				.mockReturnValueOnce(['Error'])
				.mockReturnValueOnce([null]);
			const wrapper = shallow(<TimeFilterEditor id="test" parse={parse} chipId="chip" onSave={onSave} />);
			wrapper.find('#test').prop('onSave')();
			expect(onSave.mock.calls).toEqual([[null]]);
		});

		it('adds an effect which sets focus on the from field when option is custom', () => {
			const focus = jest.fn();
			const parse = jest.fn();
			document.getElementById.mockReturnValueOnce({focus});
			shallow(<TimeFilterEditor id="test" value="custom" parse={parse} chipId="chip" />);
			expect(useEffect.mock.calls[0]).toEqual([anyFunction, ['custom']]);
			useEffect.mock.calls[0][0]();
			expect(document.getElementById.mock.calls).toEqual([['time-from']]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('adds an effect which does not set focus on the from field when option is not custom', () => {
			shallow(<TimeFilterEditor id="test" value="last1hour" chipId="chip" />);
			expect(useEffect.mock.calls[0]).toEqual([anyFunction, ['last1hour']]);
			useEffect.mock.calls[0][0]();
			expect(document.getElementById.mock.calls).toEqual([]);
		});
	});
});
