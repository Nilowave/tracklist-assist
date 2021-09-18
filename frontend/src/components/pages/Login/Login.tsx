import { ReactElement } from 'react';
import * as S from './Login.styles';
import { IAuthorizationOptions } from 'react-google-oauth2';
import { ReactComponent as GoogleIcon } from '../../../assets/svg/google-button.svg';

export const Login = (): ReactElement => {
  const options: IAuthorizationOptions = {
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID as string,
    redirectUri: 'http://localhost:1337/auth/google/callback',
    scopes: ['profile', 'email'],
    includeGrantedScopes: true,
    accessType: 'offline',
  };

  return (
    <S.Login>
      <S.StyledGoogleButton options={options} apiUrl="http://localhost:1337/auth/google" defaultStyle={false}>
        <GoogleIcon />
        Sign in with google
      </S.StyledGoogleButton>
    </S.Login>
  );
};
