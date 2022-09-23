import {TagInputField} from '@bluecateng/pelagos';
import {connect} from '@bluecateng/auto-forms';

jest.unmock('../../src/components/FormTagInput');

jest.mock('@bluecateng/auto-forms', () => ({connect: jest.fn()}));

describe('FormTagInput', () => {
	it('maps state', () => {
		const value = 'value';
		const error = 'error';
		const setValue = jest.fn();
		const setError = jest.fn();

		connect.mockReturnValue('connect');
		expect(require('../../src/components/FormTagInput').default).toBe('connect');

		expect(connect.mock.calls).toEqual([[TagInputField, expect.any(Function)]]);

		const mapState = connect.mock.calls[0][1];
		const result = mapState({value, error, setValue, setError});
		expect(result).toEqual({tags: value, error, onChange: setValue, onError: setError});
	});
});
