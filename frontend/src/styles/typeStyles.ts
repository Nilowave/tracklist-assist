import { css } from 'styled-components';
import { fluidType } from './helpers/fluidType';

export const typeStyles = {
  h1: css`
    ${fluidType(38, 44)};
    font-weight: 700;
  `,
  h2: css`
    font-family: ${({ theme }) => theme.fonts.arialRounded};
    font-size: 3.2rem;
    font-weight: 600;
  `,
  h3: css`
    font-family: ${({ theme }) => theme.fonts.arialRounded};
    font-size: 2.8rem;
    font-weight: 600;
    line-height: 1.1;
  `,
  title: css`
    font-size: 5.8rem;
    font-family: ${({ theme }) => theme.fonts.arialRounded};
    color: ${({ theme }) => theme.colors.outerSpace};
    text-shadow: 0.3rem 0.3rem 0 ${({ theme }) => theme.hexToRgba(theme.colors.secondary, 0.3)};
  `,
  smallTitle: css`
    font-size: 1.4rem;
    font-family: ${({ theme }) => theme.fonts.arialRounded};
    font-weight: 400;
  `,
  tinyTitle: css`
    font-size: 1.2rem;
    font-family: ${({ theme }) => theme.fonts.arialRounded};
    font-weight: 400;
  `,
  tooltip: css`
    font-size: 1.1rem;
    font-style: italic;
    font-weight: 400;
    letter-spacing: 1.1;
  `,
  menu: css`
    font-size: 1.6rem;
    font-family: ${({ theme }) => theme.fonts.arialRounded};
    color: ${({ theme }) => theme.colors.outerSpace};
  `,
  body: css`
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.32px;
  `,
  bodySmall: css`
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.32px;
  `,
  label: css`
    font-size: 1.2rem;
    line-height: 1.667;
    font-weight: 500;
  `,
  uppercase: css`
    font-size: 1.4rem;
    text-transform: uppercase;
  `,
  bold: css`
    font-size: 1.6rem;
    font-family: ${({ theme }) => theme.fonts.arialRounded};
    line-height: 1.285;
  `,
  button: css`
    font-size: 1.84rem;
    font-weight: 700;
    line-height: 1.285;
  `,
  disclaimer: css`
    font-size: 1.2rem;
    line-height: 1.8;
  `,
  tinyLogo: css`
    font-size: 2rem;
    line-height: 1.8;
    font-family: ${({ theme }) => theme.fonts.logo};
  `,
  caption: css`
    font-family: Roboto Flex;
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
    letter-spacing: 0.6px;
    text-transform: uppercase;
  `,
} as const;

export type TypeStyleType = typeof typeStyles;
export type TypeStyleKey = keyof typeof typeStyles;
