import styled, { css } from 'styled-components';

type FlexProps = {
  row?: boolean;
  gap?: string;
  align?: 'center' | 'start' | 'end';
  justify?: 'space-between' | 'start' | 'end';
};

export const Flex = styled.div<FlexProps>`
  display: flex;

  ${(props) =>
    props.align &&
    css`
      align-items: ${props.align};
    `};

  ${(props) =>
    props.justify &&
    css`
      justify-content: ${props.justify};
    `};

  ${(props) =>
    props.gap &&
    css`
      gap: ${props.gap};
    `};

  ${(props) =>
    props.row
      ? css`
          flex-direction: row;
        `
      : css`
          flex-direction: column;
        `};
`;
