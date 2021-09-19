import { motion } from 'framer-motion';
import styled from 'styled-components';
import { respondTo } from '../../../styles/helpers/respondTo';
import { MediaQuery } from '../../../styles/mediaQuery';
import { typeStyles } from '../../../styles/typeStyles';
import { Button } from '../../atoms/Button/Button';

export const Home = styled.section`
  padding: ${({ theme }) => theme.sitePaddings.desktop};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media ${respondTo(MediaQuery.MAX_1023)} {
    padding: ${({ theme }) => theme.sitePaddings.mobile};
  }
`;

export const Content = styled(motion.div)<{ $blur?: boolean }>`
  ${({ $blur }) => $blur && `filter: blur(1rem)`};
`;

export const Heading = styled.h1`
  ${typeStyles.h1};
  text-align: center;
  pointer-events: none;
  z-index: 2;
  position: relative;

  svg {
    max-width: 70%;

    @media ${respondTo(MediaQuery.MIN_1024)} {
      max-width: 30rem;
    }
  }
`;

export const ItemList = styled(motion.div)`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-gap: 3rem;
  flex-wrap: wrap;
  flex-direction: column;
  padding-bottom: 4rem;

  @media ${respondTo(MediaQuery.MIN_1024)} {
    margin-top: 8rem;
    flex-direction: row;
  }
`;

export const AddButton = styled(Button)`
  position: fixed;
  bottom: ${({ theme }) => theme.sitePaddings.desktop};
  right: ${({ theme }) => theme.sitePaddings.desktop};

  @media ${respondTo(MediaQuery.MAX_1023)} {
    padding: 0;
    bottom: ${({ theme }) => theme.sitePaddings.mobile};
    right: ${({ theme }) => theme.sitePaddings.mobile};
  }
`;

export const Header = styled.div<{ isHidden?: boolean }>`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 3rem 3rem 0;
  display: flex;
  justify-content: flex-end;
  transition: opacity 0.3s ease;

  ${({ isHidden }) => isHidden && 'opacity: 0; pointer-events: none'};
`;
