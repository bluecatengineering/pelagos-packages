import {mapState} from '../../src/components/FormDropZone';

jest.unmock('../../src/components/FormDropZone');

describe('FormDropZone', () => {
	describe('mapState', () => {
		it('maps state', () => {
			const extra = 'extra';
			const error = 'error';
			const setValue = jest.fn();
			const setExtra = jest.fn();
			const result = mapState({extra, error, setValue, setExtra});
			expect(result).toEqual({fileName: 'extra', error, onDrop: expect.any(Function)});

			const file = {name: 'foo'};
			result.onDrop('fileName', 'value');
			result.onDrop(file);
			expect(setValue.mock.calls).toEqual([['value'], [file]]);
			expect(setExtra.mock.calls).toEqual([['fileName'], ['foo']]);
		});
	});
});
