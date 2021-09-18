import axios from 'axios';
import type { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import * as S from './LogoutButton.styles';

export type UserData = {
  email: string;
  name: string;
  photo: string;
};
interface LogoutButtonProps {
  user: UserData;
}

export const LogoutButton = ({ user }: LogoutButtonProps): ReactElement => {
  const history = useHistory();

  const handleLogout = () => {
    axios.get('/api/logout').then(() => {
      console.log('logout');

      history.push('/login');
    });
  };
  return (
    <S.StyledLogoutButton onClick={handleLogout} type="button">
      <S.Photo src={user.photo} alt={`Profile ${user.name}`} />
      <span>Logout</span>
    </S.StyledLogoutButton>
  );
};
