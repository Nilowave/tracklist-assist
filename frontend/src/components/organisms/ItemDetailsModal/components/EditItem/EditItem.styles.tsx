import { motion } from 'framer-motion';
import styled from 'styled-components';
import { respondTo } from '../../../../../styles/helpers/respondTo';
import { MediaQuery } from '../../../../../styles/mediaQuery';
import { typeStyles } from '../../../../../styles/typeStyles';
import { SubTitle } from '../../ItemDetailsModal.styles';

export const Dates = styled(motion.div)`
  display: flex;
  grid-gap: 2rem;
  flex-direction: column;
  width: 100%;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  grid-gap: 4rem;
  position: relative;
`;

export const InputWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 1rem;
`;

export const StyledNumber = styled.p`
  font-weight: 700;
  font-size: 1.4rem;
  background-color: ${({ theme }) => theme.colors.blueGray};
  color: ${({ theme }) => theme.colors.black};
  border-radius: 3rem;
  height: 2.5rem;
  width: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background-color 0.3s ease;

  @media ${respondTo(MediaQuery.MAX_1023)} {
    height: 1.5rem;
    width: 1.5rem;
    font-size: 1rem;
  }
`;

export const StyledInput = styled.input`
  ${typeStyles.h3}
  font-weight: 700;
  padding: 2rem;
  border-radius: 0.8rem;
  background-color: transparent;
  border: solid 1px ${({ theme }) => theme.colors.blueGray};
  color: ${({ theme }) => theme.colors.blueGray};
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
  min-width: 0;
  text-align: center;

  @media ${respondTo(MediaQuery.MAX_1023)} {
    padding: 1rem;
  }
`;

export const HistoryTitle = styled(SubTitle)`
  position: sticky;
  align-self: flex-start;
  top: 0;
  z-index: 2;
  background-color: ${({ theme }) => theme.colors.background};

  &:before {
    content: '';
    background-color: ${({ theme }) => theme.colors.background};
    width: calc(100% + 6rem);
    left: -3rem;
    height: calc(100% + 5rem);
    top: -3rem;
    position: absolute;
    z-index: -1;
  }

  @media ${respondTo(MediaQuery.MIN_1024)} {
    &:before {
      background-color: transparent;
    }
  }
`;
