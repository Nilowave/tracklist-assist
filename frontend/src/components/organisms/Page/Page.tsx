import type { ReactElement, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Path } from '../../../routes/Paths';
import { LogoColor } from '../../atoms/Icon/Icon';
import { Text } from '../../atoms/Text/Text.styles';
import * as S from './Page.styles';

interface PageProps {
  children: ReactNode;
  title?: string;
}

export const Page = ({ children, title }: PageProps): ReactElement => {
  return (
    <S.PageWrapper>
      <S.PageContent>
        <S.LogoWrapper>
          <Link to="/">
            <LogoColor />
          </Link>
        </S.LogoWrapper>
        <S.Title>{title}</S.Title>
      </S.PageContent>
      <S.PageContent>{children}</S.PageContent>
      <S.PageFooter>
        <S.FooterContent>
          <Text type="disclaimer">
            © 2021{' '}
            <Text as="span" type="tinyLogo">
              Tracklist Assist
            </Text>
          </Text>
          <S.FooterMenu>
            <Link to={Path.PrivacyPolicy}>
              <Text type="disclaimer">Privacy Policy</Text>
            </Link>
            <Link to={Path.Terms}>
              <Text type="disclaimer">Terms of Service</Text>
            </Link>
            <Link to={Path.Terms}>
              <Text type="disclaimer">Contact</Text>
            </Link>
          </S.FooterMenu>
        </S.FooterContent>
      </S.PageFooter>
    </S.PageWrapper>
  );
};
