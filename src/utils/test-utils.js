/**
 * Test utilities with i18n support
 * Provides wrapped render function for components that use i18next
 */

import React from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import our English translations for tests
import enTranslations from '../i18n/locales/en.json';

// Initialize i18n for tests
const testI18n = i18n.createInstance();

testI18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: enTranslations,
      },
    },
  });

// Custom render function that wraps components with i18n provider
const customRender = (ui, options) => {
  const Wrapper = ({ children }) => (
    <I18nextProvider i18n={testI18n}>
      {children}
    </I18nextProvider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };