import styled from 'styled-components';
import { typeStyles } from '../../../styles/typeStyles';

export const StyledSideMenu = styled.nav<{ $isOpen: boolean }>`
  position: fixed;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 3rem;
  top: 0;
  left: 0;
  width: 30rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 2;

  ${({ $isOpen }) => !$isOpen && `transform: translateX(-100%)`};
`;

export type ButtonProps = {
  $variant?: 'dark' | 'light';
};

export const StyledUserButton = styled.button<ButtonProps>`
  display: flex;
  gap: 1rem;
  align-items: center;
  top: 3rem;
  left: 3rem;
  color: ${({ theme, $variant }) => ($variant === 'dark' ? theme.colors.outerSpace : theme.colors.white)};
  font-style: italic;
  font-weight: 600;
  position: fixed;
  z-index: 2;
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

export const NavList = styled.ul`
  margin-top: 6rem;
  border-top: solid 1px ${({ theme }) => theme.colors.primary};
  padding-top: 5rem;
  display: flex;
  gap: 2rem;
  flex-direction: column;
  list-style: none;
`;

export const NavItem = styled.li<{ isActive?: boolean }>`
  ${typeStyles.menu};
  transition: color 0.4s ease-out;

  ${({ isActive, theme }) => isActive && `color: ${theme.colors.primary}`};

  @media (hover: hover) {
    &:hover {
      ${({ isActive, theme }) => !isActive && `color: ${theme.colors.cerulean}`}
    }
  }
`;

export const LogoutButton = styled.button`
  text-decoration: underline;
  align-self: flex-end;

  @media (hover: hover) {
    &:hover {
      ${({ theme }) => `color: ${theme.colors.cerulean}`}
    }
  }
`;
