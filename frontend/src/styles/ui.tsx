import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';
import styled, { css } from 'styled-components';

type FlexProps = {
  $row?: boolean;
  $gap?: string;
  $align?: 'center' | 'flex-start' | 'flex-end';
  $justify?: 'space-between' | 'flex-start' | 'flex-end' | 'center';
};

export const smoothCorners = (radius: number) => css`
  --smooth-corners: ${radius};
  mask-image: paint(smooth-corners);
  -webkit-mask-image: paint(smooth-corners);
`;

export const DotGrid = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  background-image: radial-gradient(${({ theme }) => theme.hexToRgba(theme.colors.primary, 0.2)} 1px, transparent 0);
  background-size: 40px 40px;
  background-position: -19px -19px;
  pointer-events: none;
  z-index: -1;
`;

export const Flex = styled.div<FlexProps>`
  display: flex;

  ${(props) =>
    props.$align &&
    css`
      align-items: ${props.$align};
    `};

  ${(props) =>
    props.$justify &&
    css`
      justify-content: ${props.$justify};
    `};

  ${(props) =>
    props.$gap &&
    css`
      gap: ${props.$gap};
    `};

  ${(props) =>
    props.$row
      ? css`
          flex-direction: row;
        `
      : css`
          flex-direction: column;
        `};
`;

export const LightTooltip = styled(({ className, ...props }: TooltipProps) => <Tooltip {...props} classes={{ popper: className }} />)(
  ({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  })
);
