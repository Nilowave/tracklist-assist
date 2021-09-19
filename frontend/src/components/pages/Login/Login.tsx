import { ReactElement } from 'react';
import * as S from './Login.styles';
import { IAuthorizationOptions } from 'react-google-oauth2';
import { GoogleIcon, Logo } from '../../atoms/Icon/Icon';
import { Link } from 'react-router-dom';

export const Login = (): ReactElement => {
  const options: IAuthorizationOptions = {
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID as string,
    redirectUri: `${process.env.REACT_APP_BASE_PATH}/auth/google/callback`,
    scopes: ['profile', 'email'],
    includeGrantedScopes: true,
    accessType: 'offline',
  };

  return (
    <S.Login>
      <S.LogoWrapper>
        <Link to="/">
          <Logo />
        </Link>
        <p>Your tracking assistant</p>
      </S.LogoWrapper>
      <S.StyledGoogleButton options={options} apiUrl={`${process.env.REACT_APP_BASE_PATH}/auth/google`} defaultStyle={false}>
        <GoogleIcon />
        Sign in with Google
      </S.StyledGoogleButton>
    </S.Login>
  );
};
