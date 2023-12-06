import styled from 'styled-components';
import { Flex } from '../../../../../styles/ui';
import { typeStyles } from '../../../../../styles/typeStyles';
import { Input, Wrapper } from '../../O03EditTrackCard.styles';

export const StyledValueInput = styled(Flex)``;

export const FieldInput = styled(Input)`
  border-radius: 0 0.5rem 0.5rem 0;
`;

export const TypeWrapper = styled.div`
  padding: 0.3rem 1rem;
  padding-right: 0;
  border-radius: 0.5rem 0 0 0.5rem;
  line-height: 1.5;
  background-color: ${({ theme }) => theme.hexToRgba(theme.colors.white, 0.25)};
  transition: background-color 0.3s ease;
`;

export const TypeField = styled.button`
  ${typeStyles.smallTitle};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.hexToRgba(theme.colors.white, 0.5)};
  padding: 0.5rem 1rem;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
  border: solid 1px ${({ theme }) => theme.hexToRgba(theme.colors.alt1, 0.5)};
`;

export const InputWrapper = styled(Flex)`
  width: 100%;
  min-height: 3.2rem;
  border-radius: 0.5rem;
  line-height: 1.5;

  &:focus-within {
    ${FieldInput} {
      background-color: ${({ theme }) => theme.hexToRgba(theme.colors.white, 1)};
    }
    ${TypeWrapper} {
      background-color: ${({ theme }) => theme.hexToRgba(theme.colors.white, 1)};
    }
    ${TypeField} {
      background-color: ${({ theme }) => theme.hexToRgba(theme.colors.white, 1)};
      border: solid 1px ${({ theme }) => theme.hexToRgba(theme.colors.alt1, 1)};
    }
  }
`;

export const FieldWrapper = styled(Wrapper)`
  flex: 1;
`;
