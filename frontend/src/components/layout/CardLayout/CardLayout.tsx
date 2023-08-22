import { ReactElement, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import * as S from './CardLayout.styles';
import { Path } from '../../../data/enum/Path';
import { Trackwave } from '../../../data/enum/Trackwave';
import { useDeviceState } from '../../../hooks/useDeviceState';
import { AdUnit } from '../../atoms/AdUnit/AdUnit';
import { DotGrid } from '../../../styles/ui';
import { O04ActionMenu } from '../../organisms/O04ActionMenu/O04ActionMenu';

interface CardLayoutProps {
  onFabClick: () => void;
  fabText: string;
  children: ReactNode;
  cardCount: number;
}

export const CardLayout = ({ cardCount, fabText, children, onFabClick }: CardLayoutProps): ReactElement => {
  const { isMobile } = useDeviceState();

  return (
    <S.StyledCardLayout>
      <DotGrid />
      <S.Content>
        <S.Header $align="center">
          <Link to={Path.Home}>
            <S.StyledLogo />
          </Link>
        </S.Header>

        {children}
      </S.Content>

      <S.Footer>
        <AdUnit slot={6156885942} />
        <S.FooterWrapper>
          <Link to={Path.PrivacyPolicy}>Privacy Policy</Link>
          <Link to="#">Terms of Service</Link>
          <Link to={Path.Terms}>Credits</Link>
          <p>
            © {new Date().getFullYear()} {Trackwave.NAME}
          </p>
          <div>
            Icons made from <a href="https://www.onlinewebfonts.com/icon">svg icons</a>is licensed by CC BY 4.0
          </div>
        </S.FooterWrapper>
      </S.Footer>
      <O04ActionMenu count={cardCount} />
      <S.AddButton text={isMobile ? '' : fabText} icon="addLarge" color="primary" onClick={onFabClick} />
    </S.StyledCardLayout>
  );
};
