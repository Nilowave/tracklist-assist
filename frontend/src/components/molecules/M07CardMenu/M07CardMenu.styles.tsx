import { Menu, MenuProps } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import styled, { css } from 'styled-components';

import { ColorKey } from '../../../styles/theme/default';
import { M02IconButton } from '../M02IconButton/M02IconButton';

export const MenuButton = styled(M02IconButton)``;

export const StyledItem = styled(MenuItem)<{ $color?: ColorKey }>`
  display: flex;
  gap: 1rem;

  ${({ $color, theme }) =>
    $color &&
    css`
      color: ${theme.colors[$color]};
    `}
`;

export const StyledM07CardMenu = styled.div``;

export const StyledMenu = styled((props: MenuProps) => <Menu {...props} />)(() => ({
  '& .MuiPaper-root': {
    borderRadius: '15px',
  },
}));
