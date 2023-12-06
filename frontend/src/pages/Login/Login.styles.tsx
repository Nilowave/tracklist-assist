import { GoogleButton } from 'react-google-oauth2';

import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const Login = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 25vh;

  ${({ theme }) => css`
    background: transparent
      linear-gradient(117deg, ${theme.gradients.pink[0]} 0%, ${theme.gradients.pink[0]} 51%, ${theme.gradients.pink[0]} 100%) 0% 0%
      no-repeat padding-box;
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

export const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* gap: 3rem; */
  flex-direction: column;
  text-align: center;
  max-width: 40rem;
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

  margin-bottom: 3rem;

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

export const StyledLink = styled(Link)`
  display: inline-block;
  text-decoration: underline;
  @media (hover: hover) {
    &:hover {
      color: ${({ theme }) => theme.colors.keyLime};
    }
  }
`;
