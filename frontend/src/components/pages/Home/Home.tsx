import axios, { AxiosResponse } from 'axios';
import io from 'socket.io-client';
import { AnimatePresence } from 'framer-motion';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { Empty } from '../../organisms/Empty/Empty';
import { Item, ItemData } from '../../organisms/Item/Item';
import { ItemInput } from '../../organisms/ItemInput/ItemInput';
import * as S from './Home.styles';
import { ItemDetailsModal } from '../../organisms/ItemDetailsModal/ItemDetailsModal';
import { staggerChildren } from '../../../utils/motionTransitions';
import { LogoutButton, UserData } from '../../atoms/LogoutButton/LogoutButton';
import { Logo } from '../../atoms/Icon/Icon';

// const endpoint = 'http://localhost:1337/api/';
const basepath = '/';
const endpoint = '/api/';

interface HomeProps {
  user?: UserData;
}

export const Home = ({ user }: HomeProps): ReactElement => {
  const [items, setItems] = useState<Array<ItemData> | null>(null);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [detailsModal, setDetailsModal] = useState<ItemData | null>(null);
  const [addModal, setAddModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const itemsEndpoint = `${endpoint}items`;
  const itemEndpoint = `${endpoint}item`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const socketListener = (message: any) => {
    console.log(message);

    if (message.id === 'update') {
      getItems();
    }
  };

  const onApiResponse = useCallback(
    (response: AxiosResponse) => {
      if (!response.data) {
        setIsEmpty(true);
        return;
      }

      setIsEmpty(!response.data.length);

      setItems(response.data);
    },
    [refresh]
  );

  const submitNewItem = (item: ItemData) => {
    axios.post(itemEndpoint, item).then(() => setRefresh(!refresh));
  };

  const deleteItem = (id: string) => {
    axios.delete(`${itemEndpoint}/${id}`).then(() => setRefresh(!refresh));
  };

  const getItems = () => {
    axios
      .get(itemsEndpoint)
      .then((response) => onApiResponse(response.data))
      .catch((error) => {
        setIsEmpty(true);
        console.log(error);
      });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useEffect((): any => {
    const socket = io(basepath);

    socket.on('message', socketListener);

    return () => socket.close();
  }, []);

  useEffect(() => {
    getItems();
  }, [refresh]);

  return (
    <S.Home>
      {user && <LogoutButton user={user} />}
      <S.Content $blur={!!detailsModal || !!addModal}>
        <S.Heading>
          <Logo />
        </S.Heading>
        {items && !isEmpty && (
          <S.ItemList layout {...staggerChildren()}>
            {items.map((item) => (
              <Item onClick={() => setDetailsModal(item)} key={item._id} data={item} />
            ))}
          </S.ItemList>
        )}
        {isEmpty && <Empty />}
        <S.AddButton icon="Plus" color="primary" onClick={() => setAddModal(true)} />
      </S.Content>
      <AnimatePresence exitBeforeEnter>
        {addModal && <ItemInput submit={submitNewItem} onClose={() => setAddModal(false)} />}
        {detailsModal && <ItemDetailsModal data={detailsModal} onDelete={deleteItem} onClose={() => setDetailsModal(null)} />}
      </AnimatePresence>
    </S.Home>
  );
};
