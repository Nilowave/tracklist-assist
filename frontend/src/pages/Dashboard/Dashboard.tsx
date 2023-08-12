import { LayoutGroup } from 'framer-motion';
import { useAtom } from 'jotai';
import { ReactElement, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { shouldFetchAtom } from './Dashboard.atoms';
import * as S from './Dashboard.styles';
import { DBCardData } from '../../api/api.types';
import { useCardsStore } from '../../api/cards';
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import { AdUnit } from '../../components/atoms/AdUnit/AdUnit';
import { O01DashboardCard } from '../../components/organisms/O01DashboardCard/O01DashboardCard';
import { O04ActionMenu } from '../../components/organisms/O04ActionMenu/O04ActionMenu';
import { Cards } from '../../data/enum/Cards';
import { Path } from '../../data/enum/Path';
import { Trackwave } from '../../data/enum/Trackwave';
import { useDeviceState } from '../../hooks/useDeviceState';
import { DotGrid } from '../../styles/ui';
import { staggerChildren } from '../../utils/motionTransitions';

export const Dashboard = (): ReactElement => {
  const cards = useCardsStore((state) => state.cards);
  const fetchCards = useCardsStore((state) => state.fetchCards);
  const setCards = useCardsStore((state) => state.setCards);

  const [shouldFetchCards, setShouldFetchCards] = useAtom(shouldFetchAtom);
  const { isMobile } = useDeviceState();

  const onAddNewCard = () => {
    // check if there is a card that is new
    const hasNew = cards.filter((item) => item.id === Cards.NEW);

    if (hasNew.length > 0) {
      console.log('Already editing a new card');
      return;
    }

    const newCard: DBCardData = {
      id: Cards.NEW,
      name: '',
    };

    const updateCards = [...cards, newCard];

    setCards(updateCards);
  };

  useEffect(() => {
    if (shouldFetchCards) {
      fetchCards();
      setShouldFetchCards(false);
    }
  }, [shouldFetchCards]);

  return (
    <>
      <S.Dashboard>
        <DotGrid />
        <S.Content>
          <S.Heading>
            <Logo />
          </S.Heading>
          <LayoutGroup>
            {cards.length > 0 && (
              <S.ItemList layout {...staggerChildren()}>
                {cards.map((item) => (
                  <div style={{ display: 'contents' }} key={`${item.id}-${item.name}`}>
                    <O01DashboardCard onClick={(data) => console.log(data)} key={item.id} data={item} />
                    {/* {index % 3 === 2 && index < cards.length - 1 && <AdUnit slot={3271702308} format="square" />} */}
                  </div>
                ))}
              </S.ItemList>
            )}
          </LayoutGroup>
          {cards.length === 0 && <>Nothing to see here </>}
          <S.AddButton text={isMobile ? '' : 'Track Item'} icon="addLarge" color="primary" onClick={onAddNewCard} />
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
        <O04ActionMenu count={cards?.length} />
      </S.Dashboard>
    </>
  );
};
