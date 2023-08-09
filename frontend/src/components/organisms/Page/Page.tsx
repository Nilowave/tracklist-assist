import { ReactElement, ReactNode, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as S from './Page.styles';
import { ReactComponent as LogoColor } from '../../../assets/svg/logo-color.svg';
import { PageTitle } from '../../../data/enum/PageTitle';
import { Path } from '../../../data/enum/Path';
import { Trackwave } from '../../../data/enum/Trackwave';
import { A01Icon } from '../../atoms/A01Icon/A01Icon';
import { Text } from '../../atoms/A03Text/A03Text.styles';

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
            <A01Icon name="backArrow" />
            {/* <BackArrow width={24} /> */}
            <span>Go back</span>
          </S.BackLink>
        </S.TitleWrapper>
      </S.PageContent>
      <S.PageContent>{children}</S.PageContent>
      <S.PageFooter>
        <S.FooterContent>
          <Text $type="disclaimer">
            © {new Date().getFullYear()}{' '}
            <Text as="span" $type="tinyLogo">
              {Trackwave.NAME}
            </Text>
          </Text>
          <S.FooterMenu>
            <Link to={Path.PrivacyPolicy}>
              <Text $type="disclaimer">Privacy Policy</Text>
            </Link>
            <Link to={Path.CookiePolicy}>
              <Text $type="disclaimer">Cookie Policy</Text>
            </Link>
            <Link to={Path.Terms}>
              <Text $type="disclaimer">Terms of Service</Text>
            </Link>
          </S.FooterMenu>
        </S.FooterContent>
      </S.PageFooter>
      <S.Fade />
    </S.PageWrapper>
  );
};
