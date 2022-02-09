import copyToClipboard from '../../src/functions/copyToClipboard';

jest.unmock('../../src/functions/copyToClipboard');

const data = 'test-data';

describe('copyToClipboard', () => {
	describe('with clipboard', () => {
		it('calls writeText if navigator.clipboard is present', () => {
			const writeText = jest.fn().mockResolvedValue();
			global.navigator = {clipboard: {writeText}};

			return copyToClipboard(data).then(() => {
				expect(writeText.mock.calls).toEqual([[data]]);
			});
		});

		it('returns a rejected promise if navigator.clipboard is present and writeText fails', () => {
			const error = new Error();
			const writeText = jest.fn().mockRejectedValue(error);
			global.navigator = {clipboard: {writeText}};

			return expect(copyToClipboard(data)).rejects.toBe(error);
		});
	});

	describe('legacy', () => {
		beforeAll(() => {
			global.navigator = {};
			global.document = {
				createElement: jest.fn().mockReturnValue({style: {}, select: jest.fn()}),
				execCommand: jest.fn(),
				body: {appendChild: jest.fn(), removeChild: jest.fn()},
			};
		});

		it('calls execCommand if navigator.clipboard is not present', () =>
			copyToClipboard(data).then(() => {
				expect(document.execCommand.mock.calls).toEqual([['copy']]);
			}));

		it('returns a rejected promise if navigator.clipboard is not present and execCommand fails', () => {
			const error = new Error();
			document.execCommand.mockImplementation(() => {
				throw error;
			});

			return expect(copyToClipboard(data)).rejects.toBe(error);
		});
	});
});
