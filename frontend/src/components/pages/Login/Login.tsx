import { ReactElement } from 'react';
import * as S from './Login.styles';
import { IAuthorizationOptions } from 'react-google-oauth2';
import { GoogleIcon, Logo } from '../../atoms/Icon/Icon';
import { Text } from '../../atoms/Text/Text.styles';
import { AdUnit } from '../../atoms/AdUnit/AdUnit';

export const Login = (): ReactElement => {
  const options: IAuthorizationOptions = {
    clientId: (process || {}).env.REACT_APP_GOOGLE_CLIENT_ID as string,
    redirectUri: `${(process || {}).env.REACT_APP_BASE_PATH}/auth/google/callback`,
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
      <S.StyledButtonWrapper>
        <S.StyledGoogleButton options={options} apiUrl={`${(process || {}).env.REACT_APP_BASE_PATH}/auth/google`} defaultStyle={false}>
          <GoogleIcon />
          Sign in with Google
        </S.StyledGoogleButton>
        <Text type="disclaimer">
          Click “Sign In” to agree to Tracklist Assist’s <S.StyledLink to="terms">Terms of Service</S.StyledLink> and acknowledge that
          Tracklist Assist’s <S.StyledLink to="privacy-policy">Privacy Policy</S.StyledLink> applies to you.
        </Text>
      </S.StyledButtonWrapper>
      <div style={{ position: 'absolute', bottom: 20 }}>
        <AdUnit slot={6156885942} />
      </div>
    </S.Login>
  );
};
