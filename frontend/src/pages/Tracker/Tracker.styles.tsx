import styled from 'styled-components';
import { CardLayout } from '../../components/layout/CardLayout/CardLayout';
import { Flex } from '../../styles/ui';
import { Text } from '../../components/atoms/A03Text/A03Text.styles';

export const StyledTracker = styled(CardLayout)``;

export const Metrics = styled(Flex)`
  position: fixed;
`;

export const Title = styled(Text)`
  margin-top: 2rem;
`;

export const GridList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1.8rem;
  padding-top: 30rem;
`;

export const ListItem = styled.li`
  /* min-height: 20.4rem; */
  display: contents;
`;
