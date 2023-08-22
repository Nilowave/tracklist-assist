import { LayoutGroup } from 'framer-motion';
import { useAtom } from 'jotai';
import { ReactElement, useEffect } from 'react';
import { shouldFetchAtom } from './Dashboard.atoms';
import * as S from './Dashboard.styles';
import { DBCardData } from '../../api/api.types';
import { useCardStore } from '../../api/cards';
import { O01DashboardCard } from '../../components/organisms/O01DashboardCard/O01DashboardCard';
import { Cards } from '../../data/enum/Cards';
import { staggerChildren } from '../../utils/motionTransitions';

export const Dashboard = (): ReactElement => {
  const cards = useCardStore((state) => state.cards);
  const fetchCards = useCardStore((state) => state.fetchCards);
  const setCards = useCardStore((state) => state.setCards);

  const [shouldFetchCards, setShouldFetchCards] = useAtom(shouldFetchAtom);

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
      const { request } = fetchCards();
      request.then(() => {
        setShouldFetchCards(false);
      });
    }
  }, [shouldFetchCards]);

  return (
    <S.Dashboard onFabClick={onAddNewCard} fabText="Track Card" cardCount={cards.length}>
      <LayoutGroup>
        {cards.length > 0 && (
          <S.ItemList layout {...staggerChildren()}>
            {cards.map((item) => (
              <O01DashboardCard onClick={(data) => console.log(data)} key={item.id} data={item} />
            ))}
          </S.ItemList>
        )}
      </LayoutGroup>
      {cards.length === 0 && <>Nothing to see here </>}
    </S.Dashboard>
  );
};
