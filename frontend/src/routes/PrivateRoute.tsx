import { ReactNode, useContext } from 'react';
import { Navigate, Outlet } from 'react-router';
import { UserContext } from '../context/UserContext/UserContext';
import { Path } from '../data/enum/Path';

interface PrivateRouteProps {
  children?: ReactNode;
  redirect?: Path;
}

export const PrivateRoute = ({ children, redirect = Path.Login }: PrivateRouteProps) => {
  const { user } = useContext(UserContext);

  if (!user?.email) {
    return <Navigate to={redirect} replace />;
  }

  return children ? children : <Outlet />;
};
