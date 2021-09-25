/* eslint-disable @typescript-eslint/no-empty-function */
import axios from 'axios';
import React, { useState, createContext, ReactNode, useEffect } from 'react';
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
        console.log('got user', { ...response.data });
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <UserContext.Provider value={state}>{state.isLoading ? <div>Loading</div> : children}</UserContext.Provider>;
};

export default UserContextProvider;
