import {connect} from '@bluecateng/auto-forms';
import {DropDownField} from '@bluecateng/pelagos';

jest.unmock('../../src/components/FormDropDown');

describe('FormDropDown', () => {
	it('maps state', () => {
		const value = 'value';
		const error = 'error';
		const setValue = jest.fn();

		connect.mockReturnValue('connect');
		expect(require('../../src/components/FormDropDown').default).toBe('connect');

		expect(connect.mock.calls).toEqual([[DropDownField, expect.any(Function)]]);

		const mapState = connect.mock.calls[0][1];
		const result = mapState({value, error, setValue});
		expect(result).toEqual({value, error, onChange: setValue});

		result.onChange('value');
		expect(setValue.mock.calls).toEqual([['value']]);
	});
});
