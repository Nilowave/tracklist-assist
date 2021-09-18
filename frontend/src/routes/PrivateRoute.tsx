import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router';
import axios from 'axios';
import { UserData } from '../components/atoms/LogoutButton/LogoutButton';

interface PrivateRoutesProps {
  children: ReactNode;
}

export const PrivateRoutes = ({ children, ...props }: PrivateRoutesProps): ReactElement => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<UserData>();

  useEffect(() => {
    axios.get('/api/user').then((response) => {
      console.log(response.data);

      setIsAuthenticated(response.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <>loading</>;
  }

  return (
    <Route
      {...props}
      render={({ location }) => {
        return isAuthenticated?.email ? (
          React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                ...{
                  ...child.props,
                  user: isAuthenticated,
                },
              });
            }
            return child;
          })
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};
