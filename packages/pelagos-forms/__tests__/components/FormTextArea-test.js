import {connect} from '@bluecateng/auto-forms';
import {TextAreaField} from '@bluecateng/pelagos';

jest.unmock('../../src/components/FormTextArea');

describe('FormTextArea', () => {
	it('maps state', () => {
		const value = 'value';
		const error = 'error';
		const setValue = jest.fn();

		connect.mockReturnValue('connect');
		expect(require('../../src/components/FormTextArea').default).toBe('connect');

		expect(connect.mock.calls).toEqual([[TextAreaField, expect.any(Function)]]);

		const mapState = connect.mock.calls[0][1];
		const result = mapState({value, error, setValue});
		expect(result).toEqual({value, error, onChange: expect.any(Function)});

		result.onChange('value');
		expect(setValue.mock.calls).toEqual([['value']]);
	});
});
