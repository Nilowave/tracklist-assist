import styled from 'styled-components';
import { TypeStyleKey, typeStyles } from '../../../styles/typeStyles';

export const Text = styled.p<{ type: TypeStyleKey }>`
  ${({ type }) => typeStyles[type]};
`;
