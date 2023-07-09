import React, { useContext, ReactElement, ReactNode } from 'react';
import { Redirect, Route } from 'react-router';
import { UserContext } from '../context/UserContext/UserContext';
import { Path } from '../data/enum/Path';

interface PrivateRoutesProps {
  children: ReactNode;
  redirect: Path;
}

export const PrivateRoutes = ({ redirect, children, ...props }: PrivateRoutesProps): ReactElement => {
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
              pathname: redirect,
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};
