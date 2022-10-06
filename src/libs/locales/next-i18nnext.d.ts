// import the original type declarations
import 'next-i18next';
// import all namespaces (for the default language, only)
import { Resources as MyResources } from '.';

declare module 'next-i18next' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Resources extends MyResources {}
}
