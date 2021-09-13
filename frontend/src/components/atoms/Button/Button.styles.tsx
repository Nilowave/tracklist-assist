import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { ColorKey } from '../../../styles/theme/default';
import { typeStyles } from '../../../styles/typeStyles';

export type ButtonProps = {
  color?: ColorKey;
  textColor?: ColorKey;
  disable?: boolean;
};

export const StyledButton = styled(motion.button)<ButtonProps>`
  display: flex;
  align-items: center;
  min-width: 6rem;
  height: 6rem;
  border-radius: 6rem;
  background-color: ${({ theme, color }) => (color ? theme.colors[color] : theme.colors.white)};
  border: solid 1px ${({ theme }) => theme.colors.selection};
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

  ${({ disable, theme }) =>
    disable &&
    css`
      && {
        color: ${theme.hexToRgba(theme.colors.white, 0.5)};
        background-color: ${theme.colors.selection};
        opacity: 0.8;
        pointer-events: none;
      }
    `}
`;

export const Label = styled.span`
  ${typeStyles.button}
  margin-left: 3rem;
`;

export const Icon = styled.div`
  width: 6rem;
  height: 6rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
