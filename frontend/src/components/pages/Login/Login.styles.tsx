import { GoogleButton } from 'react-google-oauth2';
import styled, { css } from 'styled-components';

export const Login = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 25vh;

  ${({ theme }) =>
    css`
      background: transparent
        linear-gradient(117deg, ${theme.colors.cerulean} 0%, ${theme.colors.secondary} 51%, ${theme.colors.primary} 100%) 0% 0% no-repeat
        padding-box;
    `}
`;

export const LogoWrapper = styled.div`
  width: 100%;
  text-align: center;

  svg {
    width: 70%;
  }

  p {
    margin-top: 5%;
    font-size: 2rem;
  }
`;

export const StyledGoogleButton = styled(GoogleButton)`
  display: flex;
  gap: 2rem;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.vistaBlue};
  justify-content: center;
  align-items: center;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  padding-right: 2rem;
  border-radius: 0.3rem;
  transition: filter 0.3s ease;

  svg {
    width: 5rem;
    height: 5rem;
  }

  @media (hover: hover) {
    &:hover {
      filter: brightness(1.1);
    }
  }
`;
