import { ReactElement, useContext, useEffect } from 'react';

import { IAuthorizationOptions } from 'react-google-oauth2';

import { Navigate } from 'react-router-dom';
import * as S from './Login.styles';
import { Text } from '../../components/atoms/A03Text/A03Text.styles';
import { AdUnit } from '../../components/atoms/AdUnit/AdUnit';
import { GoogleIcon, Logo } from '../../components/atoms/Icon/Icon';
import { UserContext } from '../../context/UserContext/UserContext';
import { PageTitle } from '../../data/enum/PageTitle';
import { Path } from '../../data/enum/Path';
import { Trackwave } from '../../data/enum/Trackwave';

export const Login = (): ReactElement => {
  const { user } = useContext(UserContext);

  const options: IAuthorizationOptions = {
    clientId: import.meta.env.VITE_CLIENT_ID as string,
    redirectUri: `${import.meta.env.VITE_REACT_APP_BASE_PATH}/auth/google/callback`,
    scopes: ['profile', 'email'],
    includeGrantedScopes: true,
    accessType: 'offline',
  };

  useEffect(() => {
    document.title = PageTitle.BASE + PageTitle.LOGIN;
  }, []);

  return user ? (
    <Navigate
      to={{
        pathname: Path.Home,
      }}
      replace={true}
    />
  ) : (
    <S.Login>
      <S.LogoWrapper>
        <Logo />
        <p>Your tracking assistant</p>
      </S.LogoWrapper>
      <S.StyledButtonWrapper>
        <S.StyledGoogleButton options={options} apiUrl={`${import.meta.env.VITE_REACT_APP_BASE_PATH}/auth/google`} defaultStyle={false}>
          <GoogleIcon />
          Sign in with Google
        </S.StyledGoogleButton>

        <Text type="disclaimer">
          Click “Sign In” to agree to {Trackwave.NAME}’s <S.StyledLink to={Path.Terms}>Terms of Service</S.StyledLink> and acknowledge that
          {Trackwave.NAME}’s <S.StyledLink to={Path.PrivacyPolicy}>Privacy Policy</S.StyledLink> applies to you.
        </Text>
        <div style={{}}>
          <AdUnit slot={6156885942} />
        </div>
      </S.StyledButtonWrapper>
    </S.Login>
  );
};
