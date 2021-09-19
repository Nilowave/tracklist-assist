import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { ColorKey } from '../../../styles/theme/default';
import { typeStyles } from '../../../styles/typeStyles';

export type ButtonProps = {
  color?: ColorKey;
  textColor?: ColorKey;
  disable?: boolean;
  size?: 'small' | 'regular';
};

export const StyledButton = styled(motion.button)<ButtonProps>`
  --size: ${({ size }) => (size === 'small' ? '3rem' : '6rem')};

  display: flex;
  flex-shrink: 0;
  align-items: center;
  min-width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-color: ${({ theme, color }) => (color ? theme.colors[color] : theme.colors.white)};
  color: ${({ theme, textColor }) => (textColor ? theme.colors[textColor] : theme.colors.black)};
  border: solid 1px ${({ theme }) => theme.colors.outerSpace};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
  z-index: 1;
  transition: filter 0.3s ease;

  @media (hover: hover) {
    &:hover {
      filter: ${({ color }) => (color === 'white' || !color ? `brightness(0.9)` : `brightness(1.5)`)};
    }
  }

  &:active {
    filter: ${({ color }) => (color === 'white' || !color ? `brightness(0.9)` : `brightness(1.5)`)};
  }

  ${({ size }) =>
    size === 'small' &&
    css`
      min-width: 3rem;
      height: 3rem;
    `};

  ${({ disable, theme }) =>
    disable &&
    css`
      && {
        color: ${theme.hexToRgba(theme.colors.white, 0.5)};
        background-color: ${theme.colors.outerSpace};
        opacity: 0.8;
        pointer-events: none;
      }
    `}
`;

export const Label = styled.span`
  ${typeStyles.button}
  margin-left: calc(var(--size) / 2);
`;

export const Icon = styled.div`
  width: var(--size);
  height: var(--size);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
