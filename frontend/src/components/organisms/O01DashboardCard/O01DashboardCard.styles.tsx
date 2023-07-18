import { motion } from 'framer-motion';
import styled from 'styled-components';
import { typeStyles } from '../../../styles/typeStyles';

export const O01DashboardCard = styled(motion.button)`
  --border-color: ${({ theme }) => theme.hexToRgba(theme.colors.white, 0.2)};
  all: unset;
  cursor: pointer;
  position: relative;
  display: grid;
  width: 20.4rem;
  height: 20.4rem;
  padding: 0.09rem 0.07rem;
  filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25));

  @media (hover: hover) {
    &:hover {
      --border-color: ${({ theme }) => theme.hexToRgba(theme.colors.primary, 0.5)};
    }
  }

  & > div {
    grid-area: 1 / 1;
  }
`;

export const Border = styled.div`
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    border-radius: 2.5rem 2.5rem 3rem 3rem;
    /* --smooth-corners: 8;
    mask-image: paint(smooth-corners);
    -webkit-mask-image: paint(smooth-corners); */
    background-color: var(--border-color);
    transition: background-color 0.3s ease;
  }

  div {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 2.5rem 2.5rem 3rem 3rem;
    overflow: hidden;
    /* --smooth-corners: 8;
    mask-image: paint(smooth-corners);
    -webkit-mask-image: paint(smooth-corners); */

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(129deg, #404457 0%, #282a36 50%);
    }

    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0.1;
      background: linear-gradient(107deg, rgba(255, 255, 255, 0) 0%, #fff 100%);
    }
  }
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.8rem;
  padding: 0.9rem 0.7rem 1.9rem;
`;

export const TitleWrapper = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.09rem;
  align-items: center;
  justify-content: center;
  border-radius: 1.8rem;
  color: ${({ theme }) => theme.colors.background};
  filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25));

  &:before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    border-radius: 2.5rem 2.5rem 3rem 3rem;

    /* --smooth-corners: 9;
    mask-image: paint(smooth-corners);
    -webkit-mask-image: paint(smooth-corners); */
    background: ${({ theme }) => `linear-gradient(110deg, #e8fced 0%, ${theme.colors.secondary} 35%)`};
    transition: background-color 0.3s ease;
    z-index: -1;
  }
`;

export const Title = styled.h3`
  ${typeStyles.h3};
  padding: ${({ theme }) => theme.sitePaddings.mobile};
  text-transform: capitalize;
  text-align: center;
`;

export const Date = styled.p`
  font-style: italic;
`;

export const Count = styled.div`
  ${typeStyles.button};
  position: absolute;
  top: -1rem;
  right: -1rem;
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  border: solid 3px ${({ theme }) => theme.colors.outerSpace};
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.keyLime};
  color: ${({ theme }) => theme.colors.background};
`;
