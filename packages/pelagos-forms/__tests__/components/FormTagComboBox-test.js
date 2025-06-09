import {connect} from '@bluecateng/auto-forms';

import FormTagComboBox from '../../src/components/FormTagComboBox';

jest.unmock('../../src/components/FormTagComboBox');

jest.mock('@bluecateng/auto-forms', () => ({connect: jest.fn().mockReturnValue('connect')}));

const mapState = connect.mock.calls[0][1];

describe('FormTagComboBox', () => {
	it('maps state', () => {
		const value = 'value';
		const error = 'error';
		const setValue = jest.fn();
		const setError = jest.fn();

		expect(FormTagComboBox).toBe('connect');

		const result = mapState({value, error, setValue, setError});
		expect(result).toEqual({tags: value, error, onChange: setValue, onError: setError});
	});
});
