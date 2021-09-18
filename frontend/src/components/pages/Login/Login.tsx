import { ReactElement } from 'react';
import * as S from './Login.styles';
import { GoogleButton, IAuthorizationOptions, isLoggedIn } from 'react-google-oauth2';

export const Login = (): ReactElement => {
  const options: IAuthorizationOptions = {
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID as string,
    redirectUri: 'http://localhost:1337/auth/google/callback',
    scopes: ['profile', 'email'],
    includeGrantedScopes: true,
    accessType: 'offline',
  };
  console.log('hello', isLoggedIn());

  return (
    <S.Login>
      <GoogleButton
        options={options}
        placeholder="https://developers.google.com/identity/images/g-logo.png"
        apiUrl="http://localhost:1337/auth/google"
        defaultStyle={true} // Optional
      >
        Sign in with google
      </GoogleButton>
    </S.Login>
  );
};
