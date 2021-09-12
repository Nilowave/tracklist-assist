import styled from 'styled-components';
import { respondTo } from '../../../styles/helpers/respondTo';
import { MediaQuery } from '../../../styles/mediaQuery';
import { typeStyles } from '../../../styles/typeStyles';

export const Title = styled.h3`
  ${typeStyles.h1};
  padding: ${({ theme }) => theme.sitePaddings.mobile};
  text-transform: capitalize;
  text-align: center;
`;

export const Input = styled.input`
  ${typeStyles.h3};
  font-weight: 700;
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.sitePaddings.mobile};
  border: none;
  outline: none;
  resize: none;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  text-transform: capitalize;
  text-align: center;
  border-bottom: solid 4px ${({ theme }) => theme.hexToRgba(theme.colors.primary, 1)};
  box-shadow: 0 3px 10px ${({ theme }) => theme.colors.primary};
  margin-bottom: 20%;

  &::placeholder {
    color: ${({ theme }) => theme.hexToRgba(theme.colors.secondary, 0.5)};
  }

  @media ${respondTo(MediaQuery.MAX_1023)} {
    margin-bottom: 40%;
  }
`;
