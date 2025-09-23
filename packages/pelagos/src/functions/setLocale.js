import l10n from '../l10n';

const loaders = {
	de: () => import('../l10n/de.po'),
	en: () => import('../l10n/en.po'),
	es: () => import('../l10n/es.po'),
	fr: () => import('../l10n/fr.po'),
	ja: () => import('../l10n/ja.po'),
	pt: () => import('../l10n/pt.po'),
	zh: () => import('../l10n/zh.po'),
};

/**
 * Sets the locale for Pelagos. The default language is English,
 * there is no need to call this function unless the selected language is different.
 * This function should be called as early as possible,
 * the caller must catch the returned promise and handle any errors.
 * @param {'de'|'en'|'es'|'fr'|'ja'|'pt'|'zh'} locale the locale to load.
 * @returns {*|Promise<never>}
 *
 * @example
 * import {setLocale} from '@bluecateng/pelagos';
 *
 * setLocale('es').catch((error) => {
 *     // handle error
 * })
 */
const setLocale = (locale) => {
	const loader = loaders[locale];
	return loader
		? loader().then(({default: data}) => l10n.load(data))
		: Promise.reject(new Error(`Unknown locale ${locale}`));
};

export default setLocale;
