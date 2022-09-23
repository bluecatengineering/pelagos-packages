import {connect} from '@bluecateng/auto-forms';
import {ToggleField} from '@bluecateng/pelagos';

jest.unmock('../../src/components/FormToggle');

describe('FormToggle', () => {
	it('maps state', () => {
		const value = true;
		const setValue = jest.fn();

		connect.mockReturnValue('connect');
		expect(require('../../src/components/FormToggle').default).toBe('connect');

		expect(connect.mock.calls).toEqual([[ToggleField, expect.any(Function)]]);

		const mapState = connect.mock.calls[0][1];
		const result = mapState({value, setValue});
		expect(result).toEqual({value, onChange: setValue});

		result.onChange(false);
		expect(setValue.mock.calls).toEqual([[false]]);
	});
});
