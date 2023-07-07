import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { respondTo } from '../../../styles/helpers/respondTo';
import { MediaQuery } from '../../../styles/mediaQuery';
import { Button } from '../../atoms/Button/Button';

export const Wrapper = styled.div`
  display: flex;
  padding: ${({ theme }) => `${theme.sitePaddings.desktop}`};
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 5;

  color: ${({ theme }) => theme.colors.black};

  @media ${respondTo(MediaQuery.MAX_1023)} {
    padding: ${({ theme }) => `8rem ${theme.sitePaddings.mobile} ${theme.sitePaddings.mobile}`};
  }
`;

export const Background = styled(motion.div)`
  position: absolute;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: ${({ theme }) => theme.colors.secondary};
    opacity: 0.7;

    /* ${({ theme }) =>
      css`
        background: transparent
          linear-gradient(117deg, ${theme.colors.cerulean} 0%, ${theme.colors.secondary} 51%, ${theme.colors.primary} 100%) 0% 0% no-repeat
          padding-box;
      `} */
  }
`;

export const CloseButton = styled(Button)`
  position: absolute;
  top: 4rem;
  right: ${({ theme }) => theme.sitePaddings.desktop};

  @media ${respondTo(MediaQuery.MAX_1023)} {
    top: ${({ theme }) => theme.sitePaddings.mobile};
    right: ${({ theme }) => theme.sitePaddings.mobile};
  }
`;

export const Content = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  pointer-events: none;

  & > * {
    pointer-events: all;
  }
`;
