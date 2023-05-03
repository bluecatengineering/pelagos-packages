import {useContext} from 'react';

import useLayer from '../../src/hooks/useLayer';

jest.unmock('../../src/hooks/useLayer');

describe('useLayer', () => {
	it('returns the current layer', () => {
		useContext.mockReturnValue(1);
		expect(useLayer()).toBe(1);
	});
});
