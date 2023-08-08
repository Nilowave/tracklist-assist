import { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { DialogProvider } from './context/DialogContext/DialogContext';
import UserContextProvider from './context/UserContext/UserContext';
import { Routes } from './routes/Routes';

const App = (): ReactElement => {
  return (
    <UserContextProvider>
      <DialogProvider>
        <Router>
          <Routes />
        </Router>
      </DialogProvider>
    </UserContextProvider>
  );
};

export default App;
