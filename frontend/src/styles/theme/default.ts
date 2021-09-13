import hexToRgba from 'hex-to-rgba';

export const colors = {
  cream: '#FFFDF9',
  white: '#fff',
  black: '#000',
  background: '#282a36',
  foreground: '#f8f8f2',
  selection: '#44475a',
  primary: '#ff79c6',
  secondary: '#bd93f9',
  red: '#ff5555',
  green: '#50fa7b',
  yellow: '#f1fa8c',
  comment: '#6272a4',
};

export const fonts = {
  primary: 'Arial',
};

export const theme = {
  colors,
  fonts,
  sitePaddings: {
    mobile: '3rem',
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
