import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import { MouseEvent, ReactElement, useState } from 'react';
import * as S from './M07CardMenu.styles';
import { useDeviceState } from '../../../hooks/useDeviceState';
import { A01Icon } from '../../atoms/A01Icon/A01Icon';

interface M07CardMenuProps {
  className?: string;
  isExpanded: boolean;
  onEdit: () => void;
  onExpand: () => void;
  onDelete: () => void;
  onArchive: () => void;
}

export const M07CardMenu = ({ className, isExpanded, onEdit, onExpand, onArchive, onDelete }: M07CardMenuProps): ReactElement => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { isMobile } = useDeviceState();

  const open = Boolean(anchorEl);

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit();
    onClose();
  };
  const handleExpand = () => {
    onExpand();
    onClose();
  };
  const handleArchive = () => {
    onArchive();
    onClose();
  };
  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <S.StyledM07CardMenu className={className}>
      <S.MenuButton icon="more" tooltip="More" fill="transparent" onClick={onClick} />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuList dense>
          {!isMobile && (
            <S.StyledItem onClick={handleExpand}>
              <A01Icon name={isExpanded ? 'minimize' : 'maximize'} size={20} />
              {isExpanded ? 'Minimize' : 'Maximize'}
            </S.StyledItem>
          )}
          <S.StyledItem onClick={handleEdit}>
            <A01Icon name="edit" size={20} />
            Rename
          </S.StyledItem>
          <S.StyledItem onClick={handleArchive}>
            <A01Icon name="archive" size={18} />
            Archive
          </S.StyledItem>
          <Divider />
          <S.StyledItem $color="red" onClick={handleDelete}>
            Delete
          </S.StyledItem>
        </MenuList>
      </Menu>
    </S.StyledM07CardMenu>
  );
};
