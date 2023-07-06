import { ReactElement, useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import * as S from './SideMenu.styles';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { menuData } from './SideMenu.data';
import { UserContext } from '../../../context/UserContext/UserContext';
import { Path } from '../../../routes/Paths';

export const SideMenu = (): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  const elementRef = useRef<HTMLElement>(null);

  const { user, logout } = useContext(UserContext);

  const location = useLocation();

  const history = useHistory();

  const handleLogout = () => {
    axios.get('/api/logout').then(() => {
      setIsOpen(false);
      logout();
      history.push('/login');
    });
  };

  const splitUsername = (email: string) => {
    return email.split(' ')[0];
  };

  const onClickOutside = (event: MouseEvent) => {
    const { target } = event;
    if (!elementRef.current || !target) return;

    if (target !== elementRef.current) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', onClickOutside);

    if (isOpen === false) {
      document.removeEventListener('click', onClickOutside);
    }

    return () => {
      document.removeEventListener('click', onClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <S.StyledSideMenu $isOpen={isOpen} ref={elementRef}>
        <S.NavList>
          {menuData.map((item) => {
            if (item.protected && !user?.email) return;
            return (
              <S.NavItem key={item.title} isActive={location.pathname === item.path}>
                <Link to={item.path}>{item.title}</Link>
              </S.NavItem>
            );
          })}
          {/* <S.NavItem isRainbow>
            <Link to="#">Remove Ads</Link>
          </S.NavItem> */}
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
          <span>{splitUsername(user.name)}</span>
        </S.StyledUserButton>
      )}
    </>
  );
};
