import { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from '../components/pages/Home/Home';
import { Login } from '../components/pages/Login/Login';
import { Path } from './Paths';
import { PrivateRoutes } from './PrivateRoute';

export const Routes = (): ReactElement => {
  return (
    <Switch>
      <Route path={Path.Login} exact component={Login} />
      <PrivateRoutes>
        <Home />
      </PrivateRoutes>
    </Switch>
  );
};
