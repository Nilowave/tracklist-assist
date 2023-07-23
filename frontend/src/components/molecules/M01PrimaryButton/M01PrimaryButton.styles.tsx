import styled, { css } from 'styled-components';

export const StyledM01PrimaryButton = styled.button<{ hasIcon: boolean }>`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem 4rem;
  border-radius: 4rem
  box-shadow: 0 4px 4px ${({ theme }) => theme.hexToRgba(theme.colors.black, 0.25)};

  ${({ hasIcon }) =>
    hasIcon &&
    css`
      padding: 2rem 1.5rem 2rem 3rem;
    `};
`;

export const Text = styled.span``;
