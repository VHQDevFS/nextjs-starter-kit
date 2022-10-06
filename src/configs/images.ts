export function getSvgsSrc(name: string) {
  return `/assets/icons/${name}.svg`;
}

export function getImagesSrc(path: string) {
  return `/assets/images/${path}`;
}

export const IMAGES_URL = {
  LOGO: getImagesSrc('logo.png'),
};

export const ICONS_URL = {
  LOGO: getSvgsSrc('vercel'),
};
