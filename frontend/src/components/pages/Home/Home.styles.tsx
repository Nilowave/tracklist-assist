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
`;

export const ItemList = styled(motion.div)`
  margin-top: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-gap: 3rem;
  flex-wrap: wrap;

  @media ${respondTo(MediaQuery.MAX_1023)} {
    flex-direction: column;
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
