import { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import { SideMenu } from '../components/organisms/SideMenu/SideMenu';
import { Home } from '../components/pages/Home/Home';
import { Login } from '../components/pages/Login/Login';
import { PrivacyTerms } from '../components/pages/PrivacyTerms/PrivacyTerms';
import { Path } from '../data/enum/Path';
import { PrivateRoutes } from './PrivateRoute';
import { PageTitle } from '../data/enum/PageTitle';

export const Routes = (): ReactElement => {
  return (
    <>
      <Switch>
        <Route path={Path.Login} exact component={Login} />
        <Route
          path={Path.PrivacyPolicy}
          exact
          render={() => <PrivacyTerms title="Privacy Policy" type="privacy" pageTitle={PageTitle.PRIVACY} />}
        />
        <Route path={Path.Terms} exact render={() => <PrivacyTerms title="Terms of Service" type="terms" pageTitle={PageTitle.TERMS} />} />
        <Route
          path={Path.CookiePolicy}
          exact
          render={() => <PrivacyTerms title="Cookie Policy" type="cookie" pageTitle={PageTitle.COOKIE} />}
        />
        <PrivateRoutes redirect={Path.Login}>
          <Home />
        </PrivateRoutes>
      </Switch>
      <SideMenu />
    </>
  );
};
