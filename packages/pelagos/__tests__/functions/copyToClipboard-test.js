import copyToClipboard from '../../src/functions/copyToClipboard';

jest.unmock('../../src/functions/copyToClipboard');

const data = 'test-data';
const writeText = jest.fn();
global.navigator = {clipboard: {writeText}};

describe('copyToClipboard', () => {
	it('calls writeText', () => {
		writeText.mockResolvedValue('result');

		return copyToClipboard(data).then((result) => {
			expect(result).toBe('result');
			expect(writeText.mock.calls).toEqual([[data]]);
		});
	});
});
