import styled, { css } from 'styled-components';
import { AdFormat } from './AdUnit.types';
import { Text } from '../Text/Text.styles';

type AdUnitProps = {
  format: AdFormat;
};

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 2rem 0;
`;

export const Caption = styled(Text)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${({ theme }) => theme.hexToRgba(theme.colors.white, 0.5)};
`;

export const AdUnit = styled.div<AdUnitProps>`
  position: relative;
  flex-shrink: 0;
  background-color: rgba(255, 255, 255, 0.1);

  ${(props) =>
    props.format === 'leaderboard' &&
    css`
      width: 320px;
      height: 50px;

      @media (min-width: 1024px) {
        width: 480px;
        height: 90px;
      }

      @media (min-width: 1350px) {
        width: 768px;
        height: 90px;
      }
    `}

  ${(props) =>
    props.format === 'square' &&
    css`
      width: 300px;
      height: 250px;
    `}
`;
