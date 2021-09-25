import React, { useContext, ReactElement, ReactNode } from 'react';
import { Redirect, Route } from 'react-router';
import { UserContext } from '../context/UserContext/UserContext';

interface PrivateRoutesProps {
  children: ReactNode;
}

export const PrivateRoutes = ({ children, ...props }: PrivateRoutesProps): ReactElement => {
  const { user } = useContext(UserContext);

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
