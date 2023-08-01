import { ReactElement } from 'react';
import { Route, Routes as Switch } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { Dashboard } from '../components/pages/Dashboard/Dashboard';
import { Login } from '../components/pages/Login/Login';
import { PrivacyTerms } from '../components/pages/PrivacyTerms/PrivacyTerms';
import { TrackerDetails } from '../components/pages/TrackerDetails/TrackerDetails';
import { PageTitle } from '../data/enum/PageTitle';
import { Path } from '../data/enum/Path';

export const Routes = (): ReactElement => {
  return (
    <Switch>
      <Route path={Path.Login} element={<Login />} />
      <Route path={Path.PrivacyPolicy} element={<PrivacyTerms title="Privacy Policy" type="privacy" pageTitle={PageTitle.PRIVACY} />} />
      <Route path={Path.Terms} element={<PrivacyTerms title="Terms of Service" type="terms" pageTitle={PageTitle.TERMS} />} />
      <Route path={Path.CookiePolicy} element={<PrivacyTerms title="Cookie Policy" type="cookie" pageTitle={PageTitle.COOKIE} />} />
      <Route element={<PrivateRoute />}>
        <Route path={Path.Home} element={<Dashboard />} />
        <Route path={Path.Tracker} element={<TrackerDetails />} />
      </Route>
    </Switch>
  );
};
