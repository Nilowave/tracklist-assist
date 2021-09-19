import styled from 'styled-components';

export const StyledLogoutButton = styled.button`
  display: flex;
  gap: 1rem;
  align-items: center;
  top: 0;
  right: 0;
  color: ${({ theme }) => theme.colors.white};

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
