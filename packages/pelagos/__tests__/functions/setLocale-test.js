import setLocale from '../../src/functions/setLocale';
import l01n from '../../src/l10n';
import en from '../../src/l10n/en.po';
import es from '../../src/l10n/es.po';

jest.unmock('../../src/functions/setLocale');

jest.mock('../../src/l10n');

describe('setLocale', () => {
	it('calls load when locale is en', () =>
		setLocale('en').then(() => {
			expect(l01n.load.mock.calls).toEqual([[en]]);
		}));

	it('calls load when locale is es', () =>
		setLocale('es').then(() => {
			expect(l01n.load.mock.calls).toEqual([[es]]);
		}));

	it('throws when locale is unknown', () => expect(setLocale('xx')).rejects.toThrow('Unknown locale xx'));
});
