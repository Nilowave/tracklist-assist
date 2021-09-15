import { motion } from 'framer-motion';
import styled from 'styled-components';
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
    padding: ${({ theme }) => `${theme.sitePaddings.desktop} ${theme.sitePaddings.mobile} ${theme.sitePaddings.mobile}`};
  }
`;

export const Background = styled(motion.div)`
  position: absolute;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.hexToRgba(theme.colors.secondary, 0.7)};
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
`;
