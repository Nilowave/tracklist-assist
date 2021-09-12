import styled from 'styled-components';
import { respondTo } from '../../../styles/helpers/respondTo';
import { MediaQuery } from '../../../styles/mediaQuery';
import { typeStyles } from '../../../styles/typeStyles';

export const EmptyMessage = styled.div`
  ${typeStyles.h1};
  color: ${({ theme }) => theme.colors.secondary};
  opacity: 0.5;
  width: 80%;
  text-align: center;
  padding: ${({ theme }) => theme.sitePaddings.desktop} 0;

  @media ${respondTo(MediaQuery.MAX_1023)} {
    padding: ${({ theme }) => theme.sitePaddings.mobile} 0;
  }

  p:last-child {
    margin-top: ${({ theme }) => theme.sitePaddings.mobile};
  }
`;
