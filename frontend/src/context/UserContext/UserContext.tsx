import axios from 'axios';
import { useState, createContext, ReactNode, useEffect } from 'react';
import { UserData } from '../../components/atoms/LogoutButton/LogoutButton';

type UserState = {
  user?: UserData;
  isLoading: boolean;
};

export const UserContext = createContext<UserState>({ isLoading: true });

interface UserContextProps {
  children: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const UserContextProvider = ({ children }: UserContextProps) => {
  const setUser = (user: UserData) => {
    setState({
      ...state,
      ...(!user.error ? { user: { ...user } } : {}),
      isLoading: false,
    });
  };

  const [state, setState] = useState<UserState>({
    isLoading: true,
  });

  useEffect(() => {
    axios
      .get('/api/user')
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        // console.log(error);
      });
  }, []);

  return <UserContext.Provider value={state}>{state.isLoading ? <div /> : children}</UserContext.Provider>;
};

export default UserContextProvider;
