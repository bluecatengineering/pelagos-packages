import {connect} from '@bluecateng/auto-forms';
import {ListInput} from '@bluecateng/pelagos';

jest.unmock('../../src/components/FormListInput');

describe('FormListInput', () => {
	it('maps state', () => {
		const value = 'value';
		const error = 'error';
		const setValue = jest.fn();
		const setError = jest.fn();
		const setExtra = jest.fn();

		connect.mockReturnValue('connect');
		expect(require('../../src/components/FormListInput').default).toBe('connect');

		expect(connect.mock.calls).toEqual([[ListInput, expect.any(Function)]]);

		const mapState = connect.mock.calls[0][1];
		const result = mapState({value, error, setValue, setError, setExtra});
		expect(result).toEqual({
			list: value,
			error,
			onListChange: setValue,
			onTextChange: setExtra,
			onErrorChange: setError,
		});

		result.onListChange('value');
		expect(setValue.mock.calls).toEqual([['value']]);

		result.onTextChange('value');
		expect(setValue.mock.calls).toEqual([['value']]);

		result.onErrorChange('value');
		expect(setValue.mock.calls).toEqual([['value']]);
	});
});
