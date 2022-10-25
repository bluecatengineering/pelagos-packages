import {connect} from '@bluecateng/auto-forms';
import {FileUploader} from '@bluecateng/pelagos';

jest.unmock('../../src/components/FormFileUploader');

describe('FormFileUploader', () => {
	it('maps state', () => {
		const value = 'value';
		const error = 'error';
		const setValue = jest.fn();

		connect.mockReturnValue('connect');
		expect(require('../../src/components/FormFileUploader').default).toBe('connect');

		expect(connect.mock.calls).toEqual([[FileUploader, expect.any(Function)]]);

		const mapState = connect.mock.calls[0][1];
		const result = mapState({value, error, setValue});
		expect(result).toEqual({files: value, error, onChange: expect.any(Function)});

		result.onChange('value');
		expect(setValue.mock.calls).toEqual([['value']]);
	});
});
