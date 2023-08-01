import { createGlobalStyle } from 'styled-components';
import ArialRoundedBold from '../assets/fonts/ArialRoundedMTW02Bold.woff2';
import RobotoFlex from '../assets/fonts/RobotoFlex.woff2';

const FontStyles = createGlobalStyle`
  @font-face {
    font-family: 'Roboto Flex';
    src: url(${RobotoFlex}) format('woff2');
  }
  @font-face {
    font-family: 'Arial Rounded MT Bold';
    src: url(${ArialRoundedBold}) format('woff2');
  }
`;

export default FontStyles;
