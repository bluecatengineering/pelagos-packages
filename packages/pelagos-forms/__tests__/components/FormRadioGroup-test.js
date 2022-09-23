import {connect} from '@bluecateng/auto-forms';
import {RadioGroup} from '@bluecateng/pelagos';

jest.unmock('../../src/components/FormRadioGroup');

describe('FormRadioGroup', () => {
	it('maps state', () => {
		const value = 'value';
		const setValue = jest.fn();

		connect.mockReturnValue('connect');
		expect(require('../../src/components/FormRadioGroup').default).toBe('connect');

		expect(connect.mock.calls).toEqual([[RadioGroup, expect.any(Function)]]);

		const mapState = connect.mock.calls[0][1];
		const result = mapState({value, setValue});
		expect(result).toEqual({value, onChange: setValue});

		result.onChange('value');
		expect(setValue.mock.calls).toEqual([['value']]);
	});
});
