import {connect} from '@bluecateng/auto-forms';
import {CheckBox} from '@bluecateng/pelagos';

jest.unmock('../../src/components/FormCheckBox');

describe('FormCheckBox', () => {
	it('maps state', () => {
		const value = true;
		const setValue = jest.fn();

		connect.mockReturnValue('connect');
		expect(require('../../src/components/FormCheckBox').default).toBe('connect');

		expect(connect.mock.calls).toEqual([[CheckBox, expect.any(Function)]]);

		const mapState = connect.mock.calls[0][1];
		const result = mapState({value, setValue});
		expect(result).toEqual({checked: true, onChange: expect.any(Function)});

		result.onChange();
		expect(setValue.mock.calls).toEqual([[false]]);
	});
});
