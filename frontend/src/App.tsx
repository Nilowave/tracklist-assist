import { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import UserContextProvider from './context/UserContext/UserContext';
import { Routes } from './routes/Routes';

const App = (): ReactElement => {
  return (
    <UserContextProvider>
      <Router>
        <Routes />
      </Router>
    </UserContextProvider>
  );
};

export default App;
