import styled from 'styled-components';
import { typeStyles } from '../../../styles/typeStyles';
import { Flex, smoothCorners } from '../../../styles/ui';
import { A01Icon } from '../../atoms/A01Icon/A01Icon';

export const StyledM03SearchInput = styled.div`
  position: relative;
`;

export const SearchWrapper = styled(Flex)`
  position: absolute;
  right: -1rem;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 1.4rem;
  padding: 1rem 1.6rem;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 4px 4px 0px rgba(0, 0, 0, 0.4);

  /* ${smoothCorners(16)}; */
`;

export const SearchInput = styled.input`
  ${typeStyles.h3};
  color: ${({ theme }) => theme.colors.alt1};
  text-transform: capitalize;

  &:focus {
    outline: 0;
  }

  &::placeholder {
    color: ${({ theme }) => theme.hexToRgba(theme.colors.alt1, 0.3)};
  }
`;

export const SearchIcon = styled(A01Icon)`
  color: ${({ theme }) => theme.colors.primary};
`;
