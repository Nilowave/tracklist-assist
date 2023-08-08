import { LayoutGroup } from 'framer-motion';
import { useAtom } from 'jotai';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import { cardsAtom, shouldFetchAtom } from './Dashboard.atoms';
import * as S from './Dashboard.styles';
import { DBCardData } from '../../api/api.types';
import { apiGetCards } from '../../api/cards';
import { AdUnit } from '../../components/atoms/AdUnit/AdUnit';
import { Logo } from '../../components/atoms/Icon/Icon';
import { Empty } from '../../components/organisms/Empty/Empty';
import { O01DashboardCard } from '../../components/organisms/O01DashboardCard/O01DashboardCard';
import { O04ActionMenu } from '../../components/organisms/O04ActionMenu/O04ActionMenu';
import { Cards } from '../../data/enum/Cards';
import { Path } from '../../data/enum/Path';
import { Trackwave } from '../../data/enum/Trackwave';
import { useDeviceState } from '../../hooks/useDeviceState';
import { DotGrid } from '../../styles/ui';
import { staggerChildren } from '../../utils/motionTransitions';

type SocketMessage = {
  id: string;
};

export const Dashboard = (): ReactElement => {
  const [cards, setCards] = useAtom(cardsAtom);
  const [shouldFetchCards, setShouldFetchCards] = useAtom(shouldFetchAtom);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const { isMobile } = useDeviceState();

  const socketListener = (message: SocketMessage) => {
    console.log('update', message);
    if (message.id === 'update') {
      getCards();
    }
  };

  const getCardsCallback = useCallback(
    (cards?: Array<DBCardData>) => {
      if (!cards) {
        setIsEmpty(true);
        return;
      }

      setIsEmpty(!cards.length);
      setCards(cards);
    },
    [shouldFetchCards]
  );

  const getCards = () => {
    console.log('fetch cards');

    apiGetCards()
      .then((cards) => getCardsCallback(cards))
      .catch((error) => {
        setIsEmpty(true);
        console.log(error);
      });
  };

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

  useEffect((): (() => void) => {
    const socket = io('/');
    socket.on('message', socketListener);

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (shouldFetchCards) {
      getCards();
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
            {cards && !isEmpty && (
              <S.ItemList layout {...staggerChildren()}>
                {cards.map((item) => (
                  <div style={{ display: 'contents' }} key={item.id}>
                    <O01DashboardCard onClick={(data) => console.log(data)} key={item.id} data={item} />
                    {/* {index % 3 === 2 && index < cards.length - 1 && <AdUnit slot={3271702308} format="square" />} */}
                  </div>
                ))}
              </S.ItemList>
            )}
          </LayoutGroup>
          {isEmpty && <Empty />}
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
      </S.Dashboard>
      <O04ActionMenu count={cards?.length} />
    </>
  );
};
