import styled from 'styled-components';
import { respondTo } from '../../../styles/helpers/respondTo';
import { MediaQuery } from '../../../styles/mediaQuery';
import { typeStyles } from '../../../styles/typeStyles';

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  min-width: 6rem;
  height: 6rem;
  border-radius: 6rem;
  background-color: ${({ theme }) => theme.colors.primary};
  border: solid 1px ${({ theme }) => theme.colors.selection};
  position: relative;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
  z-index: 1;

  position: fixed;
  bottom: ${({ theme }) => theme.sitePaddings.desktop};
  right: ${({ theme }) => theme.sitePaddings.desktop};

  @media ${respondTo(MediaQuery.MAX_1023)} {
    padding: 0;
    bottom: ${({ theme }) => theme.sitePaddings.mobile};
    right: ${({ theme }) => theme.sitePaddings.mobile};
  }
`;

export const Label = styled.span`
  ${typeStyles.button}
  margin-left: 3rem;
`;

export const Icon = styled.div`
  width: 6rem;
  height: 6rem;
  position: relative;

  &:after,
  &:before {
    content: '';
    width: 50%;
    height: 0.2rem;
    background-color: ${({ theme }) => theme.colors.black};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:before {
    width: 0.2rem;
    height: 50%;
  }
`;
