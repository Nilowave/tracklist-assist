import styled from 'styled-components';
import { respondTo } from '../../../styles/helpers/respondTo';
import { MediaQuery } from '../../../styles/mediaQuery';
import { typeStyles } from '../../../styles/typeStyles';
import { Flex } from '../../../styles/ui';
import { Text } from '../../atoms/A03Text/A03Text.styles';
import { O03EditTrackCard } from '../O03EditTrackCard/O03EditTrackCard';

export const StyledO02TrackCard = styled.div<{ $isEditing?: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  max-width: 20.4rem;
  z-index: ${({ $isEditing }) => $isEditing && 2};
`;

export const CardButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  position: relative;
  padding: 1rem 1.2rem;
  border-radius: 1.8rem;
  border: 1px solid rgba(0, 0, 0, 0.3);
  background: ${({ theme }) =>
    `linear-gradient(156deg, ${theme.hexToHSLA(theme.colors.secondary, 1, 0.6)} 0%, ${theme.colors.secondary} 100%)`};

  @media ${respondTo(MediaQuery.MIN_1024)} {
    padding: 1.2rem 1.6rem;
    /* width: 20.4rem; */
    /* height: 20.4rem; */
  }
`;

export const DateGrid = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-template-areas:
    'date month'
    'date year';
  justify-items: start;
  align-items: center;
  column-gap: 0.5rem;
  color: ${({ theme }) => theme.colors.background};
`;

export const Date = styled.div`
  grid-area: date;
  font-size: 3.2rem;
  font-weight: 800;
`;
export const Month = styled.div`
  grid-area: month;
  font-size: 1.4rem;
  font-weight: 700;
  text-transform: uppercase;
`;
export const Year = styled.div`
  grid-area: year;
  font-size: 1.2rem;
  font-weight: 200;
  margin-top: -10px;
`;
export const Time = styled.div`
  grid-area: year;
  font-size: 1rem;
  font-style: italic;
  text-align: left;
  font-weight: 100;
  width: 70%;
  font-variation-settings: 'slnt' 8;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const Delta = styled(Flex)`
  position: relative;
  font-size: 1.1rem;
  font-weight: 400;
  padding: 0.3rem 0.5rem;
  border-radius: 1rem;
  background: linear-gradient(90deg, white 30%, rgba(255, 255, 255, 0));
  width: 100%;
  text-align: left;
`;

export const EditTrackCard = styled(O03EditTrackCard)`
  position: fixed;
  top: 0;
  left: 0;
`;

export const Number = styled.div`
  ${typeStyles.h2};
  position: absolute;
  opacity: 0.05;
  font-size: 10rem;
  bottom: -3rem;
  right: 0rem;
`;

export const NotesWrapper = styled(Flex)`
  /* position: relative; */
  padding: 0.6rem 0.8rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  text-align: left;
`;

export const NotesText = styled(Text)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
