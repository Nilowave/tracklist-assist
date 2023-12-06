import { motion } from 'framer-motion';
import styled from 'styled-components';
import { respondTo } from '../../styles/helpers/respondTo';
import { MediaQuery } from '../../styles/mediaQuery';
import { CardLayout } from '../../components/layout/CardLayout/CardLayout';

export const Dashboard = styled(CardLayout)``;

export const ItemList = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-gap: 3rem;
  flex-wrap: wrap;
  flex-direction: column;
  padding-bottom: 4rem;

  @media ${respondTo(MediaQuery.MIN_1024)} {
    align-items: flex-start;
    flex-direction: row;
  }
`;
