import { GoogleButton } from 'react-google-oauth2';
import styled from 'styled-components';

export const Login = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const StyledGoogleButton = styled(GoogleButton)`
  display: flex;
  gap: 2rem;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.selection};
  justify-content: center;
  align-items: center;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
  padding-right: 2rem;
  border-radius: 0.3rem;
  transition: filter 0.3s ease;

  svg {
    width: 5rem;
    height: 5rem;
  }

  @media (hover: hover) {
    &:hover {
      filter: brightness(1.2);
    }
  }
`;
