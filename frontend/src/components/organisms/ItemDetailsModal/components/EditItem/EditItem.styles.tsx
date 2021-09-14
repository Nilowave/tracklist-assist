import styled from 'styled-components';
import { respondTo } from '../../../../../styles/helpers/respondTo';
import { MediaQuery } from '../../../../../styles/mediaQuery';
import { typeStyles } from '../../../../../styles/typeStyles';

export const Dates = styled.div`
  display: flex;
  grid-gap: 2rem;
  flex-direction: column;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  grid-gap: 4rem;
`;

export const InputWrapper = styled.div<{ index?: number }>`
  text-align: right;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  grid-gap: 2rem;
  position: relative;

  &:before {
    display: inline-block;
    font-weight: 700;
    content: '${({ index }) => index}';
    font-size: 1.4rem;
    background-color: ${({ theme }) => theme.colors.comment};
    color: ${({ theme }) => theme.colors.black};
    border-radius: 3rem;
    height: 2.5rem;
    width: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: -1rem;
    transition: background-color 0.3s ease;
  }

  &:focus-within {
    &:before {
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }

  @media ${respondTo(MediaQuery.MAX_1023)} {
    &:before {
      height: 1.5rem;
      width: 1.5rem;
      font-size: 1rem;
    }
  }
`;

export const StyledInput = styled.input`
  ${typeStyles.h3}
  font-weight: 700;
  padding: 2rem;
  border-radius: 0.8rem;
  background-color: transparent;
  border: solid 1px ${({ theme }) => theme.colors.comment};
  color: ${({ theme }) => theme.colors.comment};
  max-width: 100%;
  flex: 1;
  margin-left: 5rem;
  text-transform: capitalize;
  text-align: center;
  outline: none;
  transition: color 0.3s ease, border-color 0.3s ease;

  &:focus-visible {
    border: solid 1px ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const StyledDateInput = styled.input`
  padding: 2rem;
  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.black};

  @media ${respondTo(MediaQuery.MAX_1023)} {
    padding: 1rem;
    width: calc(100% - 15rem);
  }
`;
