import axios, { AxiosResponse } from 'axios';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import * as S from './Dashboard.styles';
import { AdUnit } from '../../components/atoms/AdUnit/AdUnit';
import { Logo } from '../../components/atoms/Icon/Icon';
import { M06Dialog } from '../../components/molecules/M06Dialog/M06Dialog';
import { Empty } from '../../components/organisms/Empty/Empty';
import { ItemDetailsModal } from '../../components/organisms/ItemDetailsModal/ItemDetailsModal';
import { ItemInput } from '../../components/organisms/ItemInput/ItemInput';
import { CardData, O01DashboardCard } from '../../components/organisms/O01DashboardCard/O01DashboardCard';
import { O04ActionMenu } from '../../components/organisms/O04ActionMenu/O04ActionMenu';
import { Path } from '../../data/enum/Path';
import { Trackwave } from '../../data/enum/Trackwave';
import { useDeviceState } from '../../hooks/useDeviceState';
import { DotGrid } from '../../styles/ui';
import { staggerChildren } from '../../utils/motionTransitions';

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
    console.log('update', message);
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
          <LayoutGroup>
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
          </LayoutGroup>
          {isEmpty && <Empty />}
          <S.AddButton text={isMobile ? '' : 'Track Item'} icon="addLarge" color="primary" onClick={() => setAddModal(true)} />
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
      <AnimatePresence mode="wait">
        {addModal && <ItemInput submit={submitNewItem} onClose={() => setAddModal(false)} />}
        {detailsModal && (
          <ItemDetailsModal data={detailsModal} onDelete={deleteItem} onClose={() => setDetailsModal(null)} onUpdate={setDetailsModal} />
        )}
      </AnimatePresence>
      <O04ActionMenu count={items?.length} />
      <M06Dialog />
    </>
  );
};
