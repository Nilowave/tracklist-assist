import styled from 'styled-components';
import { TypeStyleKey, typeStyles } from '../../../styles/typeStyles';

export const Text = styled.p<{ $type: TypeStyleKey }>`
  ${({ $type }) => typeStyles[$type]};
`;
export const Input = styled.textarea<{ $type: TypeStyleKey }>`
  ${({ $type }) => typeStyles[$type]};
  display: inline-block;
  width: 100%;
  text-align: center;
  padding: 0 1.4rem;
  background-color: transparent;
  border: none;
  word-wrap: break-word;
  vertical-align: middle;
  text-overflow: clip;
  resize: none;

  &:focus {
    outline: none;
    /* text-decoration: underline; */
  }
`;
