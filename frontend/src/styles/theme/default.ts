import hexToRgba from 'hex-to-rgba';

export const colors = {
  white: '#ffffff',
  black: '#000000',
  background: '#282a36',
  foreground: '#f8f8f2',
  outerSpace: '#44475a',
  primary: '#ff79c6',
  secondary: '#A7F3BD',
  tertiary: '#6272A4',
  accent1: '#FBBC05',
  accent2: '#00AEEF',
  alt1: '#828DD1',

  red: '#ff5555',
  green: '#50fa7b',
  keyLime: '#f1fa8c',
  blueGray: '#6272a4',
  vistaBlue: '#828DD1',
  cerulean: '#00aeef',
  platinum: '#E2E2E2',
};

export const gradients = {
  pink: ['#00aeef', '#bd93f9', '#ff79c6'],
};

export const fonts = {
  arial: 'Arial',
  arialRounded: 'Arial Rounded MT Bold',
  logo: 'HLT Sneaker Script',
};

export const theme = {
  colors,
  gradients,
  fonts,
  sitePaddings: {
    mobile: '1.5rem',
    desktop: '10.2rem',
  },
  hexToRgba,
};

export type ThemeType = typeof theme;
export type ColorType = ThemeType['colors'][keyof ThemeType['colors']];
export type ColorKey = keyof ThemeType['colors'];

// Overwrite styled-components DefaultTheme
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends ThemeType {}
}
