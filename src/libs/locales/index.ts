import path from 'path';

import auth from '../../../public/locales/en/auth.json';
import common from '../../../public/locales/en/common.json';

function getFilenameLocale(_path: string) {
  return path.basename(_path, '.json');
}

const commonPath = getFilenameLocale('../../public/en/common.json');
const authPath = getFilenameLocale('../../public/en/auth.json');

export const localesPath = [commonPath, authPath];

export interface Resources {
  common: typeof common;
  auth: typeof auth;
  // as many files in locales here
}
