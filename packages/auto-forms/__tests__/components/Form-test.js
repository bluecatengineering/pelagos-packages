import {useReducer} from 'react';
import {shallow} from 'enzyme';

import Form from '../../src/components/Form';
import isNotNull from '../../src/utils/isNotNull';

jest.unmock('../../src/components/Form');

describe('Form', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<Form id="test" initialValues={{test: 'foo'}} rules={{}}>
					<div />
				</Form>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('reducer sets state depending on action', () => {
			const state = {
				initialValues: {other: 'init', keep: 'k'},
				values: {other: 'init', keep: 'k'},
				errors: {other: null, keep: 'keep-error'},
				extras: {keep: 'keep-extra'},
			};
			shallow(
				<Form id="test" initialValues={{}} rules={{}}>
					<div />
				</Form>
			);
			const reducer = useReducer.mock.calls[0][0];
			expect(reducer(state, {type: 'SET_VALUE', name: 'other', payload: 'bar'})).toEqual({
				...state,
				values: {other: 'bar', keep: 'k'},
			});
			expect(reducer(state, {type: 'SET_VALUE', name: 'other', payload: 'bar', error: 'bar-error'})).toEqual({
				...state,
				values: {other: 'bar', keep: 'k'},
				errors: {other: 'bar-error', keep: 'keep-error'},
			});
			expect(reducer(state, {type: 'SET_VALUE', name: 'other', payload: 'bar', error: undefined})).toEqual({
				...state,
				values: {other: 'bar', keep: 'k'},
				errors: {other: undefined, keep: 'keep-error'},
			});
			expect(reducer(state, {type: 'SET_ERROR', name: 'other', payload: 'bar-error'})).toEqual({
				...state,
				errors: {other: 'bar-error', keep: 'keep-error'},
			});
			expect(reducer(state, {type: 'SET_EXTRA', name: 'other', payload: 'bar-extra'})).toEqual({
				...state,
				extras: {other: 'bar-extra', keep: 'keep-extra'},
			});
			expect(reducer(state, {type: 'RESET', payload: {other: 'bar'}})).toEqual({other: 'bar'});
			expect(reducer(state, {type: 'FAKE', name: 'fake', payload: 'fake'})).toEqual(state);
		});

		it('calls onSubmit if validation passes', () => {
			const initialValues = {test: 'foo'};
			const onSubmit = jest.fn();
			const preventDefault = jest.fn();
			const event = {preventDefault};
			const dispatch = jest.fn();
			useReducer.mockReturnValue([{errors: {}, extras: {}, initialValues, values: initialValues}, dispatch]);

			const wrapper = shallow(
				<Form id="test" initialValues={initialValues} rules={{}} onSubmit={onSubmit}>
					<div />
				</Form>
			);
			return wrapper
				.find('#test')
				.prop('onSubmit')(event)
				.then(() => {
					expect(preventDefault.mock.calls).toEqual([[]]);
					expect(onSubmit.mock.calls).toEqual([
						[
							initialValues,
							{
								initialValues,
								extras: {},
								setErrors: expect.any(Function),
							},
						],
					]);

					const setErrors = onSubmit.mock.calls[0][1].setErrors;
					setErrors({foo: 'foo-test'});
					expect(dispatch.mock.calls).toEqual([[{name: 'foo', payload: 'foo-test', type: 'SET_ERROR'}]]);
				});
		});

		it('does not call onSubmit if the validation fails', () => {
			const onSubmit = jest.fn();
			const initialValues = {test: 'foo', other: 'bar'};
			const rule = jest.fn().mockReturnValue('rule-error');
			const getActiveFields = jest.fn().mockReturnValue(['test']);
			const extraValidation = jest.fn().mockReturnValue({foo: 'foo-error', bar: null});
			isNotNull.mockReturnValueOnce(true).mockReturnValueOnce(false);
			const preventDefault = jest.fn();
			const event = {preventDefault};
			const dispatch = jest.fn();
			const state = {errors: {}, extras: {}, initialValues, values: initialValues};
			useReducer.mockReturnValue([state, dispatch]);
			const wrapper = shallow(
				<Form
					id="test"
					initialValues={initialValues}
					rules={{test: rule}}
					getActiveFields={getActiveFields}
					extraValidation={extraValidation}
					onSubmit={onSubmit}
				/>
			);
			return wrapper
				.find('#test')
				.prop('onSubmit')(event)
				.then(() => {
					expect(rule.mock.calls).toEqual([['foo']]);
					expect(getActiveFields.mock.calls).toEqual([[initialValues, {}]]);
					expect(extraValidation.mock.calls).toEqual([[{test: 'rule-error'}, initialValues, {}, initialValues]]);
					expect(isNotNull.mock.calls).toEqual([['foo-error'], [null]]);
					expect(dispatch.mock.calls).toEqual([
						[{type: 'SET_ERROR', name: 'foo', payload: 'foo-error'}],
						[{type: 'SET_ERROR', name: 'bar', payload: null}],
					]);
					expect(onSubmit.mock.calls).toEqual([]);
				});
		});

		it('clears the errors of fields which are not active', () => {
			const onSubmit = jest.fn();
			const values = {a: 'a-value', b: 'b-value', c: 'c-value'};
			const rule = jest.fn().mockReturnValue(null);
			const getActiveFields = jest.fn().mockReturnValue(['c']);
			const preventDefault = jest.fn();
			const dispatch = jest.fn();
			const state = {errors: {a: 'a-error', b: null, c: null}, extras: {}, initialValues: values, values};
			useReducer.mockReturnValue([state, dispatch]);
			const wrapper = shallow(
				<Form
					id="test"
					initialValues={values}
					rules={{a: rule, c: rule}}
					getActiveFields={getActiveFields}
					onSubmit={onSubmit}
				/>
			);
			return wrapper
				.find('#test')
				.prop('onSubmit')({preventDefault})
				.then(() => {
					expect(rule.mock.calls).toEqual([['c-value']]);
					expect(dispatch.mock.calls).toEqual([
						[{type: 'SET_ERROR', name: 'a', payload: null}],
						[{type: 'SET_ERROR', name: 'c', payload: null}],
					]);
					expect(onSubmit.mock.calls.length).toBe(1);
				});
		});

		it('waits for asynchronous extra validation', () => {
			const onSubmit = jest.fn().mockReturnValue('submit-result');
			const initialValues = {test: 'foo'};
			const extraValidation = jest.fn().mockResolvedValue({test: null});
			const dispatch = jest.fn();
			useReducer.mockReturnValue([{errors: {}, extras: {}, initialValues, values: initialValues}, dispatch]);
			const wrapper = shallow(
				<Form
					id="test"
					initialValues={initialValues}
					rules={{}}
					extraValidation={extraValidation}
					onSubmit={onSubmit}
				/>
			);
			return wrapper
				.find('#test')
				.prop('onSubmit')({preventDefault: jest.fn()})
				.then((result) => {
					expect(result).toBe('submit-result');
					expect(dispatch.mock.calls).toEqual([[{type: 'SET_ERROR', name: 'test', payload: null}]]);
				});
		});

		it('rejects if a rule throws', () => {
			const onSubmit = jest.fn();
			const initialValues = {test: 'foo'};
			const error = new Error('rule-failure');
			useReducer.mockReturnValue([{errors: {}, extras: {}, initialValues, values: initialValues}, jest.fn()]);
			const wrapper = shallow(
				<Form
					id="test"
					initialValues={initialValues}
					rules={{
						test: () => {
							throw error;
						},
					}}
					onSubmit={onSubmit}
				/>
			);
			return expect(wrapper.find('#test').prop('onSubmit')({preventDefault: jest.fn()}))
				.rejects.toBe(error)
				.then(() => {
					expect(onSubmit.mock.calls).toEqual([]);
				});
		});

		it('rejects if onSubmit rejects', () => {
			const initialValues = {test: 'foo'};
			const error = new Error('submit-failure');
			useReducer.mockReturnValue([{errors: {}, extras: {}, initialValues, values: initialValues}, jest.fn()]);
			const wrapper = shallow(
				<Form id="test" initialValues={initialValues} rules={{}} onSubmit={() => Promise.reject(error)} />
			);
			return expect(wrapper.find('#test').prop('onSubmit')({preventDefault: jest.fn()})).rejects.toBe(error);
		});

		it('resets the form state', () => {
			const initialValues = {test: 'foo'};
			const preventDefault = jest.fn();
			const event = {preventDefault};
			const dispatch = jest.fn();
			useReducer.mockReturnValue([{test: 'bar'}, dispatch]);

			const wrapper = shallow(
				<Form id="test" initialValues={initialValues} rules={{}}>
					<div />
				</Form>
			);
			wrapper.find('#test').prop('onReset')(event);
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(dispatch.mock.calls).toEqual([
				[
					{
						type: 'RESET',
						payload: {errors: {test: null}, extras: {}, initialValues, values: initialValues},
					},
				],
			]);
		});
	});
});
