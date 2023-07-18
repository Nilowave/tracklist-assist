import { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import UserContextProvider from './context/UserContext/UserContext';
import { Routes } from './routes/Routes';

const App = (): ReactElement => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <UserContextProvider>
        <Router>
          <Routes />
        </Router>
      </UserContextProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
