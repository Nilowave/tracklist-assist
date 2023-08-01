import { motion } from 'framer-motion';
import styled from 'styled-components';
import { typeStyles } from '../../../styles/typeStyles';
import { Flex, smoothCorners } from '../../../styles/ui';
import { A03Text } from '../../atoms/A03Text/A03Text';
import { M02IconButton } from '../../molecules/M02IconButton/M02IconButton';

export const ExpandButton = styled(M02IconButton)`
  align-self: flex-end;
  margin-right: 0.7rem;
  margin-top: 0.3rem;
  opacity: 0;
  transition: opacity 0.2s ease;
`;

export const O01DashboardCard = styled(motion.div)`
  position: relative;

  &:hover {
    ${ExpandButton} {
      opacity: 0.8;
    }
  }
`;

export const CardButton = styled.button<{ $isExpanded?: boolean }>`
  --border-color: ${({ theme }) => theme.hexToRgba(theme.colors.white, 0.2)};
  all: unset;
  cursor: pointer;
  position: relative;
  display: grid;
  width: ${({ $isExpanded }) => ($isExpanded ? '31.8rem' : '20.4rem')};
  height: ${({ $isExpanded }) => ($isExpanded ? 'auto' : '20.4rem')};
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
    background-color: var(--border-color);
    transition: background-color 0.3s ease;

    ${smoothCorners(8)};
  }

  & > div {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 2.5rem 2.5rem 3rem 3rem;
    overflow: hidden;
    ${smoothCorners(8)};

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

export const Content = styled(Flex)<{ $isExpanded: boolean }>`
  position: relative;
  padding-inline: ${({ $isExpanded }) => ($isExpanded ? '1rem' : '0.7rem')};
  padding-block: ${({ $isExpanded }) => ($isExpanded ? '1.5rem 2.4rem' : '0.9rem 1.9rem')};
`;

export const TitleWrapper = styled.div<{ $isExpanded?: boolean }>`
  flex: 1;
  width: 100%;
  min-height: ${({ $isExpanded }) => ($isExpanded ? '10rem' : 'auto')};
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
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
    background: ${({ theme }) => `linear-gradient(110deg, #e8fced 0%, ${theme.colors.secondary} 35%)`};
    transition: background-color 0.3s ease;
    z-index: -1;
    ${smoothCorners(9)};
  }
`;

export const Title = styled(A03Text)`
  padding: 1.4rem;
  text-transform: capitalize;
  text-align: center;
  max-height: 7rem;
  width: 100%;

  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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

export const InteractiveOverlay = styled(Content)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  & > * {
    pointer-events: all;
  }
`;

export const DetailsWrapper = styled(Flex)`
  width: 100%;
  padding-inline: 1.6rem;
`;

export const FooterWrapper = styled(Flex)`
  width: 100%;
  min-height: 3rem;
  padding-inline: 1.5rem;
  pointer-events: none;

  & > * {
    pointer-events: all;
  }
`;
