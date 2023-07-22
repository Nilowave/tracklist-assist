import styled, { css } from 'styled-components';
import { typeStyles } from '../../../styles/typeStyles';

export const Tooltip = styled.div`
  position: absolute;
  top: 50%;
  padding: 0.2rem 1rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.background};
  right: calc(100% + 1rem);
  transform: translateY(-50%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    height: 2px;
    width: 5px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 0 2px 2px 0;
    transform: translate(5px, -50%);
  }
`;

export const IconWrapper = styled.div<{ $isText: boolean }>`
  position: relative;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${({ theme, $isText }) => ($isText ? theme.colors.alt1 : theme.colors.white)};
  color: ${({ theme, $isText }) => ($isText ? theme.colors.white : theme.colors.background)};
  border-radius: 3rem;
  box-shadow: 0px 4px 4px ${({ theme }) => theme.colors.black};
  transition: background-color 0.3s ease;
`;

export const StyledM02iconbutton = styled.button<{ $isText: boolean }>`
  ${({ $isText }) =>
    $isText &&
    css`
      display: flex;
      flex-direction: row;
      gap: 1.5rem;
      align-items: center;
      justify-content: center;
    `};

  @media (hover: hover) {
    &:hover {
      ${IconWrapper} {
        background-color: ${({ theme, $isText }) => ($isText ? theme.colors.white : theme.colors.primary)};
        color: ${({ theme, $isText }) => $isText && theme.colors.alt1};
      }

      ${Tooltip} {
        opacity: 1;
      }
    }
  }
`;

export const Text = styled.span`
  ${typeStyles.button};
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.alt1};
`;
