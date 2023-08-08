import { createTheme } from '@mui/material';
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
  robotoFlex: 'Roboto Flex',
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

export const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.primary, // Your custom primary color
    },
    secondary: {
      main: colors.secondary, // Your custom secondary color
    },
    muted: {
      main: colors.platinum,
      light: colors.outerSpace,
      dark: colors.platinum,
    },
    background: {
      default: colors.background,
      paper: colors.background,
    },
    // Add more custom colors if needed
  },
  typography: {
    fontSize: 24,
    fontFamily: 'Roboto Flex',
    h1: {
      fontFamily: 'Arial Rounded MT Bold',
    },
    h2: {
      fontFamily: 'Arial Rounded MT Bold',
    },
    h3: {
      fontFamily: 'Arial Rounded MT Bold',
    },
    h4: {
      fontFamily: 'Arial Rounded MT Bold',
    },
    h5: {
      fontFamily: 'Arial Rounded MT Bold',
    },
    h6: {
      fontFamily: 'Arial Rounded MT Bold',
    },
    button: {
      fontFamily: 'Arial Rounded MT Bold',
    },
  },
});

export type ThemeType = typeof theme;
export type ColorType = ThemeType['colors'][keyof ThemeType['colors']];
export type ColorKey = keyof ThemeType['colors'];

// Overwrite styled-components DefaultTheme
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends ThemeType {}
}

declare module '@mui/material/styles' {
  interface Palette {
    muted: Palette['primary'];
  }

  interface PaletteOptions {
    muted?: PaletteOptions['primary'];
  }
}

// Update the Button's color options to include an muted option
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    muted: true;
  }
}
