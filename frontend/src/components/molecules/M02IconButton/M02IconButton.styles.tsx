import styled, { css } from 'styled-components';
import { ColorKey } from '../../../styles/theme/default';
import { Text } from '../../atoms/A03Text/A03Text.styles';

export const Tooltip = styled(Text)`
  position: absolute;
  top: 50%;
  padding: 0.4rem 0.8rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.background};
  right: calc(100% + 1rem);
  transform: translateY(-50%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  box-shadow: 0px 2px 4px ${({ theme }) => theme.hexToRgba(theme.colors.black, 0.2)};

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    height: 2px;
    width: 5px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 0 2px 2px 0;
    transform: translate(5px, -50%);
  }
`;

export const IconWrapper = styled.div<{
  $border?: boolean;
  $isText: boolean;
  $fill?: 'solid' | 'transparent';
  $color?: ColorKey;
  $size?: 'small' | 'medium' | 'large';
}>`
  position: relative;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme, $isText }) => ($isText ? theme.colors.white : theme.colors.background)};
  color: ${({ $color, theme }) => ($color ? theme.colors[$color] : 'initial')};
  border: ${({ theme, $fill, $border }) => $border && $fill !== 'transparent' && `solid 1px ${theme.colors.outerSpace}`};

  border-radius: 3rem;
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease;

  ${({ $fill, $isText, theme }) =>
    $fill !== 'transparent' &&
    css`
      background-color: ${$isText ? theme.colors.alt1 : theme.colors.white};
      box-shadow: 0px 4px 4px ${({ theme }) => theme.hexToRgba(theme.colors.black, 0.2)};
    `};

  ${({ $size }) =>
    $size === 'medium' &&
    css`
      width: 4rem;
      height: 4rem;
    `}
`;

export const StyledM02IconButton = styled.button<{ $isText: boolean; $fill?: 'solid' | 'transparent'; $color?: ColorKey }>`
  ${({ $isText }) =>
    $isText &&
    css`
      display: flex;
      flex-direction: row;
      gap: 1.5rem;
      align-items: center;
      justify-content: center;
    `};

  &:disabled {
    opacity: 0.5;
  }

  @media (hover: hover) {
    &:hover:not([disabled]) {
      ${IconWrapper} {
        ${({ $fill, theme, $isText }) =>
          $fill === 'transparent'
            ? css`
                background-color: ${theme.colors.white};
                box-shadow: 0px 4px 4px ${({ theme }) => theme.hexToRgba(theme.colors.black, 0.5)};
              `
            : css`
                background-color: ${$isText ? theme.colors.white : theme.colors.primary};
                color: ${$isText && theme.colors.alt1};
              `}
      }

      ${Tooltip} {
        opacity: 1;
      }
    }
  }
`;

export const Label = styled(Text)`
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.alt1};
`;
