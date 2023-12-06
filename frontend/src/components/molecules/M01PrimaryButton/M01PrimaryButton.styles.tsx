import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

import { StyledButtonProps } from './M01PrimaryButton';
import { typeStyles } from '../../../styles/typeStyles';
import { getContrastingTextColor } from '../../../utils/getContrastingTextColor';

type ButtonProps = Omit<StyledButtonProps, 'animate'>;

export const StyledButton = styled(motion.button)<ButtonProps>`
  --size: ${({ size }) => (size === 'small' ? '3rem' : size === 'medium' ? '4rem' : '6rem')};

  display: flex;
  gap: 1rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  min-width: var(--size);
  height: var(--size);
  padding-inline-start: ${({ text }) => (text ? 'calc(var(--size) / 2)' : 'calc(var(--size) / 4)')};
  padding-inline-end: ${({ icon }) => (icon ? `calc(var(--size) / 4)` : `calc(var(--size) / 2)`)};
  border-radius: var(--size);
  background-color: ${({ theme, color }) => (color ? theme.colors[color] : theme.colors.white)};
  color: ${({ theme, textColor, color }) =>
    textColor ? theme.colors[textColor] : getContrastingTextColor(theme.colors[color || 'white'] as string)};
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
  ${typeStyles.button};
`;

export const Icon = styled.div`
  width: var(--size);
  height: var(--size);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
