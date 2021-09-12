import styled from 'styled-components';
import { respondTo } from '../../../styles/helpers/respondTo';
import { MediaQuery } from '../../../styles/mediaQuery';
import { typeStyles } from '../../../styles/typeStyles';

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

export const Heading = styled.h1`
  ${typeStyles.h1};
  text-align: center;
`;

export const ItemList = styled.div`
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
