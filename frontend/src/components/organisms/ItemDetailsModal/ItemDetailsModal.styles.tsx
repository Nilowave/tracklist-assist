import { motion } from 'framer-motion';
import styled from 'styled-components';
import { respondTo } from '../../../styles/helpers/respondTo';
import { MediaQuery } from '../../../styles/mediaQuery';
import { typeStyles } from '../../../styles/typeStyles';
import { Date } from '../Item/Item.styles';

export const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-height: 100%;
  height: 100%;
  grid-gap: 3rem;
`;

export const Title = styled.h3`
  ${typeStyles.h1};

  text-transform: capitalize;
  text-align: center;
`;

export const SubTitle = styled(motion.p)`
  ${typeStyles.h3};
  text-transform: capitalize;
  max-width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media ${respondTo(MediaQuery.MAX_1023)} {
    font-size: 2.4rem;
    min-width: 100%;
  }
`;

export const Card = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 70rem;
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

export const Detail = styled(motion.div)<{ align?: string }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: ${({ align }) => (align ? align : 'center')};
  position: relative;

  @media ${respondTo(MediaQuery.MAX_1023)} {
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: flex-end;
    grid-gap: 2rem;
  }
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

export const Menu = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  max-width: 70rem;
`;
