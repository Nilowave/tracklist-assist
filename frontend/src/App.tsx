import { AnimatePresence } from 'framer-motion';
import { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from './routes/Routes';

const App = (): ReactElement => {
  return (
    <Router>
      <AnimatePresence>
        <Routes />
      </AnimatePresence>
    </Router>
  );
};

export default App;
