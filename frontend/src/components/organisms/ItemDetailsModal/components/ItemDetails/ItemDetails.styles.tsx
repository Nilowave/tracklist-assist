import styled from 'styled-components';

export const Wrapper = styled.div``;

export const Diff = styled.p`
  font-size: 1rem;
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  grid-gap: 0.5rem;

  &:after,
  &:before {
    content: '';
    background-color: ${({ theme }) => theme.colors.comment};
    width: 1px;
    height: 1rem;
    margin-right: 2rem;
  }
`;
