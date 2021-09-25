import type { ReactElement } from 'react';
import * as S from './LogoutButton.styles';

export type UserData = {
  email: string;
  name: string;
  photo: string;
  error?: string;
};
interface LogoutButtonProps {
  user: UserData;
  onClick: () => void;
  variant?: 'dark' | 'light';
}

export const LogoutButton = ({ user, onClick, variant }: LogoutButtonProps): ReactElement => {
  const username = `${user.email.split('@')[0]}`;

  return (
    <S.StyledLogoutButton onClick={() => onClick()} $variant={variant} type="button">
      <S.Photo src={user.photo} alt={`Profile ${user.name}`} />
      <span>{username}</span>
    </S.StyledLogoutButton>
  );
};
