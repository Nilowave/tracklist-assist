import styled from 'styled-components';
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
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.sitePaddings.mobile};
  border-radius: 0.8rem;
  border: solid 1px ${({ theme }) => theme.colors.primary};
  outline: none;
  resize: none;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  text-transform: capitalize;
  text-align: center;
  border-bottom: solid 4px ${({ theme }) => theme.hexToRgba(theme.colors.primary, 1)};
  box-shadow: 0 3px 10px ${({ theme }) => theme.colors.primary};
  margin-bottom: 2rem;
  transition: color 0.3s ease;

  &::placeholder {
    color: ${({ theme }) => theme.hexToRgba(theme.colors.secondary, 0.5)};
  }

  &:focus-visible {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Error = styled.div`
  ${typeStyles.bold};
  color: ${({ theme }) => theme.colors.red};
  display: inline;
  text-shadow: 0 3px 5px ${({ theme }) => theme.colors.background};
`;

export const Wrapper = styled.div`
  flex: 1;
`;

export const StyledForm = styled.form`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;
