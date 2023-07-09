import { useEffect, ReactElement, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Path } from '../../../data/enum/Path';
import { BackArrow, LogoColor } from '../../atoms/Icon/Icon';
import { Text } from '../../atoms/Text/Text.styles';
import * as S from './Page.styles';
import { PageTitle } from '../../../data/enum/PageTitle';

interface PageProps {
  children: ReactNode;
  title?: string;
  pageTitle?: string;
}

export const Page = ({ children, title, pageTitle }: PageProps): ReactElement => {
  useEffect(() => {
    document.title = PageTitle.BASE + pageTitle;
  }, []);

  return (
    <S.PageWrapper>
      <S.PageContent>
        <S.LogoWrapper>
          <Link to="/">
            <LogoColor />
          </Link>
        </S.LogoWrapper>
        <S.TitleWrapper>
          <S.Title>{title}</S.Title>
          <S.BackLink to="/">
            <BackArrow width={24} />
            <span>Go back</span>
          </S.BackLink>
        </S.TitleWrapper>
      </S.PageContent>
      <S.PageContent>{children}</S.PageContent>
      <S.PageFooter>
        <S.FooterContent>
          <Text type="disclaimer">
            © {new Date().getFullYear()}{' '}
            <Text as="span" type="tinyLogo">
              Tracklist Assist
            </Text>
          </Text>
          <S.FooterMenu>
            <Link to={Path.PrivacyPolicy}>
              <Text type="disclaimer">Privacy Policy</Text>
            </Link>
            <Link to={Path.CookiePolicy}>
              <Text type="disclaimer">Cookie Policy</Text>
            </Link>
            <Link to={Path.Terms}>
              <Text type="disclaimer">Terms of Service</Text>
            </Link>
          </S.FooterMenu>
        </S.FooterContent>
      </S.PageFooter>
      <S.Fade />
    </S.PageWrapper>
  );
};
