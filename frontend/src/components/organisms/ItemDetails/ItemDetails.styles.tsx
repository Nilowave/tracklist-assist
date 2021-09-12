import styled from 'styled-components';
import { respondTo } from '../../../styles/helpers/respondTo';
import { MediaQuery } from '../../../styles/mediaQuery';
import { typeStyles } from '../../../styles/typeStyles';
import { Date } from '../Item/Item.styles';

export const Modal = styled.div`
  display: flex;
  padding: ${({ theme }) => `${theme.sitePaddings.desktop}`};
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 5;
  background-color: ${({ theme }) => theme.hexToRgba(theme.colors.secondary, 0.9)};
  color: ${({ theme }) => theme.colors.black};

  @media ${respondTo(MediaQuery.MAX_1023)} {
    padding: ${({ theme }) => `${theme.sitePaddings.desktop} ${theme.sitePaddings.mobile}`};
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-height: 100%;
`;

export const Title = styled.h3`
  ${typeStyles.h1};
  padding: 0 0 ${({ theme }) => theme.sitePaddings.mobile};
  text-transform: capitalize;
  text-align: center;
`;

export const SubTitle = styled.p`
  ${typeStyles.h3};
  text-transform: capitalize;
  max-width: 50%;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 50rem;
  flex: 1;
  border: solid 1px ${({ theme }) => theme.colors.primary};
  border-radius: 0.8rem;
  box-shadow: 0 3px 6px ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.white};
  position: relative;
  grid-gap: 4rem;
  padding: ${({ theme }) => theme.sitePaddings.mobile};
  overflow: hidden;
  overflow-y: auto;
`;

export const Detail = styled.div<{ align?: string }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: ${({ align }) => (align ? align : 'center')};
`;

export const StyledDate = styled(Date)<{ variant?: boolean }>`
  padding: 1rem 1.5rem;
  border-radius: 2rem;
  background-color: ${({ theme, variant }) => (variant ? theme.colors.secondary : theme.colors.primary)};
  color: ${({ theme }) => theme.colors.black};
  white-space: nowrap;
`;

export const HistoryDate = styled(Date)<{ index: number }>`
  text-align: right;
  color: ${({ theme }) => theme.colors.secondary};
  line-height: 2;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;

  &:before {
    display: inline-block;
    font-weight: 700;
    content: '${({ index }) => index}';
    font-size: 1rem;
    background-color: ${({ theme }) => theme.colors.comment};
    color: ${({ theme }) => theme.colors.black};
    border-radius: 3rem;
    height: 1.5rem;
    width: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 1rem;
  }
`;

export const StyledHistory = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

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
