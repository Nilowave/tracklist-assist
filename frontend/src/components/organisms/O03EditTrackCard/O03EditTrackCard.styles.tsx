import styled from 'styled-components';
import { zIndex } from '../../../styles/helpers/zindex';
import { typeStyles } from '../../../styles/typeStyles';
import { Flex } from '../../../styles/ui';
import { A01Icon } from '../../atoms/A01Icon/A01Icon';
import { M01PrimaryButton } from '../../molecules/M01PrimaryButton/M01PrimaryButton';
import { M02IconButton } from '../../molecules/M02IconButton/M02IconButton';

export const StyledO03EditTrackCard = styled(Flex)`
  width: 100%;
  height: 100%;
  padding: 0 ${({ theme }) => theme.sitePaddings.mobile};
  z-index: ${zIndex.modal};
`;

export const Backdrop = styled.button`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.hexToRgba(theme.colors.background, 0.9)};
  backdrop-filter: blur(2px);
`;

export const Number = styled.div`
  ${typeStyles.h2};
  position: absolute;
  opacity: 0.05;
  font-size: 20rem;
  bottom: -5rem;
  right: -1rem;
  pointer-events: none;
`;

export const Card = styled(Flex)`
  position: relative;
  width: 100%;
  max-width: 34rem;
  min-height: 34rem;
  /* aspect-ratio: 1 / 1; */
  color: ${({ theme }) => theme.colors.background};
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 1.8rem;
  padding: 2rem;
  box-shadow:
    5px 5px 0px 0px #6272a4,
    10px 10px 0px 0px #ff79c6,
    15px 15px 0px 0px #fbbc05,
    15px 15px 10px 4px rgba(0, 0, 0, 0.5),
    18px 18px 20px 5px rgba(0, 0, 0, 0.5);
`;

export const SectionTitle = styled.h5`
  ${typeStyles.caption};
`;

export const CloseButton = styled(M02IconButton)`
  position: absolute;
  top: 2rem;
  right: 2rem;
`;

export const ButtonWrapper = styled(Flex)`
  margin-top: 6rem;
`;

export const SaveButton = styled(M01PrimaryButton)`
  min-width: 15rem;
`;

export const ArchiveButton = styled.button`
  ${typeStyles.button};
  text-decoration: underline;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.alt1};
`;

export const EditIcon = styled(A01Icon)<{ $top?: string; $bottom?: string; $right?: string }>`
  position: absolute;
  right: ${({ $right }) => $right || '1rem'};
  top: ${({ $top }) => $top || '0.8rem'};
  bottom: ${({ $bottom }) => $bottom || 'auto'};
  opacity: 0.3;
  transition:
    opacity 0.3s ease,
    color 0.3s ease;
`;

export const NumberType = styled.div`
  height: 100%;
  padding: 0 1rem;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.25);
`;

export const Input = styled.div`
  width: 100%;
  min-height: 3.2rem;
  padding: 0.5rem 1rem;
  padding-right: 3.5rem;
  border-radius: 0.5rem;
  line-height: 1.5;
  background-color: ${({ theme }) => theme.hexToRgba(theme.colors.white, 0.25)};
  transition: background-color 0.3s ease;

  &:focus {
    outline: none;
    background-color: ${({ theme }) => theme.hexToRgba(theme.colors.white, 1)};
  }
`;

export const DateWrapper = styled.div`
  border-radius: 5px;
  padding: 1.2rem;
  width: 50%;
  background-color: transparent;
  background-color: ${({ theme }) => theme.hexToRgba(theme.colors.white, 0.25)};
  transition: background-color 0.3s ease;

  @media (hover: hover) {
    &:hover {
      background-color: ${({ theme }) => theme.hexToRgba(theme.colors.white, 1)};
    }
  }

  &:focus-within {
    background-color: ${({ theme }) => theme.hexToRgba(theme.colors.white, 1)};
    ${EditIcon} {
      opacity: 1;
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const Wrapper = styled.div`
  position: relative;
  &:focus-within {
    ${EditIcon} {
      opacity: 1;
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
