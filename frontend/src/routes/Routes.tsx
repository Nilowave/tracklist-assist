import { ReactElement } from 'react';
import { Route, Routes as Switch } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { PageTitle } from '../data/enum/PageTitle';
import { Path } from '../data/enum/Path';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { Login } from '../pages/Login/Login';
import { PrivacyTerms } from '../pages/PrivacyTerms/PrivacyTerms';
import { Tracker } from '../pages/Tracker/Tracker';

export const Routes = (): ReactElement => {
  return (
    <Switch>
      <Route path={Path.Login} element={<Login />} />
      <Route path={Path.PrivacyPolicy} element={<PrivacyTerms title="Privacy Policy" type="privacy" pageTitle={PageTitle.PRIVACY} />} />
      <Route path={Path.Terms} element={<PrivacyTerms title="Terms of Service" type="terms" pageTitle={PageTitle.TERMS} />} />
      <Route path={Path.CookiePolicy} element={<PrivacyTerms title="Cookie Policy" type="cookie" pageTitle={PageTitle.COOKIE} />} />
      <Route element={<PrivateRoute />}>
        <Route path="*" element={<Dashboard />} />
        <Route path={Path.Tracker} element={<Tracker />} />
      </Route>
    </Switch>
  );
};
