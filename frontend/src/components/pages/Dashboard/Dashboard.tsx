import axios, { AxiosResponse } from 'axios';
import io from 'socket.io-client';
import { AnimatePresence } from 'framer-motion';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { Empty } from '../../organisms/Empty/Empty';
import { O01DashboardCard, CardData } from '../../organisms/O01DashboardCard/O01DashboardCard';
import { ItemInput } from '../../organisms/ItemInput/ItemInput';
import * as S from './Dashboard.styles';
import { ItemDetailsModal } from '../../organisms/ItemDetailsModal/ItemDetailsModal';
import { staggerChildren } from '../../../utils/motionTransitions';
import { Logo } from '../../atoms/Icon/Icon';
import { useDeviceState } from '../../../hooks/useDeviceState';
import { Link } from 'react-router-dom';
import { Path } from '../../../data/enum/Path';
import { AdUnit } from '../../atoms/AdUnit/AdUnit';
import { Trackwave } from '../../../data/enum/Trackwave';
import { DotGrid } from '../../../styles/ui';

const basepath = '/';
const endpoint = '/api/';

type Func = () => void;

type SocketMessage = {
  id: string;
};

export const Dashboard = (): ReactElement => {
  const [items, setItems] = useState<Array<CardData> | null>(null);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [detailsModal, setDetailsModal] = useState<CardData | null>(null);
  const [addModal, setAddModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { isMobile } = useDeviceState();

  const itemsEndpoint = `${endpoint}items`;
  const itemEndpoint = `${endpoint}item`;

  const socketListener = (message: SocketMessage) => {
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

  const submitNewItem = (item: CardData) => {
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

  useEffect((): Func => {
    const socket = io(basepath);
    socket.on('message', socketListener);

    // // handle logout hide
    // // let previousScrollPosition = window.pageYOffset;

    // const handleScroll = debounce(() => {
    //   const currentScrollPosition = window.pageYOffset;

    //   // const variant = previousScrollPosition < currentScrollPosition && currentScrollPosition > 50;
    //   // const variant = currentScrollPosition > 50;

    //   // setHideHeader(variant);

    //   // previousScrollPosition = currentScrollPosition;
    // }, 66);

    // window.addEventListener('scroll', handleScroll);

    return () => {
      socket.close();
      // window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    getItems();
  }, [refresh]);

  return (
    <>
      <S.Dashboard $blur={!!addModal || !!detailsModal}>
        <DotGrid />
        <S.Content>
          <S.Heading>
            <Logo />
          </S.Heading>
          {items && !isEmpty && (
            <S.ItemList layout {...staggerChildren()}>
              {items.map((item) => (
                <div style={{ display: 'contents' }} key={item._id}>
                  <O01DashboardCard onClick={() => setDetailsModal(item)} key={item._id} data={item} />
                  {/* {index % 3 === 2 && index < items.length - 1 && <AdUnit slot={3271702308} format="square" />} */}
                </div>
              ))}
            </S.ItemList>
          )}
          {isEmpty && <Empty />}
          <S.AddButton text={isMobile ? '' : 'Track Item'} icon="addLarge" color="primary" onClick={() => setAddModal(true)} />
        </S.Content>
        <S.Footer>
          <AdUnit slot={6156885942} />
          <S.FooterWrapper>
            <Link to={Path.PrivacyPolicy}>Privacy Policy</Link>
            <Link to={Path.Terms}>Terms of Service</Link>
            <p>
              © {new Date().getFullYear()} {Trackwave.NAME}
            </p>
          </S.FooterWrapper>
        </S.Footer>
      </S.Dashboard>
      <AnimatePresence mode="wait">
        {addModal && <ItemInput submit={submitNewItem} onClose={() => setAddModal(false)} />}
        {detailsModal && (
          <ItemDetailsModal data={detailsModal} onDelete={deleteItem} onClose={() => setDetailsModal(null)} onUpdate={setDetailsModal} />
        )}
      </AnimatePresence>
    </>
  );
};
