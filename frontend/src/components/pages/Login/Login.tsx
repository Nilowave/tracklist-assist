import { ReactElement } from 'react';
import * as S from './Login.styles';
import { IAuthorizationOptions } from 'react-google-oauth2';
import { GoogleIcon, Logo } from '../../atoms/Icon/Icon';

export const Login = (): ReactElement => {
  const basePath = process.env.NODE_ENV === 'test' ? 'http://localhost:1337' : 'https://tracklist-assist.herokuapp.com';
  const options: IAuthorizationOptions = {
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID as string,
    redirectUri: `${basePath}/auth/google/callback`,
    scopes: ['profile', 'email'],
    includeGrantedScopes: true,
    accessType: 'offline',
  };

  return (
    <S.Login>
      <S.LogoWrapper>
        <Logo />
        <p>Your tracking assistant</p>
      </S.LogoWrapper>
      <S.StyledGoogleButton options={options} apiUrl={`${basePath}/auth/google`} defaultStyle={false}>
        <GoogleIcon />
        Sign in with google
      </S.StyledGoogleButton>
    </S.Login>
  );
};
