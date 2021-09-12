import { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from '../components/pages/Home/Home';
import { Path } from './Paths';

export const Routes = (): ReactElement => {
  return (
    <Switch>
      <Route path={Path.Home} exact component={Home} />
    </Switch>
  );
};
