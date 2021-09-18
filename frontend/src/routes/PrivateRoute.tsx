import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router';
import axios from 'axios';
import { UserData } from '../components/atoms/LogoutButton/LogoutButton';

interface PrivateRoutesProps {
  children: ReactNode;
}

export const PrivateRoutes = ({ children, ...props }: PrivateRoutesProps): ReactElement => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserData>();

  useEffect(() => {
    axios
      .get('/api/user')
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <></>;
  }

  return (
    <Route
      {...props}
      render={({ location }) => {
        return user?.email ? (
          React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                ...{
                  ...child.props,
                  user,
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
