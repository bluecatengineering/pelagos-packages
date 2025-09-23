import setLocale from '../../src/functions/setLocale';
import l01n from '../../src/l10n';
import de from '../../src/l10n/de.po';
import en from '../../src/l10n/en.po';
import es from '../../src/l10n/es.po';
import fr from '../../src/l10n/fr.po';
import ja from '../../src/l10n/ja.po';
import pt from '../../src/l10n/pt.po';
import zh from '../../src/l10n/zh.po';

jest.unmock('../../src/functions/setLocale');

jest.mock('../../src/l10n');

describe('setLocale', () => {
	it.each([
		['de', de],
		['en', en],
		['es', es],
		['fr', fr],
		['ja', ja],
		['pt', pt],
		['zh', zh],
	])('calls load when locale is %s', (localeName, locale) =>
		setLocale(localeName).then(() => {
			expect(l01n.load.mock.calls).toEqual([[locale]]);
		})
	);

	it('throws when locale is unknown', () => expect(setLocale('xx')).rejects.toThrow('Unknown locale xx'));
});
