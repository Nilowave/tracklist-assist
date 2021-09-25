import styled from 'styled-components';

export type ButtonProps = {
  $variant?: 'dark' | 'light';
};

export const StyledLogoutButton = styled.button<ButtonProps>`
  display: flex;
  gap: 1rem;
  align-items: center;
  top: 0;
  right: 0;
  color: ${({ theme, $variant }) => ($variant === 'dark' ? theme.colors.outerSpace : theme.colors.white)};
  font-style: italic;
  font-weight: 600;
  position: relative;
  z-index: 1;
  transition: color 0.5s ease;

  @media (hover: hover) {
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Photo = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
`;
