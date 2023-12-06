import styled, { css } from 'styled-components';
import { respondTo } from '../../../styles/helpers/respondTo';
import { MediaQuery } from '../../../styles/mediaQuery';
import { typeStyles } from '../../../styles/typeStyles';

export const StyledSideMenu = styled.nav<{ $isOpen: boolean }>`
  position: fixed;
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.sitePaddings.mobile};
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

  @media ${respondTo(MediaQuery.MIN_1024)} {
    padding: 3rem;
  }
`;

export type ButtonProps = {
  $variant?: 'dark' | 'light';
};

export const StyledUserButton = styled.button<ButtonProps>`
  display: flex;
  gap: 1rem;
  align-items: center;
  top: ${({ theme }) => theme.sitePaddings.mobile};
  left: ${({ theme }) => theme.sitePaddings.mobile};
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

  @media ${respondTo(MediaQuery.MIN_1024)} {
    top: 3rem;
    left: 3rem;
  }
`;

export const Photo = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
`;

export const NavList = styled.ul`
  margin-top: 4.5rem;
  border-top: solid 1px ${({ theme }) => theme.colors.primary};
  padding-top: 3rem;
  display: flex;
  gap: 2rem;
  flex-direction: column;
  list-style: none;

  @media ${respondTo(MediaQuery.MIN_1024)} {
    margin-top: 6rem;
    padding-top: 5rem;
  }
`;

export const NavItem = styled.li<{ isActive?: boolean; isRainbow?: boolean }>`
  ${typeStyles.menu};
  transition: color 0.4s ease-out;

  ${({ isActive, theme }) => isActive && `color: ${theme.colors.primary}`};

  ${({ isRainbow }) =>
    isRainbow &&
    css`
      font-style: italic;
      font-size: 1.1em;
      background: linear-gradient(to right, #ef5350, #f48fb1, #7e57c2, #2196f3, #26c6da, #43a047, #eeff41, #f9a825, #ff5722);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    `}

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
