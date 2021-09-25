import { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import { SideMenu } from '../components/organisms/SideMenu/SideMenu';
import { Home } from '../components/pages/Home/Home';
import { Login } from '../components/pages/Login/Login';
import { PrivacyTerms } from '../components/pages/PrivacyTerms/PrivacyTerms';
import { Path } from './Paths';
import { PrivateRoutes } from './PrivateRoute';

export const Routes = (): ReactElement => {
  return (
    <>
      <Switch>
        <Route path={Path.Login} exact component={Login} />
        <Route path={Path.PrivacyPolicy} exact render={() => <PrivacyTerms title="Privacy Policy" type="privacy" />} />
        <Route path={Path.Terms} exact render={() => <PrivacyTerms title="Terms of Service" type="terms" />} />
        <Route path={Path.CookiePolicy} exact render={() => <PrivacyTerms title="Cookie Policy" type="cookie" />} />
        <PrivateRoutes>
          <Home />
        </PrivateRoutes>
      </Switch>
      <SideMenu />
    </>
  );
};
