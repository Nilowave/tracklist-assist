import styled from 'styled-components';

export const A02Counter = styled.div`
  box-sizing: border-box;
  padding: 0.4rem 0.8rem;
  min-width: 3.2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.alt1};
  border: solid 1px ${({ theme }) => theme.hexToRgba(theme.colors.white, 0.1)};
  background-color: ${({ theme }) => theme.hexToRgba(theme.colors.background, 0.5)};
  border-radius: 0.8rem;
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
`;
