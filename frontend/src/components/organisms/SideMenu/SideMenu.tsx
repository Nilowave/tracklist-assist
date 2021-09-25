import { ReactElement, useContext, useState } from 'react';
import axios from 'axios';
import * as S from './SideMenu.styles';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { menuData } from './SideMenu.data';
import { UserContext } from '../../../context/UserContext/UserContext';
import { Path } from '../../../routes/Paths';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SideMenuProps {}

// eslint-disable-next-line no-empty-pattern
export const SideMenu = ({}: SideMenuProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useContext(UserContext);

  const location = useLocation();

  const history = useHistory();

  const handleLogout = () => {
    axios.get('/api/logout').then(() => {
      console.log('logout');

      history.push('/login');
    });
  };
  return (
    <>
      <S.StyledSideMenu $isOpen={isOpen}>
        <S.NavList>
          {menuData.map((item) => {
            if (item.protected && !user?.email) return;
            return (
              <S.NavItem key={item.title} isActive={location.pathname === item.path}>
                <Link to={item.path}>{item.title}</Link>
              </S.NavItem>
            );
          })}
        </S.NavList>
        <S.LogoutButton type="button" onClick={handleLogout}>
          Logout
        </S.LogoutButton>
      </S.StyledSideMenu>
      {user && (
        <S.StyledUserButton
          onClick={() => setIsOpen(!isOpen)}
          $variant={isOpen || location.pathname !== Path.Home ? 'dark' : 'light'}
          type="button"
        >
          <S.Photo src={user.photo} alt={`Profile ${user.name}`} />
          <span>{'username'}</span>
        </S.StyledUserButton>
      )}
    </>
  );
};
