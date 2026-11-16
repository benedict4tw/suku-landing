import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './locales/en.json'
import de from './locales/de.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      de: { translation: de },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'de'],
    detection: {
      // Explicit choice (localStorage/cookie) first, then browser language.
      // The cookie lets the edge (vercel.json rewrites) serve the matching prerendered HTML.
      order: ['localStorage', 'cookie', 'navigator'],
      lookupLocalStorage: 'suku_lang',
      lookupCookie: 'suku_lang',
      caches: ['localStorage', 'cookie'],
      cookieMinutes: 60 * 24 * 365,
      cookieOptions: { path: '/', sameSite: 'lax' },
    },
    interpolation: { escapeValue: false },
  })

export default i18n
